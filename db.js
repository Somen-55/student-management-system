// db.js

const mysql = require('mysql2');
require('dotenv').config();  // Load environment variables

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promise wrapper for async/await
const db = pool.promise();

module.exports = db;