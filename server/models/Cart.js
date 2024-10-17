const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MenuItem' // Reference to the MenuItem model
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { collection: 'carts' }); // Specify the collection name here

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
