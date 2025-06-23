import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null; // or a spinner
  return isAuth ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute; 