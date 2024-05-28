const db = require('../db'); // Path to db.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.addTool = (req, res) => {
  upload(req, res, (err) => {
    if(err){
      console.error('Error during file upload:', err);
      return res.status(400).send(err);
    } else {
      const { title, beschikbaarheid, afmeting, location, category, description } = req.body;
      const image = req.file ? req.file.filename : null; // Get filename if file uploaded, otherwise null

      // Check if required fields are present
      if (!title || !beschikbaarheid || !afmeting || !location || !category || !description) {
        return res.status(400).send('All fields are required');
      }

      // Execute the rest of the function
      const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [title, beschikbaarheid, afmeting, location, category, description, image];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding the tool:', err);
          return res.status(500).send('An internal server error occurred while adding the tool');
        }
        
        // Debugging statement
        console.log('Tool successfully added, redirecting to /tools/products');
        // Redirect to /tools/products after successfully adding
        res.redirect('/tools/products');
      });
    }
  });
};

exports.getAllProducts = (req, res) => {
    const query = 'SELECT title, status, beschrijving, id, image FROM tools';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }
        
        // Loop door elk resultaat en bouw de afbeeldings-URL op
        const products = results.map(product => {
            return {
                ...product,
                imageURL: `/uploads/${product.image}`
            };
        });
        
        // Render de HTML met de productgegevens inclusief afbeeldings-URL's
        res.render('indexloggedin', { products: products });
    });
  };

exports.getToolById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tools WHERE id = ?';
  db.query(query, [id], (error, results) => {
      if (error) {
          console.error('Fout bij het ophalen van producten:', error);
          return res.status(500).send('Er is een interne serverfout opgetreden');
      }

      // Genereer de URL voor de afbeelding
      const imageURL = `/uploads/${results[0].image}`;

      // Render de HTML met de toolgegevens en de afbeeldings-URL
      res.render('/tools/productinfo', { product: results[0], imageURL: imageURL });
  });
};

exports.getToolById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tools WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }

   

        // Render de HTML met de toolgegevens en de afbeeldings-URL
        res.render('productinfo', { product: results[0]});
    });
};

exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tools WHERE id = ?';

  db.query(query, [id], (error, results) => {
      if (error) {
          console.error('Fout bij het verwijderen van product:', error);
          return res.status(500).send('Er is een interne serverfout opgetreden bij het verwijderen van het product');
      }

      // Controleer het aantal rijen dat werd beïnvloed door de query
      if (results.affectedRows === 0) {
          return res.status(404).send('Geen product gevonden met de opgegeven ID');
      }

      res.status(200).send({ message: 'Product succesvol verwijderd' });
  });
};
