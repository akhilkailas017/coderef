const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, userAuthController.register);
router.post('/login', authLimiter, userAuthController.login);
router.post('/refresh-token', userAuthController.refreshToken);

router.use(authMiddleware('User'));
router.post('/blog', blogController.createPost);
router.get('/blog', blogController.listPosts);
router.get('/blog/:id', blogController.getPost);
router.patch('/blog/:id', blogController.updatePost);
router.delete('/blog/:id', blogController.deletePost);

module.exports = router;
