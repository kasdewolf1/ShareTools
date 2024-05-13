const db = require('../db'); // Pad naar db.js

exports.addTool = (req, res) => {
    const { title, beschikbaarheid, afmeting, location, category, description } = req.body;

    // Voer de databasequery uit om een tool toe te voegen
    const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [title, beschikbaarheid, afmeting, location, category, description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Fout bij het toevoegen van de tool:', err);
            return res.status(500).send('Er is een interne serverfout opgetreden bij het toevoegen van de tool');
        }

        // Stuur een redirect naar /products na succesvol toevoegen
        res.redirect('/products');
    });
};


// Functie om alle producten op te halen en te renderen naar de view
exports.getAllProducts = (req, res) => {
    const query = 'SELECT title, status, beschrijving, id FROM tools';
    console.log(query);
    db.query(query, (error, results) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }

        res.render('indexloggedin', { products: results });
    });
};