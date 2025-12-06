const userService = require('../services/userService');

async function register(req, res) {
  try {
    const user = await userService.register(req.body);
    return res
      .status(201)
      .json({ message: 'User registered successfully', user });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const tokens = await userService.login(req.body);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const tokens = await userService.refreshToken(req.body.token);
    return res.json(tokens);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function createBooking(req, res) {
  try {
    const booking = await userService.createBooking(
      req.body,
      req.user.username
    );
    return res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function listBookings(req, res) {
  try {
    const bookings = await userService.listBookings(
      req.query,
      req.user.username
    );
    return res.json(bookings);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function updateBooking(req, res) {
  try {
    const booking = await userService.updateBooking(
      req.params.id,
      req.body,
      req.user.username
    );
    return res.json({ message: 'Booking updated', booking });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function deleteBooking(req, res) {
  try {
    await userService.deleteBooking(req.params.id, req.user.username);
    return res.json({ message: 'Booking deleted' });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  createBooking,
  listBookings,
  updateBooking,
  deleteBooking
};
