const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Hoofdpagina');
});

router.get('/Hoofdpagina', (req, res) => {
    res.render('Hoofdpagina');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/indexloggedin', (req, res) => {
    // Render de indexloggedin view
    res.render('indexloggedin', { message: 'main page geladen'}, { products: results[0] });
});
router.get('/productinfo', (req, res) => {
    res.render('productinfo', { message: 'productinfo geladen'} ,{ product: results[0] });
});

router.get('/Tooltoevoegen', (req, res) => {
    res.render('Tooltoevoegen');
});


module.exports = router;