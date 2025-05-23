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
    setError,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = data;

    // Vérifier que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Les mots de passe ne correspondent pas'
      });
      setAlertMsg('');
      setSuccessMsg('');
      return;
    }

    // Vérifier les exigences de complexité du mot de passe
    if (newPassword.length < 6) {
      setError('newPassword', {
        type: 'manual',
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
      return;
    }

    // Démarrer le chargement
    setLoading(true);
    console.log('Tentative de mise à jour du mot de passe...');

    // Créer un objet de données propre
    const passwordData = {
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim()
    };

    console.log('Données envoyées (format):', {
      currentPasswordLength: passwordData.currentPassword.length,
      newPasswordLength: passwordData.newPassword.length
    });

    // Envoyer la requête de mise à jour
    const result = await updatePassword(passwordData);
    console.log('Résultat de la mise à jour:', result);

    // Succès
    setSuccessMsg('Mot de passe mis à jour avec succès');
    setAlertMsg('');
    reset(); // Réinitialiser le formulaire
  } catch (err) {
    console.error('Erreur lors de la mise à jour du mot de passe:', err);
    
    let errorMessage = 'Erreur lors de la mise à jour du mot de passe';
    
    // Extraction du message d'erreur selon le format
    if (err && err.message) {
      errorMessage = err.message;
    } else if (err && err.error) {
      errorMessage = err.error;
    } else if (err && typeof err === 'string') {
      errorMessage = err;
    } else if (err && err.response && err.response.data) {
      errorMessage = err.response.data.message || JSON.stringify(err.response.data);
    } else if (typeof err === 'object') {
      errorMessage = 'Erreur serveur: Veuillez vérifier votre mot de passe actuel';
      console.log('Erreur détaillée:', JSON.stringify(err));
    }
    
    // Gérer les erreurs spécifiques
    if (errorMessage.toLowerCase().includes('incorrect') || 
        errorMessage.toLowerCase().includes('invalid') || 
        errorMessage.toLowerCase().includes('wrong')) {
      setError('currentPassword', {
        type: 'manual',
        message: 'Mot de passe actuel incorrect'
      });
      setAlertMsg('Le mot de passe actuel est incorrect');
    } else {
      setAlertMsg(errorMessage);
    }
    
    setSuccessMsg('');
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
              disabled={loading}
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
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Le mot de passe doit contenir au moins 6 caractères.
            </Form.Text>
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
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
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