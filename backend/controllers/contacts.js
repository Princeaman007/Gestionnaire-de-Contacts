const Contact = require('../models/Contact');
const fs = require('fs');
const path = require('path');


exports.getContacts = async (req, res) => {
  try {
    let query;
    
   
    if (req.user.role === 'admin') {
      query = Contact.find();
    } else {
   
      query = Contact.find({ user: req.user.id });
    }
    
    const contacts = await query;

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

   
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à accéder à ce contact'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.createContact = async (req, res) => {
  try {
   
    req.body.user = req.user.id;
    
 
    if (req.file) {
      req.body.avatar = req.file.filename;
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

   
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à mettre à jour ce contact'
      });
    }

  
    if (req.file) {
    
      if (contact.avatar) {
        const avatarPath = path.join(__dirname, '../uploads', contact.avatar);
        if (fs.existsSync(avatarPath) && contact.avatar !== 'default-avatar.png') {
          fs.unlinkSync(avatarPath);
        }
      }
      req.body.avatar = req.file.filename;
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

  
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à supprimer ce contact'
      });
    }

    
    if (contact.avatar) {
      const avatarPath = path.join(__dirname, '../uploads', contact.avatar);
      if (fs.existsSync(avatarPath) && contact.avatar !== 'default-avatar.png') {
        fs.unlinkSync(avatarPath);
      }
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
