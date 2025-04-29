import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash, faEnvelope, faPhone, faMapMarkerAlt, faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ContactContext from '../contexts/contact/ContactContext';
import Spinner from '../components/layout/Spinner';
import { getContact, deleteContact } from '../services/contactService';

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contactContext = useContext(ContactContext);
  const { setCurrent } = contactContext;
  
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const res = await getContact(id);
        setContact(res.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement du contact');
        setContact(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContact();
  }, [id]);
  
  const handleEdit = () => {
    setCurrent(contact);
    navigate('/');
  };
  
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        await deleteContact(id);
        navigate('/');
      } catch (err) {
        setError(err.message || 'Erreur lors de la suppression du contact');
      }
    }
  };
  
  if (loading) {
    return <Spinner />;
  }
  
  if (error) {
    return (
      <Container>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Retour aux contacts
        </Button>
      </Container>
    );
  }
  
  if (!contact) {
    return (
      <Container>
        <div className="alert alert-warning" role="alert">
          Contact non trouvé
        </div>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Retour aux contacts
        </Button>
      </Container>
    );
  }
  
  const { name, email, phone, type, notes, address, avatar } = contact;
  
  return (
    <Container>
      <Button variant="outline-primary" onClick={() => navigate('/')} className="mb-4">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Retour aux contacts
      </Button>
      
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={avatar ? 9 : 12}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary mb-0">{name}</h1>
                <Badge bg={type === 'professionnel' ? 'primary' : 'success'} className="fs-6">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              </div>
              
              <div className="contact-details fs-5">
                <p className="mb-3">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 text-primary" />
                  {email}
                </p>
                <p className="mb-3">
                  <FontAwesomeIcon icon={faPhone} className="me-3 text-primary" />
                  {phone}
                </p>
                
                {address && (address.street || address.city || address.zipCode || address.country) && (
                  <p className="mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-primary" />
                    {[
                      address.street,
                      address.city,
                      address.zipCode,
                      address.country
                    ].filter(Boolean).join(', ')}
                  </p>
                )}
                
                {notes && (
                  <div className="mt-4">
                    <h4 className="mb-2">
                      <FontAwesomeIcon icon={faStickyNote} className="me-2 text-primary" />
                      Notes
                    </h4>
                    <p className="fs-6">{notes}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <Button variant="outline-primary" className="me-2" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Modifier
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Supprimer
                </Button>
              </div>
            </Col>
            
            {avatar && (
              <Col md={3} className="text-center">
                <img
                  src={`/uploads/${avatar}`}
                  alt="Avatar"
                  className="img-fluid rounded-circle mt-4"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactDetails;