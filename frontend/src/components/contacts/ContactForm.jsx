import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ContactContext from '../../contexts/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent, error } = contactContext;

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showAddressFields, setShowAddressFields] = useState(false);

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm({
  defaultValues: {
    name: '',
    email: '',
    phone: '',
    type: 'personnel',
    notes: '',
    'address.street': '',
    'address.city': '',
    'address.zipCode': '',
    'address.country': ''
  }
});


  useEffect(() => {
    if (current) {
      
      const flatAddress = current.address || {};
      reset({
        name: current.name || '',
        email: current.email || '',
        phone: current.phone || '',
        type: current.type || 'personnel',
        notes: current.notes || '',
        'address.street': flatAddress.street || '',
        'address.city': flatAddress.city || '',
        'address.zipCode': flatAddress.zipCode || '',
        'address.country': flatAddress.country || ''
      });

      if (flatAddress.street || flatAddress.city || flatAddress.zipCode || flatAddress.country) {
        setShowAddressFields(true);
      }

      if (current.avatar) {
        setPreviewUrl(`/uploads/${current.avatar}`);
      }
    } else {
      reset();
      setPreviewUrl('');
    }

    if (error) {
      setAlertMsg(error);
    }
  }, [current, error, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const contactData = {
      ...data,
      avatar: avatarFile,
      address: {
        street: data['address.street'],
        city: data['address.city'],
        zipCode: data['address.zipCode'],
        country: data['address.country']
      }
    };

    if (!data.name || !data.email || !data.phone) {
      setAlertMsg('Veuillez remplir les champs obligatoires');
      return;
    }

    try {
      if (current === null) {
        await addContact(contactData);
      } else {
        await updateContact({ ...current, ...contactData });
      }
      clearCurrent();
      reset();
      setAvatarFile(null);
      setPreviewUrl('');
      setShowAddressFields(false);
    } catch (err) {
      setAlertMsg(err.message || "Erreur lors de l'enregistrement du contact");
    }
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

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={current?.avatar || previewUrl ? 9 : 12}>
              {/* Nom */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom du contact"
                  isInvalid={!!errors.name}
                  {...register('name', { required: 'Nom requis' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email du contact"
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

              {/* Téléphone */}
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Téléphone*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Téléphone du contact"
                  isInvalid={!!errors.phone}
                  {...register('phone', { required: 'Téléphone requis' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {(current?.avatar || previewUrl) && (
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

          {/* Type */}
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Type de contact</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Personnel"
                value="personnel"
                {...register('type')}
              />
              <Form.Check
                inline
                type="radio"
                label="Professionnel"
                value="professionnel"
                {...register('type')}
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
              {showAddressFields ? "Masquer l'adresse" : 'Ajouter une adresse'}
            </Button>
          </div>

          {/* Champs d'adresse */}
          {showAddressFields && (
            <div className="address-fields mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formStreet">
                    <Form.Label>Rue</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Rue"
                      {...register('address.street')}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ville"
                      {...register('address.city')}
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
                      placeholder="Code postal"
                      {...register('address.zipCode')}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Pays</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pays"
                      {...register('address.country')}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          {/* Notes */}
          <Form.Group className="mb-3" controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Notes sur le contact"
              rows={3}
              {...register('notes')}
            />
          </Form.Group>

          {/* Avatar */}
          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>
              <FontAwesomeIcon icon={faUserCircle} className="me-1" />
              Avatar
            </Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            <Form.Text className="text-muted">
              Choisissez une image pour l'avatar du contact.
            </Form.Text>
          </Form.Group>

          {/* Actions */}
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              {current ? 'Mettre à jour' : 'Ajouter'}
            </Button>
            {current && (
              <Button variant="light" onClick={clearCurrent}>
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
