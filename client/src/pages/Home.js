import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import OfferPopup from './OfferPopup';
import backgroundVideo from '../assets/freshit.mp4'; // Ensure the correct path to the video file

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Show the popup only once per session using sessionStorage
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('hasSeenPopup', true); // Prevent pop-up from showing again in the same session
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false); // Close the pop-up when the user clicks the close button
  };

  return (
    <div className="home">
      {/* Offer Pop-up */}
      {showPopup && <OfferPopup onClose={handleClosePopup} />}

      <section className="hero">
        {/* Background Video */}
        <video className="hero-video" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <p>Your favorite place for food, electronics item, and cloths!</p>
        <Link to="/gallery">
          {/* <button className="cta-button">Explore</button> */}
        </Link>
      </section>

      <section className="features">
        <h2>Explore Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <Link to="/reservations" className="feature-link">
              <h3>Buy Now</h3>
              <p>Get an exclusive 50% OFF on the MRP—don’t miss this unbeatable deal!</p>
            </Link>
          </div>
          <div className="feature-card">
            <Link to="/event" className="feature-link">
              <h3>TrendingProducts</h3>
              <p>Explore our most popular items and grab the best deals before they're gone!</p>
            </Link>
          </div>
          <div className="feature-card">
            <h3>Loyalty Program</h3>
            <p>Join our loyalty program and earn rewards on your visits!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
