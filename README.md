# 🚀 Gestionnaire de Contacts - Princode Connect

> **Application full-stack moderne** pour la gestion de contacts personnels et professionnels avec authentification sécurisée et interface responsive.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://javascript.info/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-brightgreen.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📸 Aperçu du Projet

### 🎯 Fonctionnalités Principales

- **🔐 Authentification JWT** - Système de connexion sécurisé avec tokens
- **👤 Gestion des Profils** - Modification d'informations personnelles et changement de mot de passe
- **📇 CRUD Contacts** - Création, lecture, modification et suppression de contacts
- **🖼️ Upload d'Images** - Gestion d'avatars pour contacts et utilisateurs
- **👨‍💼 Panel Admin** - Interface d'administration pour la gestion des utilisateurs
- **🔍 Recherche Temps Réel** - Filtrage instantané des contacts
- **📱 Interface Responsive** - Compatible mobile, tablette et desktop
- **⚡ Performance Optimisée** - Interface rapide et fluide

---

## 🛠️ Stack Technologique

### Frontend
- **React 19** - Framework JavaScript moderne
- **Vite 6** - Build tool ultra-rapide
- **React Router 7** - Navigation côté client
- **React Bootstrap** - Composants UI responsive
- **React Hook Form** - Gestion des formulaires
- **Axios** - Client HTTP
- **FontAwesome** - Icônes

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **MongoDB + Mongoose** - Base de données NoSQL
- **JWT** - Authentification par tokens
- **Multer** - Upload de fichiers
- **bcryptjs** - Hachage des mots de passe
- **Joi** - Validation des données

### DevOps & Outils
- **ESLint** - Linting JavaScript
- **Nodemon** - Hot reload développement
- **CORS** - Configuration cross-origin

---

## 🚀 Installation & Lancement

### Prérequis
```bash
Node.js >= 14.x
MongoDB >= 4.x
npm ou yarn
```

### 1. Cloner le Projet
```bash
git clone https://github.com/Princeaman007/Gestionnaire-de-Contacts.git
cd gestionnaire-contacts
```

### 2. Configuration Backend
```bash
cd backend
npm install

# Créer le fichier .env
cp .env.example .env
```

**Variables d'environnement (.env):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact-app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
```

```bash
# Lancer le serveur backend
npm run dev
```

### 3. Configuration Frontend
```bash
cd frontend
npm install

# Créer le fichier .env
cp .env.example .env
```

**Variables d'environnement (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Lancer l'application frontend
npm run dev
```

### 4. Accéder à l'Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 📋 Fonctionnalités Détaillées

### 🔐 Système d'Authentification
- Inscription avec validation email
- Connexion sécurisée via JWT
- Protection des routes privées
- Gestion des sessions
- Déconnexion automatique

### 👥 Gestion des Contacts
- **Création:** Formulaire complet avec validation
- **Affichage:** Liste responsive avec recherche
- **Modification:** Édition en temps réel
- **Suppression:** Confirmation avant suppression
- **Catégorisation:** Personnel vs Professionnel
- **Avatars:** Upload et gestion d'images
- **Adresses:** Informations de localisation complètes
- **Notes:** Champ libre pour informations additionnelles

### 👤 Profil Utilisateur
- Modification des informations personnelles
- Changement de mot de passe sécurisé
- Upload et modification d'avatar
- Validation des données côté client et serveur

### 🛡️ Administration
- **Accès restreint** aux administrateurs
- **Gestion des utilisateurs** : CRUD complet
- **Modification des rôles** : user ↔ admin
- **Vue d'ensemble** : statistiques et monitoring

### 🔍 Recherche & Filtrage
- Recherche temps réel par nom, email, téléphone
- Filtres par type de contact
- Résultats instantanés sans rechargement

---

## 🏗️ Architecture du Projet

```
gestionnaire-contacts/
│
├── backend/                 # API Node.js + Express
│   ├── config/             # Configuration DB
│   ├── controllers/        # Logique métier
│   ├── middleware/         # Middlewares (auth, upload, validation)
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes API
│   ├── uploads/           # Stockage des avatars
│   ├── utils/             # Utilitaires
│   ├── validators/        # Schémas de validation Joi
│   └── server.js          # Point d'entrée serveur
│
└── frontend/               # Application React
    ├── public/            # Ressources statiques
    └── src/
        ├── assets/        # Styles CSS
        ├── components/    # Composants React
        │   ├── admin/     # Components admin
        │   ├── auth/      # Authentification
        │   ├── contacts/  # Gestion contacts
        │   ├── layout/    # Layout & navigation
        │   └── profile/   # Profil utilisateur
        ├── contexts/      # Context API (auth, contacts)
        ├── pages/         # Pages principales
        ├── services/      # Services API
        └── utils/         # Utilitaires & helpers
```

---

## 🛣️ Routes API

### 🔐 Authentification
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/register` | Inscription utilisateur |
| `POST` | `/api/auth/login` | Connexion utilisateur |
| `GET` | `/api/auth/me` | Utilisateur courant |
| `GET` | `/api/auth/logout` | Déconnexion |

### 📇 Contacts
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/contacts` | Liste des contacts |
| `GET` | `/api/contacts/:id` | Contact spécifique |
| `POST` | `/api/contacts` | Créer un contact |
| `PUT` | `/api/contacts/:id` | Modifier un contact |
| `DELETE` | `/api/contacts/:id` | Supprimer un contact |

### 👥 Utilisateurs
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/users` | Liste utilisateurs (Admin) |
| `GET` | `/api/users/:id` | Utilisateur spécifique (Admin) |
| `PUT` | `/api/users/profile` | Modifier son profil |
| `PUT` | `/api/users/password` | Changer mot de passe |
| `PUT` | `/api/users/:id` | Modifier utilisateur (Admin) |
| `DELETE` | `/api/users/:id` | Supprimer utilisateur (Admin) |

---

## 🔒 Sécurité

- **Authentification JWT** - Tokens sécurisés avec expiration
- **Hachage bcrypt** - Mots de passe chiffrés (salt rounds: 10)
- **Validation Joi** - Validation côté serveur stricte
- **Middleware d'autorisation** - Protection des routes sensibles
- **Gestion des rôles** - Séparation admin/utilisateur
- **Validation des uploads** - Types de fichiers autorisés
- **Protection CORS** - Configuration cross-origin sécurisée

---

## 📊 Modèles de Données

### 👤 Utilisateur
```javascript
{
  name: String (requis),
  email: String (requis, unique),
  password: String (requis, min: 6),
  role: String (user|admin, défaut: user),
  avatar: String (nom fichier),
  createdAt: Date
}
```

### 📇 Contact
```javascript
{
  user: ObjectId (requis),
  name: String (requis),
  email: String (requis),
  phone: String (requis),
  type: String (personnel|professionnel),
  avatar: String (nom fichier),
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  notes: String,
  createdAt: Date
}
```

---

## 🎨 Interface Utilisateur

### 🌟 Design Moderne
- **Material Design** inspiré avec Bootstrap
- **Animations fluides** pour les interactions
- **Feedback visuel** pour toutes les actions
- **Responsive design** mobile-first
- **Dark/Light mode** ready

### 📱 Responsive Breakpoints
- **Mobile:** < 768px
- **Tablette:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🚀 Déploiement

### 🐳 Docker (Recommandé)
```bash
# Build et lancement avec Docker Compose
docker-compose up -d
```

### ☁️ Déploiement Cloud

#### Backend (Node.js)
- **Heroku, Railway, Render**
- Variables d'environnement à configurer
- MongoDB Atlas pour la base de données

#### Frontend (React)
- **Vercel, Netlify, AWS S3**
- Build automatique via CI/CD
- Configuration des variables d'environnement

---

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📈 Performance

### Optimisations Frontend
- **Code splitting** automatique avec Vite
- **Lazy loading** des composants
- **Memoization** des calculs coûteux
- **Optimisation des images** (WebP, compression)

### Optimisations Backend
- **Indexation MongoDB** sur les champs recherchés
- **Compression gzip** des réponses
- **Cache headers** pour les ressources statiques
- **Rate limiting** pour éviter les abus

---

## 🛠️ Scripts Disponibles

### Backend
```bash
npm start          # Production
npm run dev        # Développement avec nodemon
npm test           # Tests unitaires
```

### Frontend
```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Aperçu du build
npm run lint       # Linting ESLint
```

---

## 🐛 Débogage

### Logs Backend
```bash
# Vérifier les logs en temps réel
npm run dev

# Logs de production
pm2 logs contact-app-backend
```

### DevTools Frontend
- **React DevTools** pour l'état des composants
- **Redux DevTools** pour la gestion d'état
- **Network tab** pour les requêtes API

---

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

---

## 📝 Changelog

### v1.0.0 (2025-01-30)
- ✨ Version initiale
- 🔐 Système d'authentification JWT
- 📇 CRUD complet des contacts
- 👤 Gestion des profils utilisateur
- 🛡️ Panel d'administration
- 📱 Interface responsive
- 🔍 Recherche temps réel



## 👨‍💻 Auteur

**Aman Prince**
- Portfolio: [princeaman007.github.io/portfolio](https://princeaman007.github.io/portfolio)
- LinkedIn: https://www.linkedin.com/in/prince-aman-b68477171
- GitHub: [@PrinceAman007](https://github.com/PrinceAman007)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **React Team** pour l'excellent framework
- **MongoDB** pour la base de données flexible
- **Bootstrap** pour les composants UI
- **Vite** pour l'expérience de développement exceptionnelle

---

**⭐ N'hésitez pas à donner une étoile si ce projet vous a été utile !**