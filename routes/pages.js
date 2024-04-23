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
    res.render('indexloggedin');
});

router.get('/productinfo', (req, res) => {
    res.render('productinfo');
});

router.get('/Tooltoevoegen', (req, res) => {
    res.render('Tooltoevoegen');
});


module.exports = router;