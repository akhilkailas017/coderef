const express = require('express');
const router = express.Router();
const {
  createBooking,
  listBookings
} = require('../controllers/adminBookingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { login, refreshToken } = require('../controllers/adminAuthController');

router.post('/login', authLimiter, login);
router.post('/refresh-token', refreshToken);

router.use(authMiddleware('Admin'), roleMiddleware('Admin'));
router.post('/booking', createBooking);
router.get('/booking', listBookings);

module.exports = router;
