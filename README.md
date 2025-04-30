# Documentation pour votre projet



```markdown
# Gestionnaire de Contacts

Application complète de gestion de contacts avec une API sécurisée (Express + MongoDB) et une interface utilisateur moderne (React + Vite).



## Fonctionnalités

- 🔐 Authentification avec JWT (JSON Web Tokens)
- 👥 Gestion des rôles utilisateurs (admin, utilisateur standard)
- 📇 CRUD complet pour les contacts
- 🖼️ Upload et gestion d'avatars
- 📱 Interface responsive avec React et Bootstrap

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4 ou supérieur)
- npm ou yarn

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/Princeaman007/Gestionnaire-de-Contacts.git
cd gestionnaire-contacts
```

### Backend

```bash
cd backend
npm install
cp .env.example .env  
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  
npm run dev
```

## Configuration

### Variables d'environnement Backend (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact-app
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Variables d'environnement Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_UPLOADS_URL=http://localhost:5000/uploads
```

## Utilisation de Docker

Le projet inclut une configuration Docker pour un déploiement facile.

```bash
docker-compose up -d
```

## Structure du projet

```
contact-app/
├── backend/          # API Express + MongoDB
│   ├── config/       # Configuration de la base de données
│   ├── controllers/  # Logique métier
│   ├── middleware/   # Middleware d'authentification, etc.
│   ├── models/       # Modèles Mongoose
│   ├── routes/       # Routes API
│   ├── uploads/      # Stockage des avatars
│   ├── .env          # Variables d'environnement
│   └── server.js     # Point d'entrée
│
└── frontend/         # Application React + Vite
    ├── src/
    │   ├── assets/    # Images, styles
    │   ├── components/# Composants React
    │   ├── contexts/  # Context API pour la gestion d'état
    │   ├── pages/     # Pages principales
    │   ├── services/  # Services API
    │   ├── utils/     # Utilitaires
    │   ├── App.jsx    # Composant racine
    │   └── main.jsx   # Point d'entrée
    ├── .env           # Variables d'environnement
    └── index.html     # Template HTML
```

## Déploiement

Pour le déploiement en production :

1. Mettre à jour les variables d'environnement pour la production
2. Construire le frontend : `cd frontend && npm run build`
3. Configurer un serveur web (Nginx, Apache) pour servir les fichiers statiques
4. Configurer le backend avec PM2 ou un service similaire

