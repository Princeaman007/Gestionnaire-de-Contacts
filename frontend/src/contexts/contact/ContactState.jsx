import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import contactReducer, { initialState } from './contactReducer';
import * as contactService from '../../services/contactService';

const ContactState = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Obtenir tous les contacts
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

  // Ajouter un contact
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

  // Supprimer un contact
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

  // Définir le contact courant
  const setCurrent = (contact) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: contact
    });
  };

  // Effacer le contact courant
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Mettre à jour un contact
  const updateContact = async (contact) => {
    try {
      const res = await contactService.updateContact(contact._id, contact);
      dispatch({
        type: 'UPDATE_CONTACT',
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

  // Filtrer les contacts
  const filterContacts = (text) => {
    dispatch({
      type: 'FILTER_CONTACTS',
      payload: text
    });
  };

  // Effacer le filtre
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  // Effacer les contacts (à la déconnexion)
  const clearContacts = () => {
    dispatch({ type: 'CLEAR_CONTACTS' });
  };

  // Effacer les erreurs
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