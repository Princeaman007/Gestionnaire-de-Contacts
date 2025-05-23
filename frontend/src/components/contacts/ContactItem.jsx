import React, { useContext, useEffect } from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faEdit, faTrash,
  faStickyNote, faMapMarkerAlt, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import ContactContext from '../../contexts/contact/ContactContext';

const ContactItem = ({ contact }) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(ContactContext);
  const { _id, name, email, phone, type, notes, address, avatar } = contact;

  useEffect(() => {
    console.groupCollapsed(`🧾 Contact: ${name}`);
    console.log("📍 Type d'adresse :", typeof address);
    console.log("📬 Valeur de l'adresse :", address);
    console.groupEnd();
  }, [contact]);

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <Card className="mb-3 shadow-sm contact-card">
      <Card.Body>
        <Row>
          <Col md={avatar ? 9 : 12}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="text-primary mb-0">{name}</h4>
              <Badge bg={type === 'professionnel' ? 'primary' : 'success'}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
            </div>

            <ul className="list-unstyled">
              <li className="mb-1">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-secondary" />
                {email}
              </li>
              <li className="mb-1">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-secondary" />
                {phone}
              </li>

              {address && typeof address === 'object' && (
                <li className="mb-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-secondary" />
                  {[
                    address.street,
                    address.city,
                    address.zipCode,
                    address.country
                  ].filter(Boolean).join(', ')}
                </li>
              )}

              {notes && (
                <li className="mb-1">
                  <FontAwesomeIcon icon={faStickyNote} className="me-2 text-secondary" />
                  {notes}
                </li>
              )}
            </ul>
          </Col>

          {avatar && (
            <Col md={3} className="text-center">
              <img
                src={`http://localhost:5000/uploads/${avatar}`}
                alt={`Avatar de ${name}`}
                className="img-thumbnail rounded object-fit-cover"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onError={(e) => {
                  console.error("❌ Erreur chargement avatar:", avatar);
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const iconContainer = document.createElement('div');
                  iconContainer.className = 'text-center';
                  iconContainer.innerHTML = '<i class="fas fa-user-circle fa-4x text-secondary"></i>';
                  e.target.parentNode.appendChild(iconContainer);
                }}
              />
            </Col>
          )}
        </Row>

        <div className="mt-3 d-flex justify-content-end">
          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setCurrent(contact)}>
            <FontAwesomeIcon icon={faEdit} className="me-1" /> Modifier
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} className="me-1" /> Supprimer
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;
