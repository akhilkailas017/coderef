const bcrypt = require('bcrypt');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

async function register({ username, name, email, password }) {
  const existing = await User.findOne({ username });
  if (existing) throw { status: 400, message: 'Username already exists' };

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    name,
    email,
    password: hashed,
    role: 'User'
  });
  return user;
}

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 401, message: 'User does not exist' };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: 'Invalid password' };

  const payload = { userId: user._id, username: user.username, role: 'User' };
  return {
    accessToken: generateAccessToken(payload, 'User'),
    refreshToken: generateRefreshToken(payload, 'User')
  };
}

async function refreshToken(token) {
  try {
    const decoded = jwt.verify(token, config.user.refreshTokenSecret);
    const payload = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
    return {
      accessToken: generateAccessToken(payload, 'User'),
      refreshToken: generateRefreshToken(payload, 'User')
    };
  } catch (err) {
    throw { status: 403, message: 'Invalid refresh token' };
  }
}

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
  register,
  login,
  refreshToken,
  createBooking,
  listBookings,
  updateBooking,
  deleteBooking
};
