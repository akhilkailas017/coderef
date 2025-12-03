const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, userController.register);
router.post('/login', authLimiter, userController.login);
router.post('/refresh-token', userController.refreshToken);

router.use(authMiddleware('User'));
router.post('/booking', userController.createBooking);
router.get('/booking', userController.listBookings);
router.put('/booking/:id', userController.updateBooking);
router.patch('/booking/:id', userController.updateBooking);
router.delete('/booking/:id', userController.deleteBooking);

module.exports = router;
