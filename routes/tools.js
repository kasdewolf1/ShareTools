const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Define the POST route for adding a tool
router.post('/addTool', toolsController.addTool);

// Define the GET route for retrieving all products
router.get('/products', toolsController.getAllProducts);

// Define the GET route for retrieving a specific product by ID
router.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    // Gebruik productId om het specifieke product op te halen uit de database
    // en geef dit product weer in de respons
    res.send(`Product ID: ${productId}`);
});

module.exports = router;
