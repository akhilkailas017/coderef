const adminAuthService = require('../services/adminAuthService');

async function login(req, res) {
  try {
    const tokens = await adminAuthService.login(req.body);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const tokens = await adminAuthService.refreshToken(req.body.token);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { login, refreshToken };
