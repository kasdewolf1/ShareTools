const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');

// Routes definities
router.get('/products', toolsController.getAllProducts);
router.get('/product/:id', toolsController.getToolById);
router.delete('/:id', toolsController.deleteTool);
router.post('/addTool', toolsController.addTool);
router.get('/bewerken/:id', toolsController.getToolByIdForEdit);
router.post('/editToolById/:id', toolsController.editToolById);


module.exports = router;