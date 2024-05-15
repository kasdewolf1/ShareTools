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
    res.render('indexloggedin', { message: 'main page geladen'},);
});
router.get('/product', (req, res) => {
    res.render('product', { message: 'productinfo geladen'} ,);
});

router.get('/Tooltoevoegen', (req, res) => {
    res.render('Tooltoevoegen');
});

router.get('/mijnaccount', (req, res) => {
    res.render('mijnaccount');
});

module.exports = router;