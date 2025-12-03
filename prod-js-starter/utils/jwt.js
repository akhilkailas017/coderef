const jwt = require('jsonwebtoken');
const config = require('../config/env');

function generateAccessToken(payload, role) {
  const secret =
    role === 'Admin'
      ? config.admin.accessTokenSecret
      : config.user.accessTokenSecret;
  return jwt.sign(payload, secret, { expiresIn: '15m' });
}

function generateRefreshToken(payload, role) {
  const secret =
    role === 'Admin'
      ? config.admin.refreshTokenSecret
      : config.user.refreshTokenSecret;
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

function verifyToken(token, role, type = 'access') {
  const secret =
    role === 'Admin'
      ? type === 'access'
        ? config.admin.accessTokenSecret
        : config.admin.refreshTokenSecret
      : type === 'access'
        ? config.user.accessTokenSecret
        : config.user.refreshTokenSecret;

  return jwt.verify(token, secret);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
