const { verifyToken } = require('../utils/jwt');

function authMiddleware(role) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).json({ error: 'No token provided' });

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token, role, 'access');

      req.user = decoded;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ error: 'Invalid or expired token', msg: err });
    }
  };
}

module.exports = authMiddleware;
