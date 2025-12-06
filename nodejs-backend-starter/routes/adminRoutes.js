const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { login, refreshToken } = require('../controllers/adminAuthController');
const { listUsers } = require('../controllers/userController');

router.post('/login', authLimiter, login);
router.post('/refresh-token', refreshToken);

router.use(authMiddleware('Admin'), roleMiddleware('Admin'));
router.get('/users', listUsers);

module.exports = router;
