import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { getUsers, deleteUser } from '../../services/userService';

const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} ?`)) {
      try {
        await deleteUser(id);
        setSuccessMsg(`L'utilisateur ${name} a été supprimé avec succès`);
        loadUsers();
      } catch (err) {
        setError(err.message || 'Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      {successMsg && (
        <Alert variant="success" onClose={() => setSuccessMsg('')} dismissible>
          {successMsg}
        </Alert>
      )}
      
      {users.length === 0 ? (
        <Alert variant="info">
          Aucun utilisateur trouvé
        </Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="text-center">
                  {user.avatar ? (
                    <img
                      src={`/uploads/${user.avatar}`}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.role === 'admin' ? 'danger' : 'info'}>
                    {user.role === 'admin' ? (
                      <><FontAwesomeIcon icon={faUserShield} className="me-1" /> Admin</>
                    ) : (
                      <><FontAwesomeIcon icon={faUser} className="me-1" /> Utilisateur</>
                    )}
                  </Badge>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onEditUser(user)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Modifier
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id, user.name)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" /> Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserList;