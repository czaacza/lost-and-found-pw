const UserSchema = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  validateUsername,
  isValidEmail,
  validateId,
} = require('../middleware/validation');

const PEPPER = process.env.PEPPER;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!validateUsername(username)) {
      return res
        .status(400)
        .json({ message: 'Invalid username or password format' });
    }

    const user = await UserSchema.findOne({ username });

    if (
      user &&
      user.loginAttemptExpiry &&
      user.loginAttemptExpiry > Date.now()
    ) {
      return res.status(429).json({
        message: 'Too many failed login attempts. Please try again later.',
      });
    }

    // Check if user exists and password is correct
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordWithPepper = password + PEPPER;
    const isPasswordCorrect = await bcrypt.compare(
      passwordWithPepper,
      user.password
    );
    console.log('user', user);
    console.log('isPasswordCorrect: ', isPasswordCorrect);

    if (!isPasswordCorrect) {
      // Increment failed login attempts
      console.log('Incrementing failed login attempts');
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 20) {
        // Lock the account for 2 minutes
        user.loginAttemptExpiry = new Date(Date.now() + 1 * 30 * 1000);
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    user.loginAttemptExpiry = null;
    await user.save();

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Login successful', token: jwtToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

exports.getUserProfile = async (req, res) => {
  try {
    if (!validateId(req.user.id)) {
      return res.status(400).json({ message: 'Invalid sender ID' });
    }

  //const user = await UserSchema.findById(req.user.id).select('-password'); // Exclude password from the result
  const user = await UserSchema.findOne({ username: req.params.username }).select('-password');
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateUsername(username) || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid input format' });
    }

    // Hashing the password
    const saltRounds = 10;
    const passwordWithPepper = password + PEPPER;
    const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds);

    const user = new UserSchema({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'user',
    });

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
    const { username, email, password } = req.body;

    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username && !validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid username format' });
    }
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    // if (password && !validatePassword(password)) {
    //   return res.status(400).json({ message: 'Invalid password format' });
    // }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      const saltRounds = 10;
      const passwordWithPepper = password + PEPPER;
      user.password = await bcrypt.hash(passwordWithPepper, saltRounds);
    }

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
    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
