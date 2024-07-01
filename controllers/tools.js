const db = require('../db'); // Pad naar db.js

// Alle producten ophalen
exports.getAllProducts = (req, res, next) => {
  const query = 'SELECT title, status, beschrijving, id, publiek, favoriet, afmeting, image FROM tools';
  
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

      const tool = results[0];
      const imageURL = tool.image ? `/uploads/${tool.image}` : null;
      res.render('productinfo', { product: tool, imageURL: imageURL });
  });
};


// Tool toevoegen
exports.addTool = (req, res) => {
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
      console.error('Error adding the tool:', err);
      return res.status(500).send('An internal server error occurred while adding the tool');
    }

    console.log('Tool successfully added, redirecting to /indexloggedin');
    return res.redirect('/indexloggedin');
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

    const tool = results[0];
    const imageURL = tool.image ? `/uploads/${tool.image}` : null;
    res.render('toolbewerken', { product: results[0], imageURL: imageURL });
  });
};

// Tool bewerken per ID
exports.editToolById = (req, res) => {
  const { id } = req.params;
  const { title, category, afmetingen, beschikbaarheid, favoriet, publiek, location, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = 'UPDATE tools SET title=?, categorie=?, afmeting=?, status=?, favoriet=?, publiek=?, locatie=?, beschrijving=?, image=? WHERE id=?';
  const values = [title, category, afmetingen, beschikbaarheid, favoriet, publiek, location, description, image, id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Fout bij bewerken tool:', error);
      return res.status(500).send('Interne serverfout');
    }

    res.redirect('/indexloggedin'); // Na succesvolle update, terugkeren naar overzicht van tools of een andere gewenste bestemming
  });
};

