const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Chargement des variables d'environnement avant tout
dotenv.config();

const app = express();

// 🎯 Configuration CORS simplifiée et robuste
app.use(cors({
  origin: ['https://gestionnaire-de-contacts.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Gérer explicitement les requêtes preflight
app.options('*', cors());

app.use(express.json());

// Configuration des routes statiques
try {
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
} catch (err) {
  console.error('Erreur avec le dossier uploads:', err.message);
}

// Route de santé - utile pour les tests de Fly.io
app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Backend is up and running 🎉');
});

// Connexion à la base de données avec gestion d'erreur
const connectDB = require('./config/db');
let dbConnected = false;

// Tentative de connexion à la DB mais sans bloquer le démarrage du serveur
connectDB()
  .then(() => {
    console.log('✅ MongoDB connecté avec succès');
    dbConnected = true;
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    // Le serveur continuera à fonctionner même si la DB n'est pas connectée
  });

// Middleware pour vérifier la connexion DB avant d'accéder aux routes API
const checkDbConnection = (req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({ 
      success: false, 
      error: 'La base de données n\'est pas disponible actuellement' 
    });
  }
  next();
};

// 📦 Chargement des routes avec vérification DB
app.use('/api/auth', checkDbConnection, require('./routes/auth'));
app.use('/api/contacts', checkDbConnection, require('./routes/contacts'));
app.use('/api/users', checkDbConnection, require('./routes/users'));

// 🛡 Gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur:', err.message);
  res.status(500).json({
    success: false,
    error: err.message || 'Erreur serveur'
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000; // Utiliser le port 3000 comme dans votre fly.toml
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`📡 Serveur démarré sur le port ${PORT}`);
});

// Gestion propre des arrêts du serveur
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu, arrêt du serveur');
  server.close(() => {
    console.log('Serveur arrêté');
    process.exit(0);
  });
});

// Capture des erreurs non gérées
process.on('uncaughtException', (error) => {
  console.error('Erreur non gérée:', error);
  // On laisse le serveur continuer de fonctionner
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesse rejetée non gérée:', reason);
  // On laisse le serveur continuer de fonctionner
});