const { Pool } = require('pg');
require('dotenv').config();

// This creates a reusable pool of connections to your PostgreSQL Vault
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('✅ Securely connected to the PostgreSQL Vault');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.stack);
});

module.exports = pool;