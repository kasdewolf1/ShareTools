const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');
const authController = require('../controllers/auth');

// Define routes
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

router.get('/indexloggedin', (req, res) => {
    toolsController.getAllProducts((error, products) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).send('Internal server error');
        }
        res.render('indexloggedin', { products: products });
    });
});

router.get('/ToolBewerken/:id', (req, res) => {
    const productId = req.params.id;
    toolsController.getToolById(productId, (error, product) => {
        if (error) {
            console.error('Error fetching product:', error);
            return res.status(500).send('Internal server error');
        }
        res.render('Toolbewerken', { product: product });
    });
});

router.get('/productinfo', (req, res) => {
    res.render('productinfo', { message: 'productinfo geladen' });
});

router.get('/Tooltoevoegen', (req, res) => {
    res.render('Tooltoevoegen');
});

router.get('/mijnaccount', async (req, res) => {
    try {
      const user = await authController.getUserById(req.user.id);
  
      // Check if user is found
      if (!user) {
        return res.status(404).render('error', { message: 'User not found' });
      }
  
      res.render('mijnaccount', { user });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Error fetching user data' });
    }
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