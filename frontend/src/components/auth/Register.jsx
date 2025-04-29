import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
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

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlertMsg('Veuillez remplir tous les champs');
    } else if (password !== password2) {
      setAlertMsg('Les mots de passe ne correspondent pas');
    } else if (password.length < 6) {
      setAlertMsg('Le mot de passe doit avoir au moins 6 caractères');
    } else {
      register({
        name,
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
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Inscription
              </h2>
              
              {alertMsg && (
                <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                  {alertMsg}
                </Alert>
              )}
              
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Entrez votre nom"
                    required
                  />
                </Form.Group>

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
                    minLength="6"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword2">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirmez votre mot de passe"
                    minLength="6"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  S'inscrire
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                <p>
                  Déjà un compte? <Link to="/login">Se connecter</Link>
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