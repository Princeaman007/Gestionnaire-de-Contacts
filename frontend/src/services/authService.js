import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

// Inscription
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; 
  } catch (error) {
    throw error.response.data;
  }
};


// Connexion
export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtenir l'utilisateur actuel
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Déconnexion
export const logout = () => {
  setAuthToken(null);
};