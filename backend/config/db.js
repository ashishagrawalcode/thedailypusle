const { Pool } = require('pg');
require('dotenv').config();

// The Cloud-Ready Configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('✅ Securely connected to the PostgreSQL Vault');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.stack);
});

module.exports = pool;