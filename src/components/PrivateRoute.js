import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Ce composant gère l'accès aux routes protégées en fonction de l'état d'authentification
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;