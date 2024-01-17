const UserSchema = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    console.log('login', req.body);
    const { username, password } = req.body;

    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    console.log('id', user._id);

    res
      .status(200)
      .json({ message: 'Welcome Back!', token: jwtToken, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new UserSchema({
      username,
      email,
      password,
    });
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    console.log('user: ', user);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // if there is no variable, then use the existing value
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.image = image || user.image;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
