const mysql = require('mysql2/promise');
require('dotenv').config();

// Maak een pool van databaseverbindingen
const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: 3307,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true, // Sta wachten op verbindingen toe als ze op zijn
    connectionLimit: 10, // Stel het maximale aantal gelijktijdige verbindingen in
    queueLimit: 0 // Geen limiet voor wachtrijen
});

// Test de databaseverbinding
(async () => {
    try {
        const connection = await db.getConnection();
        connection.release(); // Geef de verbinding vrij als deze met succes is getest
        console.log('Verbonden met de database');
    } catch (error) {
        console.error('Fout bij verbinden met database:', error);
        process.exit(1); // Stop het proces bij een fout bij het verbinden met de database
    }
})();

module.exports = db;
