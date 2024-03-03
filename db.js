// db.js

const { Pool } = require("pg");

const pool = new Pool({
  user: "rjqywkpm",
  host: "abul.db.elephantsql.com",
  database: "rjqywkpm",
  password: "x1UNZTfq_3c7gZiXOIq8SQv1fVUUElEQ",
  port: 5432,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = { pool, connect };
