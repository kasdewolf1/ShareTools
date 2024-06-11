const db = require('../db'); // Path to db.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed!');
  }
}

// Function to get all products
exports.getAllProducts = (req, res) => {
  const query = 'SELECT title, status, beschrijving, afmeting, id, image FROM tools';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('Internal server error while fetching products');
    }

    const products = results.map(product => ({
      ...product,
      imageURL: `/uploads/${product.image}`
    }));
    
    res.render('indexloggedin', { products: products });
  });
};

// Function to get a tool by ID
exports.getToolById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tools WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error fetching tool:', error);
      return res.status(500).send('Internal server error');
    }

    const imageURL = `/uploads/${results[0].image}`;
    res.render('productinfo', { product: results[0], imageURL: imageURL });
  });
};

// Function to add a tool
exports.addTool = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).send(err);
    } else {
      const { title, beschikbaarheid, afmetingen, location, category, description } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!title || !beschikbaarheid || !afmetingen || !location || !category || !description) {
        return res.status(400).send('All fields are required');
      }

      const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [title, beschikbaarheid, afmetingen, location, category, description, image];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding tool:', err);
          return res.status(500).send('Internal server error while adding tool');
        }
        
        console.log('Tool added successfully, redirecting to /tools/products');
        return res.redirect('/indexloggedin');
      });
    }
  });
};

// Function to delete a tool
exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tools WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error deleting tool:', error);
      return res.status(500).send('Internal server error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('No tool found with the given ID');
    }

    res.status(200).send({ message: 'Tool deleted successfully' });
  });
};