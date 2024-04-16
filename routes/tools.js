const express = require('express');
const toolsController = require('../controllers/tools');
const router = express.Router();

router.post('/tools', toolsController.addTool);
//router.post('/tools/add', toolsController.addTool);

module.exports = router;