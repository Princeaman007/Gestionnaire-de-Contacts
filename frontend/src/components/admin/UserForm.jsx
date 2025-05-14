import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../services/userService';

const UserForm = ({ user, onCancel, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Remplir les champs avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user'
      });

      if (user.avatar) {
        setPreviewUrl(`/uploads/${user.avatar}`);
      }
    }
  }, [user, reset]);

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
    if (!data.name || !data.email || !data.role) {
      setAlertMsg('Veuillez remplir tous les champs obligatoires');
      setSuccessMsg('');
      return;
    }

    try {
      const formData = {
        ...data,
        avatar: avatarFile
      };

      const res = await updateUser(user._id, formData);
      setSuccessMsg("Utilisateur mis à jour avec succès");
      setAlertMsg('');

      if (onSave) onSave(res.data);
    } catch (err) {
      setAlertMsg(err.message || "Erreur lors de la mise à jour de l'utilisateur");
      setSuccessMsg('');
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h3 className="text-primary mb-3">
          <FontAwesomeIcon icon={faUserEdit} className="me-2" />
          Modifier l'utilisateur
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
            <Col md={user?.avatar || previewUrl ? 9 : 12}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom de l'utilisateur"
                  isInvalid={!!errors.name}
                  {...register('name', { required: 'Nom requis' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email de l'utilisateur"
                  isInvalid={!!errors.email}
                  {...register('email', {
                    required: 'Email requis',
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

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Rôle*</Form.Label>
                <Form.Select
                  isInvalid={!!errors.role}
                  {...register('role', { required: 'Rôle requis' })}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {(user?.avatar || previewUrl) && (
              <Col md={3} className="text-center">
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
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
              Choisissez une image pour l'avatar de l'utilisateur (JPG, PNG, GIF).
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Mettre à jour
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
