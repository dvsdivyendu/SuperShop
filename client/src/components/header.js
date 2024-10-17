import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../slices/authSlice';
import { clearCart, setCartItems } from '../slices/slice'; 
import axios from 'axios';
import '../components/Header.css';
import logoImage from '../assets/icon.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart); 
  const user = useSelector(state => state.auth.user); 
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu visibility

  const totalItems = Object.values(cart).reduce((total, cartItem) => {
    return total + (cartItem.quantity || 0);
  }, 0);

  useEffect(() => {
    console.log('Total items in cart:', totalItems);
  }, [totalItems]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        dispatch(setCartItems(response.data));
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="header-logo" id='logo-img' />
        <div className="logo">The Beer</div>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" className="link">Home</NavLink></li>
          <li><NavLink to="/menu" className="link">Menu</NavLink></li>
          <li><NavLink to="/reservations" className="link">Reservations</NavLink></li>
          <li><NavLink to="/event" className="link">Events</NavLink></li>
          <li><NavLink to="/feedback" className="link">Contact Us</NavLink></li>
          <li>
            <NavLink to="/cart" className="link cart-link">
              <div className="cart-icon-container">
                <FontAwesomeIcon icon={faShoppingCart} />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </div>
            </NavLink>
          </li>
          
          {user ? (
            <>
              <li>
                <NavLink to="/profile" className="link">
                  {user.email} <FontAwesomeIcon icon={faUser} style={{ color: '#63E6BE' }} />
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="link">
                Login <FontAwesomeIcon icon={faUser} style={{ color: '#63E6BE' }} />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
