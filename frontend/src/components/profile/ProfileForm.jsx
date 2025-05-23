import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
  const authContext = useContext(AuthContext);
  const { user, updateProfile, error } = authContext;

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
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
      name: '',
      email: ''
    }
  });

  // Remplir les valeurs initiales
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || ''
      });
      
      // Si l'utilisateur a un avatar, définir l'URL d'aperçu
      if (user.avatar) {
        setPreviewUrl(`http://localhost:5000/uploads/${user.avatar}`);
      }
    }

    if (error) {
      setAlertMsg(error);
      setSuccessMsg('');
    }
  }, [user, error, reset]);

  // Gérer l'upload de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Vérifier les champs obligatoires
      if (!data.name || !data.email) {
        setAlertMsg('Veuillez remplir tous les champs obligatoires');
        setSuccessMsg('');
        return;
      }

      // Préparation des données à envoyer
      const formData = {
        name: data.name,
        email: data.email
      };

      // Ajouter l'avatar seulement s'il y a un nouveau fichier
      if (avatarFile) {
        formData.avatar = avatarFile;
      }

      setLoading(true);
      console.log('Envoi des données du profil:', formData);
      
      // Mise à jour du profil
      await updateProfile(formData);
      setSuccessMsg('Profil mis à jour avec succès');
      setAlertMsg('');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setAlertMsg(err.message || 'Erreur lors de la mise à jour du profil');
      setSuccessMsg('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="text-primary mb-3">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Modifier mon profil
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
          <Row>
            <Col md={previewUrl ? 9 : 12}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre nom"
                  isInvalid={!!errors.name}
                  {...register('name', { required: 'Le nom est requis' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Votre email"
                  isInvalid={!!errors.email}
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email invalide'
                    }
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {previewUrl && (
              <Col md={3} className="text-center">
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.error("Erreur de chargement de l'image d'avatar");
                      e.target.onerror = null; // Éviter les boucles infinies
                      // Utiliser une icône FontAwesome comme fallback
                      e.target.style.display = 'none';
                      const iconContainer = document.createElement('div');
                      iconContainer.innerHTML = '<i class="fas fa-user-circle fa-5x text-secondary"></i>';
                      e.target.parentNode.appendChild(iconContainer);
                    }}
                  />
                </div>
              </Col>
            )}
          </Row>

          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>
              <FontAwesomeIcon icon={faUserCircle} className="me-1" />
              Avatar
            </Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Form.Text className="text-muted">
              Choisissez une image pour votre avatar (JPG, PNG, GIF).
            </Form.Text>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Mise à jour en cours...' : 'Mettre à jour le profil'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileForm;