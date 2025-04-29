import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import ContactContext from '../../contexts/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const ContactList = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading, filterContacts, clearFilter } = contactContext;
  
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (contacts !== null && contacts.length === 0) {
    return (
      <div className="text-center mt-4">
        <h4>Aucun contact trouvé</h4>
        <p>Commencez par ajouter un contact en utilisant le formulaire ci-dessus.</p>
      </div>
    );
  }

  const onChange = (e) => {
    setSearchValue(e.target.value);
    
    if (e.target.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onClearSearch = () => {
    setSearchValue('');
    clearFilter();
  };

  return (
    <>
      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Rechercher des contacts..."
            value={searchValue}
            onChange={onChange}
          />
          {searchValue && (
            <Button variant="outline-secondary" onClick={onClearSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          )}
          <InputGroup.Text className="bg-primary text-white">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form>
      
      <Row>
        {(filtered || contacts).map(contact => (
          <Col lg={6} key={contact._id}>
            <ContactItem contact={contact} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ContactList;