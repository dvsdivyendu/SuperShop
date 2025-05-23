const mongoose = require('mongoose');
const Cart = require('../models/Cart'); // Ensure the Cart model is correctly imported

// Add an item to the cart
exports.addItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body; // Expecting itemId and quantity in the request body

        // Check if the item already exists in the cart (for simplicity, we'll assume a single cart)
        let cartItem = await Cart.findOne({ itemId });

        if (cartItem) {
            // Update quantity if item already exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create a new cart item
            cartItem = new Cart({ itemId, quantity });
            await cartItem.save();
        }

        res.status(201).json({ message: 'Item added to cart', item: cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

// Get all items in the cart
exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('itemId', 'name price image'); // Populate name, price, and image
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

/// Delete an item from the cart by ID
exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    // Validate the ID format
   /* if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Received invalid ID:', id); // Log the invalid ID
        return res.status(400).json({ message: 'Invalid ID format' });
    }*/

    try {
        // Attempt to delete the item
        const result = await Cart.findByIdAndDelete(id);
        console.log('Delete operation result:', result); // Log the result of the delete operation

        // Check if the item was found and deleted
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Successful deletion response
        res.status(200).json({ message: 'Item deleted from cart' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting item:', error);
        // Respond with a 500 error
        res.status(500).json({ message: 'Error deleting item from cart' });
    }
};
// Clear all items in the cart
exports.clearCart = async (req, res) => {
    try {
        // Fetch and log the current cart items before clearing
        const cartItems = await Cart.find();
        console.log('Current cart items before clearing:', cartItems);

        // Clear the cart
        await Cart.deleteMany(); // Deletes all items in the cart

        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart' });
    }
};
