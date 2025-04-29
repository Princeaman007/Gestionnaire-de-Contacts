import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faUser, faSignOutAlt, faCog, faUserShield } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const authLinks = (
    <>
      <Nav.Link as={Link} to="/">
        <FontAwesomeIcon icon={faAddressBook} className="me-1" /> Contacts
      </Nav.Link>
      
      <NavDropdown title={
        <span>
          <FontAwesomeIcon icon={faUser} className="me-1" />
          {user && user.name}
        </span>
      } id="collasible-nav-dropdown">
        <NavDropdown.Item as={Link} to="/profile">
          <FontAwesomeIcon icon={faCog} className="me-1" /> Profil
        </NavDropdown.Item>
        
        {user && user.role === 'admin' && (
          <NavDropdown.Item as={Link} to="/admin">
            <FontAwesomeIcon icon={faUserShield} className="me-1" /> Admin
          </NavDropdown.Item>
        )}
        
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Déconnexion
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/register">S'inscrire</Nav.Link>
      <Nav.Link as={Link} to="/login">Se connecter</Nav.Link>
    </>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faAddressBook} className="me-2" />
          Gestionnaire de Contacts
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;