import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} Gestionnaire de Contacts | Tous droits réservés
        </p>
      </Container>
    </footer>
  );
};

export default Footer;