import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      setAlertMsg(error);
      clearErrors();
    }
  }, [error, isAuthenticated, navigate, clearErrors]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlertMsg('Veuillez remplir tous les champs');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                Connexion
              </h2>
              
              {alertMsg && (
                <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                  {alertMsg}
                </Alert>
              )}
              
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Entrez votre email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Se Connecter
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                <p>
                  Pas encore de compte? <Link to="/register">S'inscrire</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;