import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';
import { useForm } from 'react-hook-form';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors }
  } = useForm();

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

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password
    });
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

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entrez votre email"
                    isInvalid={!!errors.email}
                    {...registerField('email', {
                      required: 'L’email est requis',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Format d’email invalide'
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Mot de passe */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    isInvalid={!!errors.password}
                    {...registerField('password', {
                      required: 'Le mot de passe est requis'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Se Connecter
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Pas encore de compte ? <Link to="/register">S'inscrire</Link>
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
