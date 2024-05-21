const mysql = require('mysql');
require('dotenv').config();

// Maak een pool van databaseverbindingen
const pool = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


module.exports = pool;
