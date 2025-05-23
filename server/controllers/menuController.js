// server/controllers/menuController.js
const mongoose = require('mongoose');
const Menu = require('../models/MenuItem'); // Adjust this import based on your MenuItem model path

// Get all menu items
exports.getMenuItems = async (req, res) => {
    console.log('Get menu items request received');
    try {
        const menuItems = await Menu.find();

        // Map the items to include the full image URL
        const itemsWithImages = menuItems.map(item => ({
            ...item.toObject(),
            image: item.image ? `http://localhost:5000/images/${item.image}` : null // Full URL if image exists
        }));

        res.status(200).json(itemsWithImages); // Send back the menu items as a response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, details, price, type } = req.body;
    const image = req.file ? req.file.filename : null; // Use filename for the image path

    const menuItem = new Menu({
        name,
        details,
        price,
        type,
        image,
    });

    try {
        const savedItem = await menuItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, details, price, type } = req.body;
    const image = req.file ? req.file.filename : null; // Use filename for the image path

    try {
        const updatedItem = await Menu.findByIdAndUpdate(id, {
            name,
            details,
            price,
            type,
            image,
        }, { new: true });

        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        
        // Return the updated item with the full image URL
        res.json({
            ...updatedItem.toObject(),
            image: updatedItem.image ? `http://localhost:5000/images/${updatedItem.image}` : null
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
