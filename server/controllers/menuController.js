const mongoose = require('mongoose');
const Menu = require('../models/MenuItem'); // Adjust this import based on your MenuItem model path

console.log('Menu controller loaded');

// Get all menu items
exports.getMenuItems = async (req, res) => {
    console.log('Get menu items request received');
    try {
        const menuItems = await Menu.find(); // Fetch all menu items from the database
        // Map the items to include the full image URL
        const itemsWithImages = menuItems.map(item => ({
            ...item.toObject(),
            image: `http://localhost:5000/images/${item.image}` // Assuming 'image' is the filename
        }));
        res.status(200).json(itemsWithImages); // Send back the menu items as a response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

// Get a specific menu item by ID
exports.getMenuItem = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    console.log('Get menu item request received for id:', id);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const menuItem = await Menu.findById(id); // Find the menu item by ID
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' }); // Handle item not found
        }
        // Include the full image URL
        menuItem.image = `http://localhost:5000/images/${menuItem.image}`; // Assuming 'image' is the filename
        res.status(200).json(menuItem); // Send back the found menu item
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ message: 'Error fetching menu item' });
    }
};
