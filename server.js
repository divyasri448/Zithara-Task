const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

app.use(express.json());

// Endpoint to retrieve data from the database
app.get('/api/customers', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM customers');
    res.json(queryResult.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
