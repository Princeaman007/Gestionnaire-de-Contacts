const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Veuillez entrer un nom'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Veuillez entrer un email'],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Veuillez entrer un email valide'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Veuillez entrer un numéro de téléphone']
  },
  type: {
    type: String,
    enum: ['personnel', 'professionnel'],
    default: 'personnel'
  },
  avatar: {
    type: String,
    default: null
  },
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
