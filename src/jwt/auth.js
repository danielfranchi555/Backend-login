/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '5m' });
}

module.exports = generateToken;
