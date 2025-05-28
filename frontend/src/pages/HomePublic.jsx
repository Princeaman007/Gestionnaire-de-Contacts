import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AuthContext from '../contexts/auth/AuthContext';

const HomePublic = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-bold mb-3">
              Bienvenue sur <span className="text-primary">Princode Connect</span>
            </h1>
            <p className="lead text-muted">
              La solution moderne pour gérer vos contacts personnels et professionnels.
              Centralisez, organisez et accédez à vos informations en toute simplicité.
            </p>
            <div className="mt-4 d-flex flex-column flex-md-row gap-3">
              <Link to="/login">
                <Button variant="primary" size="lg">Se connecter</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-primary" size="lg">S'inscrire gratuitement</Button>
              </Link>
            </div>
          </Col>

          <Col md={6} className="text-center">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="Illustration gestion de contacts"
              className="img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePublic;
