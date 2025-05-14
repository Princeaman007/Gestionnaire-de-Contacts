# Gestionnaire de Contacts

Application complète de gestion de contacts avec une API sécurisée (Express + MongoDB) et une interface utilisateur moderne (React + Vite).



## Fonctionnalités

- 🔐 Authentification avec JWT (JSON Web Tokens)
- 👥 Gestion des rôles utilisateurs (admin, utilisateur standard)
- 📇 CRUD complet pour les contacts
- 🖼️ Upload et gestion d'avatars pour contacts et utilisateurs
- 📱 Interface responsive avec React et Bootstrap
- 🔍 Recherche de contacts en temps réel
- 📝 Gestion des notes et adresses pour les contacts
- 👤 Gestion de profil utilisateur (modification des informations, changement de mot de passe)
- 🛡️ Panel d'administration pour la gestion des utilisateurs

## Technologies utilisées

### Backend
- Node.js (v14+)
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Multer pour la gestion des uploads
- bcryptjs pour le hachage des mots de passe

### Frontend
- React 19
- Vite 6 pour le bundling
- React Router v7 pour la navigation
- React Bootstrap pour l'interface
- Axios pour les requêtes HTTP
- React Hook Form pour la gestion des formulaires
- Context API pour la gestion d'état
- FontAwesome pour les icônes

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4 ou supérieur)
- npm ou yarn

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/yourusername/gestionnaire-contacts.git
cd gestionnaire-contacts
```

### Installation du Backend

```bash
cd backend
npm install
cp .env.example .env  # créer et configurer le fichier .env
npm run dev
```

### Installation du Frontend

```bash
cd frontend
npm install
cp .env.example .env  # créer et configurer le fichier .env
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
```

## Utilisation de Docker

Le projet inclut une configuration Docker pour un déploiement facile.

```bash
docker-compose up -d
```

## Structure du projet

```
gestionnaire-contacts/
├── backend/              # API Express + MongoDB
│   ├── config/           # Configuration de la base de données
│   ├── controllers/      # Logique métier
│   ├── middleware/       # Middleware d'authentification, etc.
│   ├── models/           # Modèles Mongoose
│   ├── routes/           # Routes API
│   ├── uploads/          # Stockage des avatars
│   └── server.js         # Point d'entrée
│
└── frontend/             # Application React + Vite
    ├── public/           # Ressources statiques
    └── src/
        ├── assets/       # Images, styles
        ├── components/   # Composants React
        │   ├── admin/    # Composants pour le panel admin
        │   ├── auth/     # Composants d'authentification
        │   ├── contacts/ # Composants de gestion de contacts
        │   ├── layout/   # Composants de mise en page
        │   └── profile/  # Composants de gestion de profil
        ├── contexts/     # Context API pour la gestion d'état
        │   ├── auth/     # Contexte d'authentification
        │   └── contact/  # Contexte de gestion des contacts
        ├── pages/        # Pages principales
        ├── services/     # Services API
        └── utils/        # Utilitaires
```

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Obtenir l'utilisateur actuel
- `GET /api/auth/logout` - Déconnexion

### Contacts

- `GET /api/contacts` - Récupérer tous les contacts de l'utilisateur
- `GET /api/contacts/:id` - Récupérer un contact spécifique
- `POST /api/contacts` - Créer un nouveau contact
- `PUT /api/contacts/:id` - Mettre à jour un contact
- `DELETE /api/contacts/:id` - Supprimer un contact

### Utilisateurs (Admin)

- `GET /api/users` - Récupérer tous les utilisateurs
- `GET /api/users/:id` - Récupérer un utilisateur spécifique
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Profil utilisateur

- `PUT /api/users/profile` - Mettre à jour le profil
- `PUT /api/users/password` - Mettre à jour le mot de passe

## Fonctionnalités détaillées

### Gestion des contacts

- Création de contacts avec informations de base (nom, email, téléphone)
- Ajout optionnel d'adresse complète (rue, ville, code postal, pays)
- Ajout de notes pour chaque contact
- Upload d'avatar pour les contacts
- Catégorisation des contacts (personnels ou professionnels)
- Recherche en temps réel par nom, email ou téléphone

### Gestion des utilisateurs

- Système complet d'authentification (inscription, connexion, déconnexion)
- Profils utilisateurs avec avatars personnalisables
- Changement de mot de passe sécurisé
- Différents niveaux d'accès (utilisateur standard, administrateur)
- Interface d'administration pour la gestion des utilisateurs

## Sécurité

- Authentification via JSON Web Tokens (JWT)
- Mots de passe hashés avec bcrypt
- Protection des routes avec middlewares d'authentification
- Validation des entrées utilisateur

## Déploiement

Pour le déploiement en production :

1. Mettre à jour les variables d'environnement pour la production
2. Construire le frontend : `cd frontend && npm run build`
3. Configurer un serveur web (Nginx, Apache) pour servir les fichiers statiques du frontend
4. Configurer le backend avec PM2 ou un service similaire

```bash
# Installation de PM2
npm install -g pm2

# Démarrage du backend avec PM2
cd backend
pm2 start server.js --name contact-app-backend
```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.