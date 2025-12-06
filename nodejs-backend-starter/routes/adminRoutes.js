const express = require('express');
const router = express.Router();
const {
  login,
  refreshToken,
  createBooking,
  listBookings
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, login);
router.post('/refresh-token', refreshToken);

router.use(authMiddleware('Admin'), roleMiddleware('Admin'));
router.post('/booking', createBooking);
router.get('/booking', listBookings);

module.exports = router;
