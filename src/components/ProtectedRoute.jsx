import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { currentUser, isAdminUser, loadingAuth } = useAuth();

  if (loadingAuth) {
    return null; // Render nothing while loading
  }

  if (currentUser && isAdminUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
