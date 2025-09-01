// server/index.js
const express = require('express');
const cors = require('cors');
const { pool, initDB } = require('./db');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initDB();

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting user:", error);
    if (error.code === '23505') {
      res.status(409).json({ error: 'This email is already registered.' });
    } else {
      res.status(500).json({ error: 'Server error: Failed to add user.' });
    }
  }
});

// New DELETE endpoint to handle user deletion
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Server error: Failed to delete user.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});