// server/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const upload = require('../middelware/uploadMiddleware'); // Ensure the path is correct

// GET /api/menu
router.get('/', menuController.getMenuItems);

// POST /api/menu
router.post('/', upload.single('image'), menuController.addMenuItem); // Use upload.single() for single file upload

// PUT /api/menu/:id
router.put('/:id', upload.single('image'), menuController.updateMenuItem); // Use upload.single() for single file upload

// DELETE /api/menu/:id
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
