const { Pool } = require('pg');
require('dotenv').config();

// Fixed: Issue7 - Resource usage grows over time


// Fixed: Issue4 - Connection issues might occur in production

const pool = new Pool({
  connectionString: process.env.PGURL,
  ssl: {
    rejectUnauthorized: false
  },
  // Add timeouts for better connection management in a production environment
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

// A check to verify the connection.
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const initDB = async () => {
  try {
    const client = await pool.connect(); // Acquire a client from the pool
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
    client.release(); // Release the client back to the pool
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = {
  pool,
  initDB
};