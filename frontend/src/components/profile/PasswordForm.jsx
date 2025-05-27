import React, { useContext, useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';
import { useForm } from 'react-hook-form';

const PasswordForm = () => {
  const authContext = useContext(AuthContext);
  const { updatePassword } = authContext;

  const [alertMsg, setAlertMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      
      setAlertMsg('');
      setSuccessMsg('');
      
      
      if (!data.currentPassword || !data.newPassword || !data.confirmNewPassword) {
        setAlertMsg('Veuillez remplir tous les champs obligatoires');
        return;
      }

      
      if (data.newPassword !== data.confirmNewPassword) {
        setAlertMsg('Les nouveaux mots de passe ne correspondent pas');
        return;
      }

      
      if (data.newPassword.length < 6) {
        setAlertMsg('Le nouveau mot de passe doit contenir au moins 6 caractères');
        return;
      }

      
      setLoading(true);
      
     
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      };
      
      console.log('Envoi de la demande de mise à jour du mot de passe');
      
      
      await updatePassword(passwordData);
      
     
      setSuccessMsg('Mot de passe mis à jour avec succès');
      reset(); 
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
      
      
      let errorMessage = 'Erreur lors de la mise à jour du mot de passe';
      
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      
      setAlertMsg(errorMessage);
    } finally {
      setLoading(false);
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

        <Form onSubmit={handleSubmit(onSubmit)}>
         
          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>Mot de passe actuel*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe actuel"
              isInvalid={!!errors.currentPassword}
              {...register('currentPassword', {
                required: 'Mot de passe actuel requis'
              })}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>Nouveau mot de passe*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre nouveau mot de passe"
              isInvalid={!!errors.newPassword}
              {...register('newPassword', {
                required: 'Nouveau mot de passe requis',
                minLength: {
                  value: 6,
                  message: 'Au moins 6 caractères'
                }
              })}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Le mot de passe doit contenir au moins 6 caractères.
            </Form.Text>
          </Form.Group>

         
          <Form.Group className="mb-3" controlId="formConfirmNewPassword">
            <Form.Label>Confirmer le nouveau mot de passe*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              isInvalid={!!errors.confirmNewPassword}
              {...register('confirmNewPassword', {
                required: 'Veuillez confirmer le mot de passe',
                minLength: {
                  value: 6,
                  message: 'Au moins 6 caractères'
                }
              })}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmNewPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Mise à jour en cours...
              </>
            ) : (
              'Mettre à jour le mot de passe'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PasswordForm;