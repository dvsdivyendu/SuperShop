import React, { useState } from 'react';
import './Feedback.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API)
    alert('Thank you for your feedback!');
  };

  return (
    <div className="contact-page">
      <h1 className="page-title">Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out!</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: dvsdivyendu@gmail.com</p>
        <p>Phone: 8010205744</p>
        <p>Address: Plot No, A2, Maharaja Agrasen Marg, Sector 38, Noida, Uttar Pradesh 201301</p>
      </section>

      <section className="social-media">
        <h2>Follow Us</h2>
        <a href="https://www.facebook.com/yourprofile" className="social-link">Facebook</a>
        <a href="https://www.instagram.com/yourprofile" className="social-link">Twitter</a>
        <a href="https://www.x.com/yourprofile" className="social-link">Instagram</a>
      </section>
    </div>
  );
};

export default ContactPage;
