import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/auth/AuthContext';

const ProfileForm = () => {
    const authContext = useContext(AuthContext);
    const { user, updateProfile, error } = authContext;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: null
    });

    const [previewUrl, setPreviewUrl] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: null
            });
        }

        if (error) {
            setAlertMsg(error);
            setSuccessMsg('');
        }
    }, [user, error]);

    const { name, email } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file });

            // Créer une URL pour la prévisualisation
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            setAlertMsg('Veuillez remplir tous les champs obligatoires');
            setSuccessMsg('');
            return;
        }

        try {
            await updateProfile(formData);
            setSuccessMsg('Profil mis à jour avec succès');
            setAlertMsg('');
        } catch (err) {
            setAlertMsg(err.message || 'Erreur lors de la mise à jour du profil');
            setSuccessMsg('');
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h3 className="text-primary mb-3">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Modifier mon profil
                </h3>

                {alertMsg && (
                    <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                        {alertMsg}
                    </Alert>
                )}

                {successMsg && (
                    <Alert variant="success" onClose={() => setSuccessMsg('')} dismissible>
                        {successMsg}
                    </Alert>
                )}

                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col md={user && user.avatar ? 9 : 12}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nom*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    placeholder="Votre nom"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="Votre email"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        {(user && user.avatar || previewUrl) && (
                            <Col md={3} className="text-center">
                                <div className="mt-4">
                                    <img
                                        src={previewUrl || `http://localhost:5000/uploads/${user.avatar}`}
                                        alt="Avatar"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            console.error("Erreur de chargement d'image:", user.avatar);
                                            e.target.src = 'https://via.placeholder.com/150'; // Image de secours
                                        }}
                                    />
                                </div>
                            </Col>
                        )}
                    </Row>

                    <Form.Group className="mb-3" controlId="formAvatar">
                        <Form.Label>
                            <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                            Avatar
                        </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <Form.Text className="text-muted">
                            Choisissez une image pour votre avatar (JPG, PNG, GIF).
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Mettre à jour le profil
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProfileForm;