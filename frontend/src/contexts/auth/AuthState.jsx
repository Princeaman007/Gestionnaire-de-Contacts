import React, { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import authReducer, { initialState } from './authReducer';
import * as authService from '../../services/authService';
import * as userService from '../../services/userService';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await authService.getCurrentUser();
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.message });
    }
  };

  // Inscription
  const register = async (formData) => {
    try {
      const res = await authService.register(formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { token: res.token, user: res.user }
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.message || 'Une erreur est survenue lors de l\'inscription'
      });
    }
  };

  // Connexion
  const login = async (formData) => {
    try {
      const res = await authService.login(formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: res.token, user: res.user }
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.message || 'Identifiants invalides'
      });
    }
  };

  // Déconnexion
  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // Mettre à jour le profil
  const updateProfile = async (userData) => {
    try {
      const res = await userService.updateProfile(userData);
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.message || 'Erreur lors de la mise à jour du profil'
      });
      throw err;
    }
  };

  // Mettre à jour le mot de passe
  const updatePassword = async (passwordData) => {
    try {
      await userService.updatePassword(passwordData);
      return true;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.message || 'Erreur lors de la mise à jour du mot de passe'
      });
      throw err;
    }
  };


  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  // Charger l'utilisateur au démarrage si un token existe
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        updateProfile,
        updatePassword,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;