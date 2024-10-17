// pages/Payment.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './payment.css'; // Optional: import your styles

const menuItems = [
    { id: 1, name: 'Craft Beer', details: 'A refreshing craft beer with hoppy notes.', price: 5.00, image: 'path/to/beer.jpg', type: 'beer' },
    { id: 2, name: 'Mojito', details: 'A classic cocktail with mint and lime.', price: 8.00, image: 'path/to/mojito.jpg', type: 'cocktail' },
    { id: 3, name: 'Honey Chicken', details: 'Crispy Chicken topped with cheese and honey.', price: 6.50, image: 'path/to/food.jpg', type: 'snack' },
    { id: 4, name: 'Wings', details: 'Spicy buffalo wings served with blue cheese dressing.', price: 9.00, image: 'path/to/wings.jpg', type: 'snack' },
    { id: 5, name: 'Onion Rings', details: 'Crispy onion rings served with a tangy sauce.', price: 5.50, image: 'path/to/nachos.jpg', type: 'snack' },
    { id: 6, name: 'IPA Beer', details: 'A bold and hoppy India Pale Ale.', price: 6.00, image: 'path/to/beer.jpg', type: 'beer' },
    { id: 7, name: 'Pina Colada', details: 'A tropical blend of rum, coconut cream.', price: 9.50, image: 'path/to/beer.jpg', type: 'cocktail' },
    { id: 8, name: 'Whiskey Sour', details: 'A classic cocktail with whiskey.', price: 7.00, image: 'path/to/beer.jpg', type: 'cocktail' },
    { id: 9, name: 'Stout Beer', details: 'A rich and creamy stout with coffee.', price: 6.50, image: 'path/to/beer.jpg', type: 'beer' },
    { id: 10, name: 'Tacos', details: 'Soft tacos filled with seasoned meat.', price: 8.00, image: 'path/to/nachos.jpg', type: 'snack' },
    { id: 11, name: 'Nachos', details: 'Crispy nachos topped with cheese and jalapeños.', price: 6.50, image: 'path/to/nachos.jpg', type: 'snack' },
];

const Payment = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart); // Access cart state
     // Get user info

    // Calculate total price
    const totalPrice = Object.keys(cart).reduce((total, itemId) => {
        const item = menuItems.find(item => item.id === Number(itemId));
        return total + (item ? item.price * cart[itemId].quantity : 0);
    }, 0);

    // Handle payment submission
    const handlePayment = (e) => {
        e.preventDefault();
        // Here you can implement the payment logic
        alert('Payment processed successfully!');
        navigate('/'); // Redirect to home after payment
    };

    return (
        <div className="payment-container">
            <h1>Payment Page</h1>
            {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <h2>Order Summary</h2>
                    <div className="order-summary">
                        {Object.keys(cart).map(itemId => {
                            const item = menuItems.find(item => item.id === Number(itemId));
                            return (
                                item && (
                                    <div key={itemId} className="order-item">
                                        <img src={item.image} alt={item.name} className="order-item-image" />
                                        <div className="order-item-details">
                                            <h3>{item.name}</h3>
                                            <p>Price: ${(item.price).toFixed(2)}</p>
                                            <p>Quantity: {cart[itemId].quantity}</p>
                                            <p>Total: ${(item.price * cart[itemId].quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

                    <form onSubmit={handlePayment} className="payment-form">
                        <h2>Payment Information</h2>
                        <div>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" required />
                        </div>
                        <div>
                            <label htmlFor="expiryDate">Expiry Date:</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div>
                            <label htmlFor="cvv">CVV:</label>
                            <input type="text" id="cvv" required />
                        </div>
                        <button type="submit">Pay Now</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Payment;
