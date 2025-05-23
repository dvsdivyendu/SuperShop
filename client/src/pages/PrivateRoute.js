import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';

const PrivateRoute = ({ element, roles }) => {
  const user = useSelector(selectUser);

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user does not have a valid role, redirect to home
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // Render the passed element if authenticated and authorized
  return element; 
};

export default PrivateRoute;
