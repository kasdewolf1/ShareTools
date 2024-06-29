const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');
const jwt = require('jsonwebtoken');

// Middleware om JWT-token te decoderen
function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
      return res.redirect('/login'); // Geen token, doorsturen naar inlogpagina
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
          console.log(err.message);
          return res.redirect('/login'); // Ongeldig token, doorsturen naar inlogpagina
      }

      req.user = decodedToken; // Gebruikersgegevens toevoegen aan het verzoek
      next(); // Doorgaan naar de volgende middleware/route
  });
}

router.get('/', (req, res) => {
    res.render('Hoofdpagina');
});

router.get('/hoofdpagina', (req, res) => {
    res.render('hoofdpagina');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/wachtwoordvergeten', verifyToken, (req, res) => {
    res.render('wachtwoordvergeten', { user: req.user }); // Gebruikersgegevens toegevoegd
});

router.get('/indexloggedin', verifyToken, toolsController.getAllProducts, (req, res) => {
    res.render('indexloggedin', { products: res.locals.products, user: req.user }); // Gebruikersgegevens toegevoegd
  });
  
  router.get('/toolbewerken', (req, res) => { 
      res.render('toolbewerken'); // Gebruikersgegevens toegevoegd
  });
  
  router.get('/productinfo', verifyToken, (req, res) => {
      // Get the product ID from the query parameter
      const productId = req.query.productId;
      if (!productId) {
          return res.status(400).send('Product ID is required');
      }
  
      toolsController.getToolById({ params: { id: productId } }, res, () => {
          res.render('productinfo', { 
              title: res.locals.product.title, 
              afmeting: res.locals.product.afmeting,
              categorie: res.locals.product.categorie,
              locatie: res.locals.product.locatie,
              beschikbaarheid: res.locals.product.beschikbaarheid,
              beschrijving: res.locals.product.beschrijving,
              imageURL: res.locals.product.imageURL,
              user: req.user // Gebruikersgegevens toegevoegd
          });
      });
  });
  
  router.get('/Tooltoevoegen', verifyToken, (req, res) => {
      res.render('Tooltoevoegen', { user: req.user }); // Gebruikersgegevens toegevoegd
  });
  
  router.get('/mijnaccount', verifyToken, (req, res) => {
    res.render('mijnaccount', { user: req.user }); // Gebruikersgegevens toegevoegd
  });

  router.get('/ToolProfiel', verifyToken, (req, res) => {
    res.render('ToolProfiel', { 
        title: 'Hamer', 
        user: req.user, // Gebruikersgegevens toegevoegd
        locatie: 'Kast', 
        status: 'Beschikbaar', 
        beschrijving: 'Een beschrijving over de tool.'
    });
});

router.get('/meldingen', verifyToken, (req, res) => {
    res.render('meldingen', { user: req.user }); // Gebruikersgegevens toegevoegd
});

router.get('/toollenen', (req, res) => {
    res.render('toollenen');
});


router.get('/mijnaccountbewerken', (req, res) => {
    res.render('mijnaccountbewerken');
});

module.exports = router;