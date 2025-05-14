import React, { useContext, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';
import { useForm } from 'react-hook-form';

const PasswordForm = () => {
  const authContext = useContext(AuthContext);
  const { updatePassword } = authContext;

  const [alertMsg, setAlertMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Les mots de passe ne correspondent pas'
      });
      setAlertMsg('');
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
      reset();
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

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Mot de passe actuel */}
          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>Mot de passe actuel*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe actuel"
              isInvalid={!!errors.currentPassword}
              {...register('currentPassword', {
                required: 'Mot de passe actuel requis'
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Nouveau mot de passe */}
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
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirmation mot de passe */}
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmer le nouveau mot de passe*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              isInvalid={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Veuillez confirmer le mot de passe',
                minLength: {
                  value: 6,
                  message: 'Au moins 6 caractères'
                }
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
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
