const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');
const userBookingController = require('../controllers/userBookingController');
const authMiddleware = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, userAuthController.register);
router.post('/login', authLimiter, userAuthController.login);
router.post('/refresh-token', userAuthController.refreshToken);

router.use(authMiddleware('User'));
router.post('/booking', userBookingController.createBooking);
router.get('/booking', userBookingController.listBookings);
router.put('/booking/:id', userBookingController.updateBooking);
router.patch('/booking/:id', userBookingController.updateBooking);
router.delete('/booking/:id', userBookingController.deleteBooking);

module.exports = router;
