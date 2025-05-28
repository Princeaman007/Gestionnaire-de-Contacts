import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} <strong>Princode Connect</strong> | Tous droits réservés<br />
          Développé par <a href="https://princeaman007.github.io/portfolio" target="_blank" rel="noopener noreferrer">Aman Prince</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
