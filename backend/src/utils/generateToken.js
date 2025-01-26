const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1000d'  // Changed from '30m' to '365d'
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '1000d'  // Changed from '30d' to '365d' to match
  });
};

module.exports = {
  generateToken,
  generateRefreshToken
};