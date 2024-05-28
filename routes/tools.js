const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Define the GET route for retrieving all products
router.get('/products', toolsController.getAllProducts);
router.get('/product/:id', toolsController.getToolById); // Adjusted route to /product/:id
router.delete('/:id', toolsController.deleteTool);
router.post('/addTool', toolsController.addTool);
router.get('/search', toolsController.searchProducts);

module.exports = router;