import React, { useEffect} from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem, setCartItems } from '../slices/slice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../slices/authSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cart');
                debugger
                dispatch(setCartItems(response.data));
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                toast.error('Failed to fetch cart items.');
            }
        };

        fetchCartItems();
    }, [dispatch]);

    const calculateTotalPrice = () => {
        return Object.values(cart).reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate(user ? '/payment' : '/login');
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
            dispatch(removeItem(itemId));
            toast.success('Item removed successfully.');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error('Failed to remove item from cart.');
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete('http://localhost:5000/api/cart/clear');
            dispatch(clearCart());
            toast.success('Cart cleared successfully.');
        } catch (error) {
            console.error('Error clearing the cart:', error);
            toast.error('Failed to clear the cart.');
        }
    };

    return (
        <div className="cart-container">
            <ToastContainer />
            <h1>Your Cart</h1>
            {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {Object.values(cart).map(item => (
                            <div className="cart-item" key={item.id}>
                                <img 
                                    src={`http://localhost:5000/images/${item.image}`} 
                                    alt={item.name}  
                                    onError={(e) => { e.target.src = '/placeholder.jpg'; }} 
                                    className="cart-item-image" 
                                />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{(item.price || 0).toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Total: ₹{(item.price * item.quantity || 0).toFixed(2)}</p>
                                    <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Total Price: ${calculateTotalPrice()}</h2>
                        <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
