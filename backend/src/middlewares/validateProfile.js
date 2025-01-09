// backend/src/middlewares/validateProfile.js
const validateProfileUpdate = (req, res, next) => {
    const { name, age, height, weight, goalWeight, settings } = req.body;
  
    // Basic validation
    if (age && (age < 0 || age > 120)) {
      return res.status(400).json({ message: 'Invalid age value' });
    }
  
    if (height && (height < 0 || height > 300)) {
      return res.status(400).json({ message: 'Invalid height value' });
    }
  
    if (weight && (weight < 0 || weight > 500)) {
      return res.status(400).json({ message: 'Invalid weight value' });
    }
  
    if (goalWeight && (goalWeight < 0 || goalWeight > 500)) {
      return res.status(400).json({ message: 'Invalid goal weight value' });
    }
  
    // Validate settings if provided
    if (settings) {
      if (settings.notifications) {
        const { enabled, workoutReminders, mealReminders, progressReminders } = settings.notifications;
        if (typeof enabled !== 'undefined' && typeof enabled !== 'boolean') {
          return res.status(400).json({ message: 'Invalid notifications enabled value' });
        }
        // Validate other notification settings...
      }
      
      if (settings.theme && !['light', 'dark'].includes(settings.theme)) {
        return res.status(400).json({ message: 'Invalid theme value' });
      }
    }
  
    next();
  };
  
  module.exports = {
    validateProfileUpdate
  };