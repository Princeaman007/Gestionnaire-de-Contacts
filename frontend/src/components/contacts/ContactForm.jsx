import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ContactContext from '../../contexts/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent, error } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personnel',
    notes: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: ''
    },
    avatar: null
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showAddressFields, setShowAddressFields] = useState(false);

  useEffect(() => {
    if (current !== null) {
      // S'assurer que current a toujours une propriété address avec une structure complète
      const safeContact = {
        ...current,
        address: current.address || {
          street: '',
          city: '',
          zipCode: '',
          country: ''
        }
      };
      
      setContact(safeContact);
      
      if (current.address) {
        setShowAddressFields(true);
      }
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personnel',
        notes: '',
        address: {
          street: '',
          city: '',
          zipCode: '',
          country: ''
        },
        avatar: null
      });
      setPreviewUrl('');
    }
    
    if (error) {
      setAlertMsg(error);
    }
  }, [current, error, contactContext]);

  // Utiliser l'opérateur de destructuration avec valeur par défaut
  const { name, email, phone, type, notes, address = {} } = contact;

  const onChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setContact({
        ...contact,
        address: {
          ...contact.address || {}, // S'assurer que address existe
          [addressField]: value
        }
      });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContact({ ...contact, avatar: file });
      
      // Créer une URL pour la prévisualisation
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      setAlertMsg('Veuillez remplir les champs obligatoires');
      return;
    }
    
    if (current === null) {
      addContact(contact).then(() => {
        clearAll();
      }).catch(err => {
        setAlertMsg(err.message || 'Erreur lors de l\'ajout du contact');
      });
    } else {
      updateContact(contact).then(() => {
        clearAll();
      }).catch(err => {
        setAlertMsg(err.message || 'Erreur lors de la mise à jour du contact');
      });
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h3 className="text-primary mb-3">
          <FontAwesomeIcon icon={current ? faEdit : faPlus} className="me-2" />
          {current ? 'Modifier le contact' : 'Ajouter un contact'}
        </h3>
        
        {alertMsg && (
          <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
            {alertMsg}
          </Alert>
        )}
        
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={current && current.avatar ? 9 : 12}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom*</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Nom du contact"
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
                  placeholder="Email du contact"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Téléphone*</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="Téléphone du contact"
                  required
                />
              </Form.Group>
            </Col>
            
            {(current && current.avatar || previewUrl) && (
              <Col md={3} className="text-center">
                <div className="mt-4">
                  <img
                    src={previewUrl || `/uploads/${current.avatar}`}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            )}
          </Row>
          
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Type de contact</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Personnel"
                name="type"
                value="personnel"
                checked={type === 'personnel'}
                onChange={onChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Professionnel"
                name="type"
                value="professionnel"
                checked={type === 'professionnel'}
                onChange={onChange}
              />
            </div>
          </Form.Group>
          
          <div className="mb-3">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => setShowAddressFields(!showAddressFields)}
              className="btn-sm"
            >
              {showAddressFields ? 'Masquer l\'adresse' : 'Ajouter une adresse'}
            </Button>
          </div>
          
          {showAddressFields && (
            <div className="address-fields mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formStreet">
                    <Form.Label>Rue</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.street"
                      value={address?.street || ''}
                      onChange={onChange}
                      placeholder="Rue"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.city"
                      value={address?.city || ''}
                      onChange={onChange}
                      placeholder="Ville"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formZipCode">
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.zipCode"
                      value={address?.zipCode || ''}
                      onChange={onChange}
                      placeholder="Code postal"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Pays</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.country"
                      value={address?.country || ''}
                      onChange={onChange}
                      placeholder="Pays"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
          
          <Form.Group className="mb-3" controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={notes || ''}
              onChange={onChange}
              placeholder="Notes sur le contact"
              rows={3}
            />
          </Form.Group>
          
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
              Choisissez une image pour l'avatar du contact (JPG, PNG, GIF).
            </Form.Text>
          </Form.Group>
          
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              {current ? 'Mettre à jour' : 'Ajouter'}
            </Button>
            {current && (
              <Button variant="light" onClick={clearAll}>
                Annuler
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;