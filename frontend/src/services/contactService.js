import api from '../utils/api';

export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getContact = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const createContact = async (contactData) => {
 
  if (contactData.avatar instanceof File) {
    const formData = new FormData();
    
 
    Object.keys(contactData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', contactData.avatar);
      } else if (key === 'address') {
       
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
 
  if (contactData.avatar instanceof File) {
    const formData = new FormData();
    
    // Ajouter les champs de base
    Object.keys(contactData).forEach(key => {
      if (key === 'avatar') {
        formData.append('avatar', contactData.avatar);
      } else if (key === 'address') {
      
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
