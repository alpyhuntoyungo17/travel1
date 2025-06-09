const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'travel',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Test connection dengan error handling yang lebih baik
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database!');
    console.log(`📊 Database: ${process.env.DB_NAME || 'travel'}`);
    console.log(`🏠 Host: ${process.env.DB_HOST || 'localhost'}`);
    connection.release();
  } catch (err) {
    console.error('❌ Error connecting to MySQL Database:', err.message);
    console.error('🔧 Please check your database configuration in .env file');
    process.exit(1);
  }
};

// Test connection saat startup
testConnection();

// Handle pool errors
pool.on('connection', (connection) => {
  console.log('New connection established as id ' + connection.threadId);
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.log('Database has too many connections.');
  }
  if (err.code === 'ECONNREFUSED') {
    console.log('Database connection was refused.');
  }
});

module.exports = pool;
