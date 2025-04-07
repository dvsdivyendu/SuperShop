import React from 'react';
import './OfferPopup.css'; // Importing CSS
import { useNavigate } from 'react-router-dom';

const OfferPopup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleShopNow = () => {
      onClose(); // Close the popup
      navigate('/reservations'); // Navigate to the menu section
    };
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h2>Special Offer!</h2>
        <p>Get 20% off on your first order! Use code: WELCOME20</p>
        <button className="popup-btn" onClick={handleShopNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default OfferPopup;
