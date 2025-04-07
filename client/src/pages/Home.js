import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import OfferPopup from './OfferPopup';
import backgroundVideo from '../assets/video.mp4'; // Ensure the correct path to the video file

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

        <p>Your favorite place for food, drinks, and events!</p>
        <Link to="/gallery">
          <button className="cta-button">Explore</button>
        </Link>
      </section>

      <section className="features">
        <h2>Explore Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <Link to="/reservations" className="feature-link">
              <h3>Online Reservations</h3>
              <p>Book your table easily through our online reservation system.</p>
            </Link>
          </div>
          <div className="feature-card">
            <Link to="/event" className="feature-link">
              <h3>Events Calendar</h3>
              <p>Stay updated on our upcoming events and RSVP quickly.</p>
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
