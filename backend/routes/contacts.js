const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contacts');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .route('/')
  .get(protect, getContacts)
  .post(protect, upload.single('avatar'), createContact);

router
  .route('/:id')
  .get(protect, getContact)
  .put(protect, upload.single('avatar'), updateContact)
  .delete(protect, deleteContact);

module.exports = router;
