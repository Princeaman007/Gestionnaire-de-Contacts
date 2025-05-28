const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();

// Connexion à la base de données
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Configuration CORS améliorée
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://gestionnaire-de-contacts-1.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {

    if (!origin && process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Origin bloquée par CORS: ${origin}`);
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Gestionnaire de Contacts API',
    version: '1.0.0',
    status: 'running 🎉'
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Erreur interne du serveur'
  });
});

// Middleware pour les routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Création du dossier uploads s'il n'existe pas
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Dossier uploads créé');
}


const defaultAvatarPath = path.join(uploadsDir, 'default-avatar.png');
if (!fs.existsSync(defaultAvatarPath)) {
  console.log('⚠️  Avatar par défaut manquant:', defaultAvatarPath);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Dossier uploads: ${uploadsDir}`);
});