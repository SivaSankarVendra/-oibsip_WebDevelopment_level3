import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
