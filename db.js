const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Fout bij verbinden met database:', err);
        throw err; // Gooi een fout als de verbinding niet kan worden gemaakt
    }
    console.log('Verbonden met de database');
});

module.exports = db;