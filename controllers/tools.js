const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.addTool = (req, res) => {
    const { title, beschikbaarheid, afmeting, location, category, description } = req.body;

    // Voer de databasequery uit om een tool toe te voegen
    db.query('INSERT INTO tools SET ?',
        { tool_title: title, status: beschikbaarheid, afmeting: afmeting, locatie: location, categorie: category, beschrijving: description }, 
        (err, result) => {
            if (err) {
                console.log('Fout bij het toevoegen van de tool:', err);
                return res.status(500).send('Er is een interne serverfout opgetreden bij het toevoegen van de tool');
            }
                
            // Tool succesvol toegevoegd, render de juiste pagina
            return res.render('indexloggedin', {
                message: 'Tool succesvol toegevoegd!'
            });
        }
    );
};


// Functie om alle producten op te halen en te renderen naar de view
exports.getAllProducts = (req, res) => {
    const query = 'SELECT tool_title, status, beschrijving FROM tools';
    console.log(query);
    db.query(query, (error, results) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }
        console.log(results);
        res.render('indexloggedin', { products: results });
    });
};

exports.getProductById = (req, res) => {
    
    const productId = req.params.id;
    console.log('Product ID:', productId); // Debug-uitvoer

    const query = 'SELECT tool_title, beschrijving, id FROM tools WHERE id = ?';

    db.query(query, [productId], (error, results) => {
        if (error) {
            console.error('Fout bij het ophalen van het product:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }

        // Controleer of een product is gevonden
        if (results.length === 0) {
            return res.status(404).send('Product niet gevonden');
        }
        console.log(results[0]);
        res.json(results[0]); // Stuur het eerste gevonden product als JSON-reactie
    });
};

    