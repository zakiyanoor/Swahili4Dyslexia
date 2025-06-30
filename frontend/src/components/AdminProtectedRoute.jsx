import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AdminProtectedRoute({ children }) {
  const { isAuth, isLoading, role } = useAuth();
  if (isLoading) return null;
  if (!isAuth || role !== 'admin') return <Navigate to="/signin" replace />;
  return children;
}

export default AdminProtectedRoute;
