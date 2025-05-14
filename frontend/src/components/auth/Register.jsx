import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';
import { useForm } from 'react-hook-form';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
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
    if (data.password !== data.password2) {
      setAlertMsg('Les mots de passe ne correspondent pas');
      return;
    }

    register({
      name: data.name,
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
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Inscription
              </h2>

              {alertMsg && (
                <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                  {alertMsg}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Nom */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre nom"
                    isInvalid={!!errors.name}
                    {...registerField('name', {
                      required: 'Le nom est requis'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

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
                        message: 'Email invalide'
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
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 6,
                        message: 'Au moins 6 caractères'
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirmation mot de passe */}
                <Form.Group className="mb-3" controlId="formPassword2">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    isInvalid={!!errors.password2}
                    {...registerField('password2', {
                      required: 'Confirmation requise',
                      minLength: {
                        value: 6,
                        message: 'Au moins 6 caractères'
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password2?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  S'inscrire
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
