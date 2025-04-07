// components/Admin/FeedbackSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FeedbackSection.module.css'; // Optional: import a CSS module for styling

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setErrorMessage('Failed to fetch feedback.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedbacks</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className={styles.feedbackList}>
          {feedbacks.map((feedback) => (
            <li key={feedback._id}>
              <strong>{feedback.name}</strong> - {feedback.message}
              {feedback.date && <span> ({new Date(feedback.date).toLocaleDateString()})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackSection;
