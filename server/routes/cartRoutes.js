const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItem); // No authentication middleware applied
router.get('/', cartController.getCart);
router.delete('/clear', cartController.clearCart); 
router.delete('/:id', cartController.deleteItem);
// Route to clear the cart

module.exports = router;
