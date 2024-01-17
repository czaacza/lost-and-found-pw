const mongoose = require('mongoose');
const validator = require('validator');

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
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/budgettracker-a2e18.appspot.com/o/images%2Favatar.png?alt=media&token=23ca6f35-cad2-4af0-a159-f47ce083c2ef',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
