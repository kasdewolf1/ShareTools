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
const filetypes = /jpeg|jpg|png|gif/;
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype = filetypes.test(file.mimetype);

if(mimetype && extname){
return cb(null,true);
} else {
cb('Error: Images Only!');
}
}

exports.addTool = (req, res) => {
upload(req, res, (err) => {
if (err) {
console.error('Error during file upload:', err);
return res.status(400).send(err);
} else {
const { title, beschikbaarheid, afmetingen, location, category, description } = req.body;
const image = req.file ? req.file.filename : null; // Get filename if file uploaded, otherwise null

  // Check if required fields are present
  if (!title || !beschikbaarheid || !afmetingen || !location || !category || !description) {
    return res.status(400).send('All fields are required');
  }

  // Execute the rest of the function
  const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, beschikbaarheid, afmetingen, location, category, description, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding the tool:', err);
      return res.status(500).send('An internal server error occurred while adding the tool');
    }
    
    console.log('Tool successfully added, redirecting to /tools/products');
    return res.redirect('/tools/products');
  });
}
});
};

// Fetch all products from the database
exports.getAllProducts = (callback) => {
const query = 'SELECT title, status, beschrijving, id, image FROM tools';
db.query(query, (error, results) => {
if (error) {
console.error('Error fetching products:', error);
return callback(error, null);
}

  const products = results.map(product => ({
      ...product,
      imageURL: `/uploads/${product.image}`
  }));
  
  callback(null, products);
});
};

// Fetch a specific tool by ID from the database
exports.getToolById = (req, res) => {
const { id } = req.params;
const query = 'SELECT * FROM tools WHERE id = ?';
db.query(query, [id], (error, results) => {
if (error) {
console.error('Error fetching tool:', error);
return res.status(500).send('An internal server error occurred');
}

  const imageURL = `/uploads/${results[0].image}`;
  res.render('productinfo', { product: results[0], imageURL: imageURL });
});
};

exports.deleteTool = (req, res) => {
const { id } = req.params;
const query = 'DELETE FROM tools WHERE id = ?';

db.query(query, [id], (error, results) => {
if (error) {
console.error('Error deleting tool:', error);
return res.status(500).send('An internal server error occurred');
}

  if (results.affectedRows === 0) {
      return res.status(404).send('No tool found with the specified ID');
  }

  res.status(200).send({ message: 'Tool successfully deleted' });
});
};

exports.searchProducts = (req, res) => {
  const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';

  const query = 'SELECT title, status, beschrijving, id, image FROM tools';
  db.query(query, (error, results) => {
      if (error) {
          console.error('Fout bij het ophalen van producten:', error);
          return res.status(500).send('Er is een interne serverfout opgetreden');
      }

      // Filter results based on search query
      const filteredResults = results.filter(product => {
          return product.title.toLowerCase().includes(searchQuery) ||
                 product.beschrijving.toLowerCase().includes(searchQuery);
      });

      // Map results to include image URL
      const products = filteredResults.map(product => ({
          ...product,
          imageURL: `/uploads/${product.image}`
      }));

      res.render('indexloggedin', { products });
  });
};
