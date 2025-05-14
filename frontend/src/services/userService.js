import api from '../utils/api';

// Mettre à jour le profil
export const updateProfile = async (userData) => {
 
  if (userData.avatar instanceof File) {
    const formData = new FormData();
    
   
    Object.keys(userData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', userData.avatar);
      } else {
        formData.append(key, userData[key]);
      }
    });
    
    try {
      const response = await api.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
 
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};


export const updatePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtenir tous les utilisateurs (admin)
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Mettre à jour un utilisateur (admin)
export const updateUser = async (id, userData) => {
  
  if (userData.avatar instanceof File) {
    const formData = new FormData();
    
    
    Object.keys(userData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', userData.avatar);
      } else {
        formData.append(key, userData[key]);
      }
    });
    
    try {
      const response = await api.put(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
  
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

// Supprimer un utilisateur (admin)
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};