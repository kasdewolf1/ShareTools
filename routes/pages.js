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
            console.log("JWT verification error:", err.message);
            return res.redirect('/login'); // Ongeldig token, doorsturen naar inlogpagina
        }
        
        req.user = decodedToken; // Gebruikersgegevens toevoegen aan het verzoek
        next(); // Doorgaan naar de volgende middleware/route
    });
}

// Routes
router.get('/', (req, res) => {
    res.render('Hoofdpagina'); // Zorg ervoor dat de naam van je view correct is
});

router.get('/hoofdpagina', (req, res) => {
    res.render('hoofdpagina'); // Zorg ervoor dat de naam van je view correct is
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

// Beveiligde route
router.get('/indexloggedin', verifyToken, toolsController.getAllProducts, (req, res) => {
    res.render('indexloggedin', { products: res.locals.products, user: req.user }); // Gebruikersgegevens toegevoegd
  });

router.get('/productinfo', (req, res) => {
    res.render('productinfo', { message: 'productinfo geladen' });
});

router.get('/Tooltoevoegen', verifyToken, (req, res) => {
    res.render('Tooltoevoegen');
});

router.get('/mijnaccount', verifyToken, (req, res) => {
    res.render('mijnaccount');
});

router.get('/mijnaccountbewerken', verifyToken, (req, res) => {
    res.render('mijnaccountbewerken');
});

router.get('/ToolProfiel', verifyToken, (req, res) => {
    res.render('ToolProfiel');
});

router.get('/meldingen', verifyToken, (req, res) => {
    res.render('meldingen');
});

router.get('/toolbewerken', verifyToken, (req, res) => {
    res.render('toolbewerken');
});

router.get('/toollenen', verifyToken, (req, res) => {
    res.render('toollenen');
});

module.exports = router;
