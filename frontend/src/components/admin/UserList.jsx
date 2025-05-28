import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { getUsers, deleteUser } from '../../services/userService';
import { AvatarImage } from '../../utils/imageService';

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
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError(err.message || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const handleDeleteUser = async (id, name) => {
    if (!id) {
      setError("ID d'utilisateur manquant, impossible de supprimer");
      return;
    }
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} ?`)) {
      try {
        console.log(`Tentative de suppression de l'utilisateur: ${id}`);
        setLoading(true);
        
        await deleteUser(id);
        
        setSuccessMsg(`L'utilisateur ${name} a été supprimé avec succès`);
        setError(null);
        await loadUsers();
      } catch (err) {
        console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, err);
        setError(err.message || "Erreur lors de la suppression de l'utilisateur");
      } finally {
        setLoading(false);
      }
    }
  };
  
  if (loading && users.length === 0) {
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
      
      {loading && (
        <div className="text-center my-2">
          <Spinner animation="border" size="sm" className="me-2" />
          Chargement en cours...
        </div>
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
                    <AvatarImage
                      src={user.avatar}
                      alt="Avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                      onError={(e) => {
                        console.error(`Erreur de chargement de l'avatar pour ${user.name}`);
                      }}
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
                <td>
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString() 
                    : 'Date inconnue'}
                </td>
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
                    disabled={loading}
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