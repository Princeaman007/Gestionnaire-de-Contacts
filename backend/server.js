const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// 🎯 Correction CORS ici
const allowedOrigins = [
  'https://gestionnaire-de-contacts.vercel.app', // Retiré le slash à la fin
  'http://localhost:3000' // Pour développement local
];

const corsOptions = {
  origin: function (origin, callback) {
    // Pour les requêtes sans origine ou depuis une origine autorisée
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origine bloquée par CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Options preflight pour toutes les routes
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 📦 Chargement des routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Backend is up and running 🎉');
});

app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// 🛡 Gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur:', err.message);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

// 📂 Créer dossier uploads si nécessaire
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`CORS autorisé pour:`, allowedOrigins);
});