const Joi = require('joi');


const registerSchema = Joi.object({
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
  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'Le mot de passe doit être une chaîne de caractères',
      'string.empty': 'Le mot de passe est requis',
      'string.min': 'Le mot de passe doit avoir au moins {#limit} caractères',
      'any.required': 'Le mot de passe est requis'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'string.base': 'La confirmation du mot de passe doit être une chaîne de caractères',
      'any.only': 'Les mots de passe ne correspondent pas',
      'any.required': 'La confirmation du mot de passe est requise'
    }),
  role: Joi.string().valid('user', 'admin').default('user')
    .messages({
      'string.base': 'Le rôle doit être une chaîne de caractères',
      'any.only': 'Le rôle doit être soit "user" soit "admin"'
    }),
  avatar: Joi.string().default('default-avatar.png')
});


const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': "L'email doit être une chaîne de caractères",
      'string.empty': "L'email est requis",
      'string.email': 'Veuillez entrer un email valide',
      'any.required': "L'email est requis"
    }),
  password: Joi.string().required()
    .messages({
      'string.base': 'Le mot de passe doit être une chaîne de caractères',
      'string.empty': 'Le mot de passe est requis',
      'any.required': 'Le mot de passe est requis'
    })
});


const updateUserSchema = Joi.object({
  name: Joi.string().trim()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères'
    }),
  email: Joi.string().email()
    .messages({
      'string.base': "L'email doit être une chaîne de caractères",
      'string.email': 'Veuillez entrer un email valide'
    }),
  role: Joi.string().valid('user', 'admin')
    .messages({
      'string.base': 'Le rôle doit être une chaîne de caractères',
      'any.only': 'Le rôle doit être soit "user" soit "admin"'
    }),
  avatar: Joi.string()
}).min(1); 


const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required()
    .messages({
      'string.base': 'Le mot de passe actuel doit être une chaîne de caractères',
      'string.empty': 'Le mot de passe actuel est requis',
      'any.required': 'Le mot de passe actuel est requis'
    }),
  newPassword: Joi.string().min(6).required()
    .messages({
      'string.base': 'Le nouveau mot de passe doit être une chaîne de caractères',
      'string.empty': 'Le nouveau mot de passe est requis',
      'string.min': 'Le nouveau mot de passe doit avoir au moins {#limit} caractères',
      'any.required': 'Le nouveau mot de passe est requis'
    }),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    .messages({
      'string.base': 'La confirmation du nouveau mot de passe doit être une chaîne de caractères',
      'any.only': 'Les nouveaux mots de passe ne correspondent pas',
      'any.required': 'La confirmation du nouveau mot de passe est requise'
    })
});


const userIdParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': "L'identifiant doit être une chaîne de caractères",
      'string.empty': "L'identifiant est requis",
      'string.pattern.base': "L'identifiant doit être un ObjectId MongoDB valide",
      'any.required': "L'identifiant est requis"
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
  userIdParamSchema
};


