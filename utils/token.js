const jwt = require('jsonwebtoken');

exports.generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES * 60 * 1000, //time in milliseconds
  });
};
