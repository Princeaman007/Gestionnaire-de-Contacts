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



export const deleteUser = async (id) => {
  try {
    
    if (!id) {
      console.error("ID d'utilisateur manquant pour la suppression");
      throw new Error("ID d'utilisateur manquant");
    }
    
    console.log(`Tentative de suppression de l'utilisateur avec ID: ${id}`);
    
    const response = await api.delete(`/users/${id}`);
    console.log(`Utilisateur ${id} supprimé avec succès:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
    
   
    if (error.response && error.response.data) {
      console.error("Détails de l'erreur:", error.response.data);
      throw error.response.data;
    } else {
      throw new Error(error.message || "Erreur lors de la suppression de l'utilisateur");
    }
  }
};