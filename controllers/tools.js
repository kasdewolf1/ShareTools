const db = require('../db'); // Path to db.js
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// INITIALIZE UPLOAD MIDDLEWARE
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');


// CHECK FILE TYPE
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


// FUNCTION TO GET ALL PRODUCTS
exports.getAllProducts = (req, res) => {
  const query = 'SELECT title, status, beschrijving, afmeting, publiek, favoriet, id, image FROM tools';
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


// FUNCTION TO GET A TOOL BY ID
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


// FUNCTION TO ADD A TOOL
exports.addTool = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).send(err);
    } else {
      const { title, beschikbaarheid, afmetingen, location, category, description, favoriet, publiek } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!title || !beschikbaarheid || !afmetingen || !location || !category || !description || !favoriet || !publiek) {
        return res.status(400).send('All fields are required');
      }

      const favorietInt = parseInt(favoriet, 10);

      const sql = 'INSERT INTO tools (title, status, afmeting, locatie, categorie, beschrijving, image, favoriet, publiek) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [title, beschikbaarheid, afmetingen, location, category, description, image, favoriet, publiek];

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


// FUNCTION TO DELETE A TOOL
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


// FUNCTION TO EDIT A TOOL
exports.editToolGet = (req, res) => {
  const toolId = req.params.id;

  db.query('SELECT * FROM tools WHERE id = ?', [toolId], (err, results) => {
      if (err) {
          console.error('Error fetching tool details:', err);
          return res.status(500).send('Internal server error');
      }
      res.render('toolbewerken', { product: results[0] });
  });
};

exports.editToolPost = (req, res) => {
  const toolId = req.params.id;
  const { title, category, afmetingen, /* other fields */ } = req.body;

  db.query('UPDATE tools SET title = ?, category = ?, afmetingen = ?, /* other fields */ WHERE id = ?', 
      [title, category, afmetingen, /* other field values */, toolId], 
      (err, result) => {
          if (err) {
              console.error('Error updating tool:', err);
              return res.status(500).send('Internal server error');
          }
          res.redirect(`/tools/${toolId}`);
      }
  );
};