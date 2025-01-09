// backend/src/controllers/profileController.js
const User = require('../models/User');

const profileController = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProfile: async (req, res) => {
    const updates = {
      name: req.body.name,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      goalWeight: req.body.goalWeight,
      settings: req.body.settings,
      
    };

    // Remove undefined values
    Object.keys(updates).forEach(key => 
      updates[key] === undefined && delete updates[key]
    );

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If settings are being updated, merge them with existing settings
      if (updates.settings) {
        updates.settings = {
          ...user.settings,
          ...updates.settings,
          notifications: {
            ...user.settings.notifications,
            ...updates.settings.notifications
          }
        };
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = profileController;