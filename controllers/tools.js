const db = require('../db');

exports.addTool = (req, res) => {
  const { title, beschikbaarheid, afmetingen, location, category, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !beschikbaarheid || !afmetingen || !location || !category || !description) {
    return res.status(400).send('All fields are required');
  }

  const sql = 'INSERT INTO tools (title, beschikbaarheid, afmeting, locatie, categorie, beschrijving, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, beschikbaarheid, afmetingen, location, category, description, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding the tool:', err);
      return res.status(500).send('An internal server error occurred while adding the tool');
    }

    console.log('Tool successfully added, redirecting to /indexloggedin');
    return res.redirect('/indexloggedin');
  });
};

exports.getAllProducts = (req, res, next) => {
  const query = 'SELECT title, beschikbaarheid, beschrijving, id, image FROM tools';
  
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
exports.getToolById = (req, res, next) => {
  const id = req.params.id || req.query.id; // Corrected destructuring
  if (!id) {
    return res.status(400).send('Tool ID is required');
  }

  const query = 'SELECT * FROM tools WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error fetching tool:', error);
      return res.status(500).send('An internal server error occurred');
    }

    console.log('Get tool by ID query results:', results);

    if (!results || results.length === 0) {
      return res.status(404).send('Tool not found');
    }

    const tool = results[0];
    let imageURL = null;
    if (tool.image) {
      imageURL = `/uploads/${tool.image}`;
    }

    // Set the retrieved tool in res.locals to be accessed by the route handler
    res.locals.product = {
      ...tool,
      imageURL: imageURL
    };

    next(); // Proceed to the route handler
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

    console.log('Delete query results:', results);

    if (!results || results.affectedRows === 0) {
      return res.status(404).send('No tool found with the specified ID');
    }

    res.status(200).send({ message: 'Tool successfully deleted' });
  });
};