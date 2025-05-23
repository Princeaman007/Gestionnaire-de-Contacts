const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');

const app = express();

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Ajoutez ici les origines autorisées
  credentials: true
}));

app.use(express.json());

// Configuration spécifique pour le dossier uploads avec CORP (Cross-Origin Resource Policy)
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: err.message
  });
});

app.get('/', (req, res) => {
  res.send('Backend is up and running 🎉');
});

app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});