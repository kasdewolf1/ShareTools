const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');
const upload = require('../multerConfig'); // Pas het pad aan indien nodig

// Routes definities
router.get('/products', toolsController.getAllProducts);
router.get('/product/:id', toolsController.getToolById);
router.delete('/:id', toolsController.deleteTool);
router.post('/addTool', toolsController.addTool);
router.get('/bewerken/:id', toolsController.getToolByIdForEdit);
router.post('/editToolById/:id', toolsController.editToolById);
router.get('/tools/:id', toolsController.getToolById);


module.exports = router;