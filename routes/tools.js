const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Define the POST route for adding a tool
router.post('/addTool', toolsController.addTool);
//router.get('/products', toolsController.getAllProducts);
//router.get('/products/:id', toolsController.getProductById);

module.exports = router;


