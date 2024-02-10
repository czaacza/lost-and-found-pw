const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireRole = (role) => async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'Access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user.role !== role)
      return res.status(403).json({ message: 'Access denied' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = requireRole;
