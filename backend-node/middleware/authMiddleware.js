const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Ensure this path is correct

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).send('Invalid Token');
    }

    req.user = user; // Now req.user contains the full user object, including the role
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

module.exports = verifyToken;
