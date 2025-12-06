const config = require('../config/env');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

const adminUsername = config.admin.username;
const adminPasswordHash = config.admin.passwordHash;

async function login({ username, password }) {
  if (username !== adminUsername)
    throw { status: 401, message: 'Invalid credentials' };
  const match = await bcrypt.compare(password, adminPasswordHash);
  if (!match) throw { status: 401, message: 'Invalid credentials' };

  const payload = { username, role: 'Admin', userId: 'admin-1' };
  return {
    accessToken: generateAccessToken(payload, 'Admin'),
    refreshToken: generateRefreshToken(payload, 'Admin')
  };
}

async function refreshToken(token) {
  const jwt = require('jsonwebtoken');
  try {
    const decoded = jwt.verify(token, config.admin.refreshTokenSecret);
    const payload = {
      username: decoded.username,
      role: 'Admin',
      userId: decoded.userId
    };
    return {
      accessToken: generateAccessToken(payload, 'Admin'),
      refreshToken: generateRefreshToken(payload, 'Admin')
    };
  } catch (err) {
    throw { status: 403, message: 'Invalid refresh token', msg: err };
  }
}

module.exports = { login, refreshToken };
