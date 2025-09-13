const User = require('../models/User');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Private/Admin
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if the requesting user is an admin (this will be handled by middleware later)
  // For now, we'll assume the caller is authorized.

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password'); // Exclude password
  res.json(users);
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(401).json({ message: 'Invalid current password or user not found' });
  }
};

// @desc    Delete a user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};