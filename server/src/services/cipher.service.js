const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const envConfig = require('../../config/env')

function generateHash(password) {
  return bcrypt.hashSync(password, 10)
}

function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash)
}

function generateToken(user) {
  return jwt.sign(user, envConfig.get('CIPHER_SECRET'))
}

function verifyToken(token) {
  return jwt.verify(token, envConfig.get('CIPHER_SECRET'))
}

module.exports = {
  generateHash,
  compareHash,
  generateToken,
  verifyToken
};
