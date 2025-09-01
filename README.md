# Debugging Practice Assignment

This is a full-stack Next.js + Express + PostgreSQL project containing  bugs for this Assignment

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   PGURL=postgres://your_connection_string_here
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

5. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

## The Challenge

This is a full-stack application with several bugs that need to be fixed and a new feature to be implemented. You have 45 minutes total.

### Part 1: Bug Fixing (30-35 minutes)
Find and fix as many bugs as you can. The issues range from simple to complex and may involve:
- Frontend functionality
- Backend operations
- Database interactions
- Application configuration
- Performance issues
- Error handling

### Part 2: Feature Implementation (10-15 minutes)
Add a "Delete User" feature:
- Add a delete button next to each user
- Implement a DELETE /api/users/:id endpoint
- Handle the deletion in the frontend
- Update the UI accordingly

Note: Implement the feature only after fixing critical bugs to ensure proper functionality.

### Success Criteria
- Users should load correctly on the homepage
- You should be able to add a new user
- The app should handle duplicate email addresses gracefully
- All database operations should work correctly

### Deliverable
Create a new branch named `fix-yourname` with your solutions and push it to the repository.

## Project Structure
- `/src/app` - Next.js frontend
- `/server` - Express backend
- `/server/db` - Database configuration and queries

Good luck!
