const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');
const upload = require('../multerConfig');

router.post('/', upload.single('image'), toolsController.addTool);
router.get('/products', toolsController.getAllProducts);
router.get('/product/:id', toolsController.getToolById);
router.delete('/delete/:id', toolsController.deleteTool);
router.get('/bewerken/:id', toolsController.getToolByIdForEdit);
router.post('/editToolById/:id', toolsController.editToolById);

module.exports = router;