const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  age: {
    type: Number,
    required: [true, 'Please add your age'],
    min: [13, 'Must be at least 13 years old']
  },
  height: {
    type: Number,
    required: [true, 'Please add your height in cm']
  },
  weight: {
    type: Number,
    required: [true, 'Please add your weight in kg']
  },
  goalWeight: {
    type: Number,
    required: [true, 'Please add your goal weight in kg']
  },
  profilePicture: {
    type: String,
    default: ''
  },
  // Add these fields to your User schema
subscription: {
  status: {
    type: String,
    enum: ['none', 'active', 'past_due', 'canceled'],
    default: 'none'
  },
  planType: {
    type: String,
    enum: ['workout_only', 'diet_only', 'bundle', 'none'],
    default: 'none'
  },
  currentPeriodEnd: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String
},

  settings: {
    notifications: {
      enabled: { type: Boolean, default: true },
      workoutReminders: { type: Boolean, default: true },
      mealReminders: { type: Boolean, default: true },
      progressReminders: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove password when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);