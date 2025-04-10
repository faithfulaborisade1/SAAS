import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, requiredSubscription = null }) => {
  const { isAuthenticated, subscription } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if specific subscription level is required
  if (requiredSubscription) {
    const subscriptionLevels = {
      standard: 1,
      premium: 2,
      professional: 3
    };

    // If user's subscription is lower than required, redirect to subscription page
    if (subscriptionLevels[subscription] < subscriptionLevels[requiredSubscription]) {
      return <Navigate to="/subscription" state={{ from: location }} replace />;
    }
  }

  // If authenticated and meets subscription requirements, render the protected content
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredSubscription: PropTypes.oneOf(['standard', 'premium', 'professional'])
};

export default ProtectedRoute;