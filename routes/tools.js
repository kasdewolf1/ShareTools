const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tools');
const upload = require('../multerConfig');

router.post('/', upload.single('image'), toolsController.addTool);
router.get('/products', toolsController.getAllProducts);
router.get('/product/:id', toolsController.getToolById);
router.delete('/:id', toolsController.deleteTool);

module.exports = router;