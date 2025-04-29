import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/AuthContext';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (loading) return <Spinner />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;