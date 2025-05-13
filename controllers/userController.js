const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Protected (authorization handled by middleware)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Protected (add restriction via middleware if needed)
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); // exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  
module.exports = {
  getAllUsers,getUserById
};
