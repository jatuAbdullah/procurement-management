const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Make sure this path is correct

// Protect routes by verifying JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from "Bearer <token>"
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user has the required role(s)
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Current role is '${req.user.role}', required role(s): ${roles.join(', ')}`,
      });
    }
    next();
  };
};


module.exports = { protect, authorize };
