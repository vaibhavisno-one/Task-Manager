import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute component that checks if user is authenticated
 * before rendering child routes
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.redirectPath - Path to redirect to if not authenticated
 * @returns {JSX.Element} The protected route component
 */
const ProtectedRoute = ({ 
  isAuthenticated, 
  redirectPath = '/login',
  children 
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, preserving the intended destination
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authenticated, render the children or outlet (for nested routes)
  return children || <Outlet />;
};

export default ProtectedRoute;