const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register({ username, name, email, password }) {
  const existing = await User.findOne({ username });
  if (existing) throw { status: 400, message: 'Username already exists' };

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    name,
    email,
    password: hashed,
    role: 'User'
  });
  return user;
}

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 401, message: 'User does not exist' };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: 'Invalid password' };

  const payload = { userId: user._id, username: user.username, role: 'User' };
  return {
    accessToken: generateAccessToken(payload, 'User'),
    refreshToken: generateRefreshToken(payload, 'User')
  };
}

async function refreshToken(token) {
  try {
    const decoded = jwt.verify(token, config.user.refreshTokenSecret);
    const payload = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
    return {
      accessToken: generateAccessToken(payload, 'User'),
      refreshToken: generateRefreshToken(payload, 'User')
    };
  } catch (err) {
    throw { status: 403, message: 'Invalid refresh token', msg: err };
  }
}

module.exports = {
  register,
  login,
  refreshToken
};
