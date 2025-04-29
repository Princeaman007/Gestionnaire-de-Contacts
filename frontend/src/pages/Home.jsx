import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '../components/contacts/ContactForm';
import ContactList from '../components/contacts/ContactList';
import AuthContext from '../contexts/auth/AuthContext';
import ContactContext from '../contexts/contact/ContactContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { loadUser } = authContext;
  const { clearContacts } = contactContext;

  useEffect(() => {
    loadUser();
    
    return () => {
      clearContacts();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <ContactForm />
        </Col>
        <Col lg={8}>
          <h1 className="mb-4">Mes Contacts</h1>
          <ContactList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;