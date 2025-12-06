const adminBookingService = require('../services/adminBookingService');

async function createBooking(req, res) {
  try {
    const booking = await adminBookingService.createBooking(
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
    const bookings = await adminBookingService.listBookings(req.query);
    return res.json(bookings);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { createBooking, listBookings };
