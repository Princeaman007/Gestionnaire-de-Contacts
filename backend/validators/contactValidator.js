const Joi = require('joi');

// Schéma pour la création d'un contact (tous les champs requis sont obligatoires)
const createContactSchema = Joi.object({
  user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': "L'ID utilisateur doit être une chaîne de caractères",
      'string.empty': "L'ID utilisateur est requis",
      'string.pattern.base': "L'ID utilisateur doit être un ObjectId MongoDB valide",
      'any.required': "L'ID utilisateur est requis"
    }),
  name: Joi.string().trim().required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.empty': 'Le nom est requis',
      'any.required': 'Le nom est requis'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.base': "L'email doit être une chaîne de caractères",
      'string.empty': "L'email est requis",
      'string.email': 'Veuillez entrer un email valide',
      'any.required': "L'email est requis"
    }),
  phone: Joi.string().required()
    .messages({
      'string.base': 'Le numéro de téléphone doit être une chaîne de caractères',
      'string.empty': 'Le numéro de téléphone est requis',
      'any.required': 'Le numéro de téléphone est requis'
    }),
  type: Joi.string().valid('personnel', 'professionnel').default('personnel')
    .messages({
      'string.base': 'Le type doit être une chaîne de caractères',
      'any.only': 'Le type doit être soit "personnel" soit "professionnel"'
    }),
  avatar: Joi.string().allow(null),
  address: Joi.object({
    street: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    zipCode: Joi.string().allow('', null),
    country: Joi.string().allow('', null)
  }),
  notes: Joi.string().allow('', null)
});

// Schéma pour la mise à jour d'un contact (champs optionnels)
const updateContactSchema = Joi.object({
  user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.base': "L'ID utilisateur doit être une chaîne de caractères",
      'string.pattern.base': "L'ID utilisateur doit être un ObjectId MongoDB valide"
    }),
  name: Joi.string().trim()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères'
    }),
  email: Joi.string().email()
    .messages({
      'string.base': "L'email doit être une chaîne de caractères",
      'string.email': 'Veuillez entrer un email valide'
    }),
  phone: Joi.string()
    .messages({
      'string.base': 'Le numéro de téléphone doit être une chaîne de caractères'
    }),
  type: Joi.string().valid('personnel', 'professionnel')
    .messages({
      'string.base': 'Le type doit être une chaîne de caractères',
      'any.only': 'Le type doit être soit "personnel" soit "professionnel"'
    }),
  avatar: Joi.string().allow(null),
  address: Joi.object({
    street: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    zipCode: Joi.string().allow('', null),
    country: Joi.string().allow('', null)
  }),
  notes: Joi.string().allow('', null)
}).min(1); // Au moins un champ doit être fourni pour la mise à jour

// Schéma pour la validation des paramètres d'ID
const idParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': "L'identifiant doit être une chaîne de caractères",
      'string.empty': "L'identifiant est requis",
      'string.pattern.base': "L'identifiant doit être un ObjectId MongoDB valide",
      'any.required': "L'identifiant est requis"
    })
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  idParamSchema
};