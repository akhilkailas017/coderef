const Booking = require('../models/Booking');

async function createBooking(data, createdBy) {
  if (!data.villa || !data.checkIn || !data.checkOut || !data.guests) {
    throw { status: 400, message: 'villa, checkIn, checkOut, guests required' };
  }
  return await Booking.create({ ...data, createdBy });
}

async function listBookings(queryParams) {
  const { page = 1, limit = 10, villa, date } = queryParams;
  page = parseInt(page);
  limit = parseInt(limit);

  const query = {};
  if (villa) query.villa = villa;
  if (date) query.$or = [{ checkIn: date }, { checkOut: date }];

  const totalRecords = await Booking.countDocuments(query);
  const data = await Booking.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    data
  };
}

module.exports = { createBooking, listBookings };
