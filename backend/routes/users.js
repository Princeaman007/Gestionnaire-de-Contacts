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

const router = express.Router();


router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/password', protect, updatePassword);


router.route('/')
  .get(protect, authorize('admin'), getUsers);

router.route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), upload.single('avatar'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;

