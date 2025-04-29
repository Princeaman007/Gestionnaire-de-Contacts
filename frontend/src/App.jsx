import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contexts
import AuthState from './contexts/auth/AuthState';
import ContactState from './contexts/contact/ContactState';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/layout/PrivateRoute';
import AdminRoute from './components/layout/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ContactDetails from './pages/ContactDetails';
import Admin from './pages/Admin';

// Custom CSS
import './assets/styles/App.css';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <div className="app-container d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 py-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contact/:id"
                  element={
                    <PrivateRoute>
                      <ContactDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;