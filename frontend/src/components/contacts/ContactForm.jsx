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

  // Utiliser la structure d'objet imbriqué pour les champs d'adresse
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
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
      }
    }
  });

  // Remplir le formulaire avec les données du contact actuel
  useEffect(() => {
    if (current) {
      // Définir les valeurs de base
      reset({
        name: current.name || '',
        email: current.email || '',
        phone: current.phone || '',
        type: current.type || 'personnel',
        notes: current.notes || '',
      });

      // Définir les valeurs d'adresse si elles existent
      const address = current.address || {};
      setValue('address.street', address.street || '');
      setValue('address.city', address.city || '');
      setValue('address.zipCode', address.zipCode || '');
      setValue('address.country', address.country || '');

      // Afficher les champs d'adresse si au moins un champ a une valeur
      if (address.street || address.city || address.zipCode || address.country) {
        setShowAddressFields(true);
      }

      // Définir l'URL de prévisualisation de l'avatar
      if (current.avatar) {
        setPreviewUrl(`http://localhost:5000/uploads/${current.avatar}`);
      } else {
        setPreviewUrl('');
      }
    } else {
      // Réinitialiser le formulaire si aucun contact n'est sélectionné
      reset();
      setPreviewUrl('');
    }

    // Afficher les erreurs
    if (error) {
      setAlertMsg(error);
    }
  }, [current, error, reset, setValue]);

  // Gérer le changement de fichier d'avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Soumettre le formulaire
  const onSubmit = async (data) => {
    try {
      // Vérifier les champs obligatoires
      if (!data.name || !data.email || !data.phone) {
        setAlertMsg('Veuillez remplir les champs obligatoires');
        return;
      }

      // Construire les données du contact
      // Comme nous utilisons une structure imbriquée, nous pouvons simplement copier data
      const contactData = { ...data };

      // Ajouter l'avatar seulement s'il y a un nouveau fichier
      if (avatarFile) {
        contactData.avatar = avatarFile;
      }

      console.log('Données à envoyer:', contactData);

      if (current === null) {
        // Création d'un nouveau contact
        await addContact(contactData);
        console.log('Contact ajouté avec succès');
      } else {
        // Vérifier que l'ID est présent
        if (!current._id) {
          throw new Error("ID de contact manquant, impossible de mettre à jour");
        }
        
        // Mise à jour d'un contact existant
        console.log('Mise à jour du contact avec ID:', current._id);
        await updateContact(current._id, contactData);
        console.log('Contact mis à jour avec succès');
      }

      // Réinitialiser le formulaire et les états
      clearCurrent();
      reset();
      setAvatarFile(null);
      setPreviewUrl('');
      setShowAddressFields(false);
      setAlertMsg('');
    } catch (err) {
      console.error('Erreur détaillée:', err);
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
                      console.error("Erreur de chargement de l'image d'aperçu");
                      e.target.onerror = null;
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