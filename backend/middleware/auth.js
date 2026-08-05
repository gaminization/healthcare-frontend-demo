const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user || { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
