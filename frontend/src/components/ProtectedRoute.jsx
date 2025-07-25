 import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isAuth, isLoading, role } = useAuth();
  if (isLoading) return null;
  if (!isAuth || role !== 'user') return <Navigate to="/signin" replace />;
  return children;
}

export default ProtectedRoute;
