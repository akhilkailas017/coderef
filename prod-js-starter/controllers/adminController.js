const adminService = require('../services/adminService');

async function login(req, res) {
  try {
    const tokens = await adminService.login(req.body);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const tokens = await adminService.refreshToken(req.body.token);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function createBooking(req, res) {
  try {
    const booking = await adminService.createBooking(
      req.body,
      req.user.username
    );
    return res.json({ message: 'Booking created', booking });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function listBookings(req, res) {
  try {
    const bookings = await adminService.listBookings(req.query);
    return res.json(bookings);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { login, refreshToken, createBooking, listBookings };
