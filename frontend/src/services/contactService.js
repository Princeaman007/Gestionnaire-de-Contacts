import api from '../utils/api';

// Obtenir tous les contacts
export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtenir un contact spécifique
export const getContact = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Créer un contact
export const createContact = async (contactData) => {
  // Si contactData contient un avatar (fichier), utilisons FormData
  if (contactData.avatar instanceof File) {
    const formData = new FormData();
    
    // Ajouter les champs de base
    Object.keys(contactData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', contactData.avatar);
      } else if (key === 'address') {
        // Gérer l'objet address
        Object.keys(contactData.address).forEach(addrKey => {
          if (contactData.address[addrKey]) {
            formData.append(`address[${addrKey}]`, contactData.address[addrKey]);
          }
        });
      } else {
        formData.append(key, contactData[key]);
      }
    });
    
    try {
      const response = await api.post('/contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    // Pas de fichier, utiliser JSON standard
    try {
      const response = await api.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

// Mettre à jour un contact
export const updateContact = async (id, contactData) => {
  // Si contactData contient un avatar (fichier), utilisons FormData
  if (contactData.avatar instanceof File) {
    const formData = new FormData();
    
    // Ajouter les champs de base
    Object.keys(contactData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', contactData.avatar);
      } else if (key === 'address') {
        // Gérer l'objet address
        Object.keys(contactData.address).forEach(addrKey => {
          if (contactData.address[addrKey]) {
            formData.append(`address[${addrKey}]`, contactData.address[addrKey]);
          }
        });
      } else {
        formData.append(key, contactData[key]);
      }
    });
    
    try {
      const response = await api.put(`/contacts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    // Pas de fichier, utiliser JSON standard
    try {
      const response = await api.put(`/contacts/${id}`, contactData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

// Supprimer un contact
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
