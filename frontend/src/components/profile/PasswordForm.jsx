import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';

const PasswordForm = () => {
  const authContext = useContext(AuthContext);
  const { updatePassword } = authContext;
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [alertMsg, setAlertMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { currentPassword, newPassword, confirmPassword } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertMsg('Veuillez remplir tous les champs');
      setSuccessMsg('');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setAlertMsg('Les nouveaux mots de passe ne correspondent pas');
      setSuccessMsg('');
      return;
    }
    
    if (newPassword.length < 6) {
      setAlertMsg('Le nouveau mot de passe doit avoir au moins 6 caractères');
      setSuccessMsg('');
      return;
    }
    
    try {
      await updatePassword({
        currentPassword,
        newPassword
      });
      
      setSuccessMsg('Mot de passe mis à jour avec succès');
      setAlertMsg('');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setAlertMsg(err.message || 'Erreur lors de la mise à jour du mot de passe');
      setSuccessMsg('');
    }
  };
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="text-primary mb-3">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Changer de mot de passe
        </h3>
        
        {alertMsg && (
          <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
            {alertMsg}
          </Alert>
        )}
        
        {successMsg && (
          <Alert variant="success" onClose={() => setSuccessMsg('')} dismissible>
            {successMsg}
          </Alert>
        )}
        
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>Mot de passe actuel*</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={onChange}
              placeholder="Votre mot de passe actuel"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>Nouveau mot de passe*</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={onChange}
              placeholder="Votre nouveau mot de passe"
              minLength="6"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmer le nouveau mot de passe*</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirmez votre nouveau mot de passe"
              minLength="6"
              required
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Mettre à jour le mot de passe
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PasswordForm;