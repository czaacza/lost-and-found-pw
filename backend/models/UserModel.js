const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    balance: {
      type: Number,
      required: true,
      default: 10000, // Default balance of $10,000
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpire: {
      type: Date,
      required: false,
    },
    failedLoginAttempts: {
      type: Number,
      required: false,
      default: 0,
    },
    loginAttemptExpiry: {
      type: Date,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
