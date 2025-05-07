import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/LoginAdmin" replace />;
  }

  // If admin route but user is not admin, redirect to home
  if (isAdmin && (!user.role || user.role !== 'admin')) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute; 