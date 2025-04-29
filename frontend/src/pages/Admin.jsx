import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import UserList from '../components/admin/UserList';
import UserForm from '../components/admin/UserForm';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };
  
  const handleCancelEdit = () => {
    setSelectedUser(null);
  };
  
  const handleSaveUser = () => {
    setSelectedUser(null);
  };
  
  return (
    <Container>
      <h1 className="mb-4">Administration</h1>
      
      {selectedUser ? (
        <UserForm
          user={selectedUser}
          onCancel={handleCancelEdit}
          onSave={handleSaveUser}
        />
      ) : (
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="users" title="Gestion des utilisateurs">
            <UserList onEditUser={handleEditUser} />
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default Admin;