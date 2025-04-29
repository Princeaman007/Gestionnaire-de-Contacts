import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordForm from '../components/profile/PasswordForm';

const Profile = () => {
  return (
    <Container>
      <h1 className="mb-4">Mon Profil</h1>
      <Row>
        <Col lg={6} className="mb-4">
          <ProfileForm />
        </Col>
        <Col lg={6} className="mb-4">
          <PasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;