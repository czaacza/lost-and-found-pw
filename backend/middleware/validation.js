const mongoose = require('mongoose');
const { isNumeric } = require('validator');

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email) && email.length < 50;
}

function validateUsername(username) {
  return (
    typeof username === 'string' && username.length > 0 && username.length <= 50
  );
}

function validatePassword(password) {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    password.length <= 50
  );
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateAmount(amount) {
  return isNumeric(amount) && amount > 0;
}

function validateDate(date) {
  const returnDateObject = new Date(date);
  return !isNaN(returnDateObject.getTime()) && returnDateObject > new Date();
}

function validateLoanStatus(status) {
  return ['accepted', 'denied', 'pending', 'repaid'].includes(status);
}

function validateResetToken(token) {
  const hexRegex = /^[0-9a-fA-F]{40,64}$/; // Adjust length as needed
  return hexRegex.test(token);
}

module.exports = {
  isValidEmail,
  validateUsername,
  validatePassword,
  validateId,
  validateAmount,
  validateDate,
  validateLoanStatus,
  validateResetToken,
};
