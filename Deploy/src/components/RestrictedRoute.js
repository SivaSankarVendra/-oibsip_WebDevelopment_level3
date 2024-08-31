import React from 'react';
import { Navigate } from 'react-router-dom';

const RestrictedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole');

  if (userRole === role) {
    // If the user has the restricted role, redirect to home page
    return <Navigate to="/" />;
  }

  // If the user does not have the restricted role, allow them to access the route
  return children;
};

export default RestrictedRoute;
