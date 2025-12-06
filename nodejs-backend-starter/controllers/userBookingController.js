const userBookingService = require('../services/userBookingService');

async function createBooking(req, res) {
  try {
    const booking = await userBookingService.createBooking(
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
    const bookings = await userBookingService.listBookings(
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
    const booking = await userBookingService.updateBooking(
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
    await userBookingService.deleteBooking(req.params.id, req.user.username);
    return res.json({ message: 'Booking deleted' });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  listBookings,
  updateBooking,
  deleteBooking
};
