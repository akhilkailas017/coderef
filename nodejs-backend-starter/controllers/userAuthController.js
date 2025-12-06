const userAuthService = require('../services/userAuthService');

async function register(req, res) {
  try {
    const user = await userAuthService.register(req.body);
    return res
      .status(201)
      .json({ message: 'User registered successfully', user });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const tokens = await userAuthService.login(req.body);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const tokens = await userAuthService.refreshToken(req.body.token);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  refreshToken
};
