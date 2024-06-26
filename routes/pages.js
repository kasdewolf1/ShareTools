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

router.get('/wachtwoordvergeten', (req, res) => {
  res.render('wachtwoordvergeten');
});

router.get('/indexloggedin', toolsController.getAllProducts);

router.get('/productinfo', (req, res) => {
  res.render('productinfo', { message: 'productinfo geladen' });
});

router.get('/Tooltoevoegen', (req, res) => {
  res.render('Tooltoevoegen');
});

router.get('/mijnaccount', (req, res) => {
  res.render('mijnaccount');
});

router.get('/mijnaccountbewerken', (req, res) => {
  res.render('mijnaccountbewerken');
});

router.get('/ToolProfiel', (req, res) => {
  res.render('ToolProfiel');
});

router.get('/meldingen', (req, res) => {
  res.render('meldingen');
});

router.get('/toolbewerken', (req, res) => {
  res.render('toolbewerken');
});

router.get('/toollenen', (req, res) => {
  res.render('toollenen');
});

module.exports = router;