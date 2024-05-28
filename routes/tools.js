const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Define the GET route for retrieving all products
router.get('/indexloggedin', (req, res) => {
    toolsController.getAllProducts((error, products) => {
        if (error) {
            console.error('Fout bij het ophalen van producten:', error);
            return res.status(500).send('Er is een interne serverfout opgetreden');
        }
        res.render('indexloggedin', { products: products });
    });
});
router.get('/product/:id', toolsController.getToolById); // Adjusted route to /product/:id
router.delete('/:id', toolsController.deleteTool);
router.post('/addTool', toolsController.addTool);
router.get('/search', toolsController.searchProducts);

module.exports = router;