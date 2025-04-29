const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Veuillez entrer un nom'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Veuillez entrer un email'],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Veuillez entrer un email valide'
    ]
  },
  password: {
    type: String,
    required: [true, 'Veuillez entrer un mot de passe'],
    minlength: [6, 'Le mot de passe doit avoir au moins 6 caractères'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};


UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
