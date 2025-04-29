const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware CORS sécurisé
const allowedOrigins = [
  'https://gestionnaire-de-contacts.vercel.app',
  'http://localhost:3000' // pour les tests en local (facultatif)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Serveur d’images / uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

// ✅ Route de test simple
app.get('/', (req, res) => {
  res.send('Backend is up and running 🎉');
});

app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// ✅ Gestion des erreurs
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

// ✅ Création dossier uploads si non existant
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
