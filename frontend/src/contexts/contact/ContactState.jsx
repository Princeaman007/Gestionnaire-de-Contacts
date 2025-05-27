import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import contactReducer, { initialState } from './contactReducer';
import * as contactService from '../../services/contactService';

const ContactState = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

 
  const getContacts = async () => {
    try {
      const res = await contactService.getContacts();
      dispatch({
        type: 'GET_CONTACTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.message
      });
    }
  };

 
  const addContact = async (contact) => {
    try {
      const res = await contactService.createContact(contact);
      dispatch({
        type: 'ADD_CONTACT',
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.message
      });
      throw err;
    }
  };

 
  const deleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.message
      });
      throw err;
    }
  };

  
  const setCurrent = (contact) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: contact
    });
  };

 
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };


const updateContact = async (id, contact) => {
  try {
    console.log('ContactState - Mise à jour du contact - ID:', id);
    console.log('ContactState - Mise à jour du contact - Data:', contact);
    
    
    if (!id) {
      throw new Error("ID de contact invalide ou manquant");
    }
    
    const res = await contactService.updateContact(id, contact);
    dispatch({
      type: 'UPDATE_CONTACT',
      payload: res.data
    });
    return res.data;
  } catch (err) {
    console.error('ContactState - Erreur de mise à jour:', err);
    dispatch({
      type: 'CONTACT_ERROR',
      payload: err.message || "Erreur lors de la mise à jour du contact"
    });
    throw err;
  }
};

 
  const filterContacts = (text) => {
    dispatch({
      type: 'FILTER_CONTACTS',
      payload: text
    });
  };


  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  
  const clearContacts = () => {
    dispatch({ type: 'CLEAR_CONTACTS' });
  };

  
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        clearErrors
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;