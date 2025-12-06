const Booking = require('../models/Booking');

async function createBooking(data, username) {
  if (!data.villa || !data.checkIn || !data.checkOut || !data.guests) {
    throw { status: 400, message: 'villa, checkIn, checkOut, guests required' };
  }
  return await Booking.create({ ...data, createdBy: username });
}

async function listBookings(queryParams, username) {
  let { page = 1, limit = 10, villa, date, id } = queryParams;
  page = parseInt(page);
  limit = parseInt(limit);

  const query = { createdBy: username };
  if (villa) query.villa = villa;
  if (date) query.$or = [{ checkIn: date }, { checkOut: date }];
  if (id) query._id = id;

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

async function updateBooking(id, updateData, username) {
  const booking = await Booking.findOneAndUpdate(
    { _id: id, createdBy: username },
    updateData,
    { new: true }
  );
  if (!booking)
    throw { status: 404, message: 'Booking not found or unauthorized' };
  return booking;
}

async function deleteBooking(id, username) {
  const booking = await Booking.findOneAndDelete({
    _id: id,
    createdBy: username
  });
  if (!booking)
    throw { status: 404, message: 'Booking not found or unauthorized' };
  return;
}

module.exports = {
  createBooking,
  listBookings,
  updateBooking,
  deleteBooking
};
