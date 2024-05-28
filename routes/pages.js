const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Define routes
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
    toolsController.getAllProducts((error, products) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }
        res.render('indexloggedin', { products: products });
    });
});

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
    res.render('ToolProfiel', { 
        title: 'Hamer', 
        user: 'Luca', 
        locatie: 'Kast', 
        status: 'Beschikbaar', 
        beschrijving: 'Een beschrijving over de tool.'
    });
});

router.get('/meldingen', (req, res) => {
    res.render('meldingen');
});

module.exports = router;