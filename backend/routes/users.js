const express = require('express');
const {
  getUsers,
  getUser,
  updateProfile,
  updatePassword,
  updateUser,
  deleteUser
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const { 
  updateUserSchema, 
  updatePasswordSchema, 
  userIdParamSchema 
} = require('../validators/userValidator');

const router = express.Router();

// Routes pour le profil de l'utilisateur connecté
router.put(
  '/profile', 
  protect, 
  upload.single('avatar'), 
  validate(updateUserSchema), 
  updateProfile
);

router.put(
  '/password', 
  protect, 
  validate(updatePasswordSchema), 
  updatePassword
);

// Routes administratives pour gérer tous les utilisateurs
router.route('/')
  .get(
    protect, 
    authorize('admin'), 
    getUsers
  );

router.route('/:id')
  .get(
    protect, 
    authorize('admin'), 
    validate(userIdParamSchema, 'params'),
    getUser
  )
  .put(
    protect, 
    authorize('admin'), 
    upload.single('avatar'), 
    validate(updateUserSchema),
    validate(userIdParamSchema, 'params'),
    updateUser
  )
  .delete(
    protect, 
    authorize('admin'), 
    validate(userIdParamSchema, 'params'),
    deleteUser
  );

module.exports = router;