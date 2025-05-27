import api from '../utils/api';

export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error);
    throw error.response?.data || error;
  }
};

export const getContact = async (id) => {
  if (!id) {
    console.error("ID de contact manquant");
    throw new Error("ID de contact manquant");
  }
  
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du contact ${id}:`, error);
    throw error.response?.data || error;
  }
};

export const createContact = async (contactData) => {
  console.log("Création de contact avec données:", contactData);
  
  try {
    if (contactData.avatar instanceof File) {
      const formData = new FormData();
      
      // Ajouter tous les champs au FormData
      Object.keys(contactData).forEach(key => {
        if (key === 'avatar') {
          formData.append('avatar', contactData.avatar);
        } else if (key === 'address' && contactData.address) {
        
          Object.keys(contactData.address).forEach(addrKey => {
            if (contactData.address[addrKey]) {
              formData.append(`address[${addrKey}]`, contactData.address[addrKey]);
            }
          });
        } else {
          formData.append(key, contactData[key]);
        }
      });
      
      const response = await api.post('/contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } else {
      const response = await api.post('/contacts', contactData);
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la création du contact:", error);
    throw error.response?.data || error;
  }
};

// Mettre à jour un contact
export const updateContact = async (id, contactData) => {
 
  if (!id) {
    console.error("ID de contact manquant pour la mise à jour");
    throw new Error("ID de contact manquant");
  }
  
  console.log(`Mise à jour du contact ${id} avec données:`, contactData);
  
  try {
    if (contactData.avatar instanceof File) {
      const formData = new FormData();
      
      // Ajouter les champs de base
      Object.keys(contactData).forEach(key => {
        if (key === 'avatar') {
          formData.append('avatar', contactData.avatar);
        } else if (key === 'address' && contactData.address) {
          
          if (typeof contactData.address === 'object' && contactData.address !== null) {
            Object.keys(contactData.address).forEach(addrKey => {
              if (contactData.address[addrKey]) {
                formData.append(`address[${addrKey}]`, contactData.address[addrKey]);
              }
            });
          }
        } else {
          formData.append(key, contactData[key]);
        }
      });
      
      // Déboguer le contenu du FormData
      for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} = ${value}`);
      }
      
      const response = await api.put(`/contacts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Réponse de mise à jour:", response.data);
      return response.data;
    } else {
     
      if (typeof contactData !== 'object' || contactData === null) {
        throw new Error("Données de contact invalides");
      }
      
      const response = await api.put(`/contacts/${id}`, contactData);
      console.log("Réponse de mise à jour:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du contact ${id}:`, error);
    if (error.response) {
      console.error("Détails de l'erreur:", error.response.data);
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Supprimer un contact
export const deleteContact = async (id) => {
  if (!id) {
    console.error("ID de contact manquant pour la suppression");
    throw new Error("ID de contact manquant");
  }
  
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du contact ${id}:`, error);
    throw error.response?.data || error;
  }
};