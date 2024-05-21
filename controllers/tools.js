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

exports.deleteTool = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tools WHERE id = ?';

    console.log('ID ontvangen voor verwijdering:', id); // Voeg deze regel toe

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Fout bij het verwijderen van product:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden bij het verwijderen van het product');
        }

        // Controleer het aantal rijen dat werd beïnvloed door de query
        if (results.affectedRows === 0) {
            console.log('Geen rijen verwijderd. Controleer of de ID bestaat:', id);
            return res.status(404).send('Geen product gevonden met de opgegeven ID');
        }

        console.log('Product succesvol verwijderd. Aantal rijen beïnvloed:', results.affectedRows);

        res.status(200).send({ message: 'Product succesvol verwijderd' });
    });
}