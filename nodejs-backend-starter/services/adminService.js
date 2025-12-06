const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const Booking = require('../models/Booking');
const config = require('../config/env');

const adminUsername = config.admin.username;
const adminPasswordHash = config.admin.passwordHash;

async function login({ username, password }) {
  if (username !== adminUsername)
    throw { status: 401, message: 'Invalid credentials' };
  const match = await bcrypt.compare(password, adminPasswordHash);
  if (!match) throw { status: 401, message: 'Invalid credentials' };

  const payload = { username, role: 'Admin', userId: 'admin-1' };
  return {
    accessToken: generateAccessToken(payload, 'Admin'),
    refreshToken: generateRefreshToken(payload, 'Admin')
  };
}

async function refreshToken(token) {
  const jwt = require('jsonwebtoken');
  try {
    const decoded = jwt.verify(token, config.admin.refreshTokenSecret);
    const payload = {
      username: decoded.username,
      role: 'Admin',
      userId: decoded.userId
    };
    return {
      accessToken: generateAccessToken(payload, 'Admin'),
      refreshToken: generateRefreshToken(payload, 'Admin')
    };
  } catch (err) {
    throw { status: 403, message: 'Invalid refresh token' };
  }
}

async function createBooking(data, createdBy) {
  if (!data.villa || !data.checkIn || !data.checkOut || !data.guests) {
    throw { status: 400, message: 'villa, checkIn, checkOut, guests required' };
  }
  return await Booking.create({ ...data, createdBy });
}

async function listBookings(queryParams) {
  let { page = 1, limit = 10, villa, date } = queryParams;
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

module.exports = { login, refreshToken, createBooking, listBookings };
