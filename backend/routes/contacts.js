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
const validate = require('../middleware/validate');
const attachUser = require('../middleware/attachUser');
const { createContactSchema, updateContactSchema, idParamSchema } = require('../validators/contactValidator');

const router = express.Router();

router
  .route('/')
  .get(protect, getContacts)
  .post(
    protect,
    upload.single('avatar'),
    attachUser, 
    validate(createContactSchema),
    createContact
  );
  

router
  .route('/:id')
  .get(
    protect, 
    validate(idParamSchema, 'params'), 
    getContact
  )
  .put(
    protect, 
    upload.single('avatar'), 
    validate(updateContactSchema),  
    validate(idParamSchema, 'params'), 
    updateContact
  )
  .delete(
    protect, 
    validate(idParamSchema, 'params'), 
    deleteContact
  );

module.exports = router;