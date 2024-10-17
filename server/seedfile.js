const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Adjust the path if necessary

// Connect to MongoDB
mongoose.connect('mongodb+srv://dvsdivyendu:Eo9zw3vdN7tEV4Qk@project1.jqfrk.mongodb.net/dvsdivyendu?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Sample menu items
const menuItems = [
    { name: 'Craft Beer', details: 'A refreshing craft beer with hoppy notes.', price: 5.00, image: 'beer.jpg', type: 'beer' },
    { name: 'Mojito', details: 'A classic cocktail with mint and lime.', price: 8.00, image: 'mojito.jpg', type: 'cocktail' },
    { name: 'Honey Chicken', details: 'Crispy Chicken topped with cheese and honey.', price: 6.50, image: 'honey-chicken.jpg', type: 'snack' },
    { name: 'Wings', details: 'Spicy buffalo wings served with blue cheese dressing.', price: 9.00, image: 'wings.jpg', type: 'snack' },
    { name: 'Onion Rings', details: 'Crispy onion rings served with a tangy sauce.', price: 5.50, image: 'onion-rings.jpg', type: 'snack' },
    { name: 'IPA Beer', details: 'A bold and hoppy India Pale Ale.', price: 6.00, image: 'ipa-beer.jpg', type: 'beer' },
    { name: 'Pina Colada', details: 'A tropical blend of rum, coconut cream.', price: 9.50, image: 'pina-colada.jpg', type: 'cocktail' },
    { name: 'Whiskey Sour', details: 'A classic cocktail with whiskey.', price: 7.00, image: 'whiskey-sour.jpg', type: 'cocktail' },
    { name: 'Stout Beer', details: 'A rich and creamy stout with coffee.', price: 6.50, image: 'stout-beer.jpg', type: 'beer' },
    { name: 'Tacos', details: 'Soft tacos filled with seasoned meat.', price: 8.00, image: 'tacos.jpg', type: 'snack' },
    { name: 'Nachos', details: 'Crispy nachos topped with cheese and jalapeños.', price: 6.50, image: 'nachos.jpg', type: 'snack' },
    { name: 'Tikka Masala', details: 'Chicken cooked in a spicy sauce.', price: 6.50, image: 'tikka-masala.jpg', type: 'snack' },
    { name: 'Pan Toast', details: 'Crispy toast served with butter.', price: 6.50, image: 'pan-toast.jpg', type: 'snack' },
    { name: 'Crispy King Leg', details: 'Spicy and crispy chicken leg.', price: 6.50, image: 'crispy-king-leg.jpg', type: 'snack' },
];

// Function to seed menu items
const seedMenuItems = async () => {
    try {
        await MenuItem.deleteMany({}); // Clear existing items
        await MenuItem.insertMany(menuItems); // Insert new items
        console.log('Menu items seeded successfully');
    } catch (error) {
        console.error('Error seeding menu items:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

seedMenuItems();
