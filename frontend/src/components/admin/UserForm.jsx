import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { updateUser } from '../../services/userService';

const UserForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    avatar: null
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        avatar: null
      });
    }
  }, [user]);
  
  const { name, email, role } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      
      // Créer une URL pour la prévisualisation
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !role) {
      setAlertMsg('Veuillez remplir tous les champs obligatoires');
      setSuccessMsg('');
      return;
    }
    
    try {
      const res = await updateUser(user._id, formData);
      setSuccessMsg('Utilisateur mis à jour avec succès');
      setAlertMsg('');
      
      if (onSave) {
        onSave(res.data);
      }
    } catch (err) {
      setAlertMsg(err.message || 'Erreur lors de la mise à jour de l\'utilisateur');
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
        
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={user && user.avatar ? 9 : 12}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Nom de l'utilisateur"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email de l'utilisateur"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Rôle*</Form.Label>
                <Form.Select
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {(user && user.avatar || previewUrl) && (
              <Col md={3} className="text-center">
                <div className="mt-4">
                  <img
                    src={previewUrl || `/uploads/${user.avatar}`}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
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