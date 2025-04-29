const User = require('../models/User');
const fs = require('fs');
const path = require('path');


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;
      

      if (email && email !== user.email) {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({
            success: false,
            message: 'Cet email est déjà utilisé'
          });
        }
        user.email = email;
      }

     
      if (req.file) {
     
        if (user.avatar) {
          const avatarPath = path.join(__dirname, '../uploads', user.avatar);
          if (fs.existsSync(avatarPath) && user.avatar !== 'default-avatar.png') {
            fs.unlinkSync(avatarPath);
          }
        }
        user.avatar = req.file.filename;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        data: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

   
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }

   
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Mot de passe mis à jour avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }


    const fieldsToUpdate = {
      name: name || user.name,
      role: role || user.role
    };

    
    if (email && email !== user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }
      fieldsToUpdate.email = email;
    }

   
    if (req.file) {
      
      if (user.avatar) {
        const avatarPath = path.join(__dirname, '../uploads', user.avatar);
        if (fs.existsSync(avatarPath) && user.avatar !== 'default-avatar.png') {
          fs.unlinkSync(avatarPath);
        }
      }
      fieldsToUpdate.avatar = req.file.filename;
    }

    user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

   
    if (user.avatar) {
      const avatarPath = path.join(__dirname, '../uploads', user.avatar);
      if (fs.existsSync(avatarPath) && user.avatar !== 'default-avatar.png') {
        fs.unlinkSync(avatarPath);
      }
    }

    await user.remove();

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
