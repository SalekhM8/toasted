// backend/src/controllers/progressController.js
const Progress = require('../models/Progress');

const progressController = {
  logWeight: async (req, res) => {
    try {
      const { weight } = req.body;
      
      if (!weight || isNaN(weight)) {
        return res.status(400).json({ message: 'Invalid weight value' });
      }

      let progress = await Progress.findOne({ userId: req.user._id });
      
      if (!progress) {
        progress = new Progress({
          userId: req.user._id,
          weights: []
        });
      }

      progress.weights.push({ weight });
      await progress.save();

      res.json(progress.weights);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getWeights: async (req, res) => {
    try {
      const progress = await Progress.findOne({ userId: req.user._id });
      
      if (!progress) {
        return res.json({ weights: [] });
      }

      res.json({ weights: progress.weights });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logCompletion: async (req, res) => {
    try {
      const { type, itemId, planId } = req.body;
      
      let progress = await Progress.findOne({ userId: req.user._id });
      
      if (!progress) {
        progress = new Progress({ userId: req.user._id });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (type === 'workout') {
        progress.completedWorkouts.push({
          date: today,
          workoutId: itemId,
          planId
        });
      } else if (type === 'meal') {
        progress.completedMeals.push({
          date: today,
          mealId: itemId,
          planId
        });
      }

      // Update streak
      const lastUpdate = progress.streak.lastUpdated;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastUpdate && lastUpdate.getTime() === today.getTime()) {
        // Already updated today, do nothing
      } else if (!lastUpdate || lastUpdate.getTime() === yesterday.getTime()) {
        progress.streak.current += 1;
      } else {
        progress.streak.current = 1;
      }
      progress.streak.lastUpdated = today;

      await progress.save();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProgress: async (req, res) => {
    try {
      const progress = await Progress.findOne({ userId: req.user._id });
      
      if (!progress) {
        return res.json({
          weights: [],
          completedWorkouts: [],
          completedMeals: [],
          streak: { current: 0 }
        });
      }

      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = progressController;