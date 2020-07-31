const jwt = require('jsonwebtoken');
const db = require('../db');

const User = require('../models/User');

const Auth = {
  createAuthToken(user) {
    const authToken = jwt.sign({
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      _id: user._id,
    }, process.env.AUTH_SECRET, { expiresIn: '15m' });
    return authToken;
  },

  createRefreshToken(user) {
    const refreshToken = jwt.sign({
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      _id: user._id,
    }, process.env.REF_SECRET, { expiresIn: '7d' });
    return refreshToken;
  },

  async verifyUserInDb(userId) {
    return await User.findById(userId);
  },
}

module.exports = Auth;