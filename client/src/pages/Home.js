import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      
      <section className="hero">
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
