const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age, height, weight, goalWeight } = req.body;

  // Only check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user with only required fields
  const userData = {
    name,
    email: email.toLowerCase(),
    password,
  };

  // Add optional fields if provided
  if (age) userData.age = age;
  if (height) userData.height = height;
  if (weight) userData.weight = weight;
  if (goalWeight) userData.goalWeight = goalWeight;

  const user = await User.create(userData);

  if (user) {
    // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await user.matchPassword(password))) {
    // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Social authentication (Google/Apple)
// @route   POST /api/auth/social
// @access  Public
const socialAuth = asyncHandler(async (req, res) => {
  const { provider, token, email, name } = req.body;
  
  if (!provider || !token || !email) {
    res.status(400);
    throw new Error('Missing required social authentication parameters');
  }
  
  // Normalize the email to lowercase
  const normalizedEmail = email.toLowerCase();

  // Find existing user by email
  let user = await User.findOne({ email: normalizedEmail });
  
  // If user exists, update their social ID
  if (user) {
    // Update the user with the social provider ID if not already set
    if (provider === 'google' && !user.googleId) {
      user.googleId = token;
    }
    if (provider === 'apple' && !user.appleId) {
      user.appleId = token;
    }
    await user.save();
  } else {
    // Create a new user with the social credentials
    const userData = {
      name: name || email.split('@')[0], // Use name or generate from email
      email: normalizedEmail,
    };
    
    // Set the appropriate social provider ID
    if (provider === 'google') {
      userData.googleId = token;
    } else if (provider === 'apple') {
      userData.appleId = token;
    }
    
    user = await User.create(userData);
  }
  
  // Generate tokens
  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  
  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save();
  
  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    accessToken
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }

  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  socialAuth
};