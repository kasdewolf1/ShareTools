const db = require('../db'); // Pad naar db.js
const multer = require('multer');
const path = require('path');

// Multer opslagconfiguratie
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialiseer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Controleer bestandstype functie
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Fout: Alleen afbeeldingen zijn toegestaan!');
  }
}

// Alle producten ophalen
exports.getAllProducts = (req, res, next) => {
  const query = 'SELECT title, status, beschrijving, id, image FROM tools';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('An internal server error occurred');
    }

    console.log('Get all products query results:', results);

    if (!results || results.length === 0) {
      return res.status(404).send('No products found');
    }

    const products = results.map(product => {
      let imageURL = null;
      if (product.image) {
        imageURL = `/uploads/${product.image.toString('utf-8')}`;
      }
      return {
        ...product,
        imageURL: imageURL
      };
    });

    res.locals.products = products;
    next(); // Proceed to the next middleware to render the page
  });
};

// Tool ophalen per ID
exports.getToolById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tools WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Fout bij ophalen tool:', error);
      return res.status(500).send('Interne serverfout');
    }

    const imageURL = `/uploads/${results[0].image}`;
    res.render('productinfo', { product: results[0], imageURL: imageURL });
  });
};

// Tool toevoegen
exports.addTool = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Fout tijdens bestand uploaden:', err);
      return res.status(400).send(err);
    } else {
      const { title, beschikbaarheid, afmetingen, location, category, description, favoriet, publiek } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!title || !beschikbaarheid || !afmetingen || !location || !category || !description || !favoriet || !publiek) {
        return res.status(400).send('Alle velden zijn verplicht');
      }

      const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving, image, favoriet, publiek) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [title, beschikbaarheid, afmetingen, location, category, description, image, favoriet, publiek];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Fout bij toevoegen tool:', err);
          return res.status(500).send('Interne serverfout bij het toevoegen van tool');
        }

        console.log('Tool succesvol toegevoegd, doorverwijzen naar /indexloggedin');
        return res.redirect('/indexloggedin');
      });
    }
  });
};

// Tool verwijderen
exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tools WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Fout bij verwijderen tool:', error);
      return res.status(500).send('Interne serverfout');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Geen tool gevonden met de opgegeven ID');
    }

    res.status(200).send({ message: 'Tool succesvol verwijderd' });
  });
};

// Tool ophalen per ID voor bewerken
exports.getToolByIdForEdit = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tools WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Fout bij ophalen tool:', error);
      return res.status(500).send('Interne serverfout');
    }

    res.render('toolbewerken', { product: results[0] });
  });
};

// Tool bewerken per ID
exports.editToolById = (req, res) => {
  const { id } = req.params;
  const { title, category, afmetingen, beschikbaarheid, favoriet, publiek, location, description } = req.body;

  const query = 'UPDATE tools SET title=?, categorie=?, afmeting=?, status=?, favoriet=?, publiek=?, locatie=?, beschrijving=? WHERE id=?';
  const values = [title, category, afmetingen, beschikbaarheid, favoriet, publiek, location, description, id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Fout bij bewerken tool:', error);
      return res.status(500).send('Interne serverfout');
    }

    res.redirect('/indexloggedin'); // Na succesvolle update, terugkeren naar overzicht van tools of een andere gewenste bestemming
  });
};