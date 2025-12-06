const userService = require('../services/userService');

async function listUsers(req, res) {
  try {
    const bookings = await userService.listUsers(req.query);
    return res.json(bookings);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  listUsers
};
