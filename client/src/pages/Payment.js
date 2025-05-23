import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart); // Access cart state

    // State for selected address and payment method
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [promoCode, setPromoCode] = useState('');

    // Sample delivery addresses (replace with real data)
    const addresses = [
        {
            id: 1,
            name: 'Divyendu Singh',
            address: 'Vikram Motors, Lambhua, SULTANPUR, UTTAR PRADESH, 222302',
        }
    ];

    // Calculate total price
    const totalPrice = Object.keys(cart).reduce((total, itemId) => {
        const item = cart[itemId];
        return total + (item.price * item.quantity);
    }, 0);

    // Handle payment submission
    const handlePayment = (e) => {
        e.preventDefault();
        alert('Payment processed successfully!');
        navigate('/'); // Redirect to home after payment
    };

    return (
        <div className="payment-container">
            <h1>Checkout</h1>

            {/* Delivery Address */}
            <div className="section">
                <h2>Delivery Address</h2>
                {addresses.map(address => (
                    <div className="address-item" key={address.id}>
                        <p>{address.name}</p>
                        <p>{address.address}</p>
                        <button className="change-address">Change</button>
                        <button className="add-instructions">Add delivery instructions</button>
                    </div>
                ))}
            </div>

            {/* Payment Method */}
            <div className="section">
                <h2>Select a Payment Method</h2>
                <div>
                    <h3>Your Available Balance</h3>
                    <p>$100.00</p> {/* Placeholder for available balance */}
                    <label htmlFor="promoCode">Enter Code:</label>
                    <input
                        type="text"
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={() => alert('Promo code applied!')}>Apply</button>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                        />
                        Credit or Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="netbanking"
                            onChange={() => setPaymentMethod('netbanking')}
                        />
                        Net Banking
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            onChange={() => setPaymentMethod('upi')}
                        />
                        Other UPI Apps
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="emi"
                            onChange={() => setPaymentMethod('emi')}
                        />
                        EMI
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            onChange={() => setPaymentMethod('cod')}
                        />
                        Cash on Delivery/Pay on Delivery
                    </label>
                </div>
            </div>

            {/* Offers Section */}
            <div className="section offers">
                <h2>Offers</h2>
                <p>No current offers available.</p> {/* Placeholder for offers */}
            </div>

            {/* Order Summary */}
            <div className="section order-summary">
                <h2>Items and Delivery</h2>
                <div className="order-items">
                    {Object.keys(cart).map(itemId => {
                        const item = cart[itemId];
                        return (
                            <div key={itemId} className="order-item">
                                <p>{item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        );
                    })}
                </div>
                <h2 className="total-price">Total: ${totalPrice.toFixed(2)}</h2>
                <p className="ssl-notice">Your website is secured with SSL, ensuring that all information is encrypted during the transaction.</p>
                <button className="proceed-button" onClick={handlePayment}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Payment;
