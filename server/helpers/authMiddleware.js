'use strict';

const CustomError = require('./customError');
const CipherService = require('../src/services/cipher.service');
const UserService = require('../src/services/user.service')

const whiteListedUrl = ['/v1/login'];


async function authorize(req, res, next) {
  const token = req.headers.authorization;

  if (whiteListedUrl.indexOf(req.url) > -1) {
    next();
  }
  else if (!token) {
    next(new CustomError.Unauthorized());
  }
  else {
    const decodedValue = await CipherService.verifyToken(token);
    let user = await UserService.findOne({
      $and: [
        {_id: decodedValue.id},
        {
          email: decodedValue.email
        }]
    })
    if (user) {
      req.user = {
        email: user.email,
        id: user._id,
        username: user.username
      };
      next();
      return null;
    } else {
      next(new CustomError.Unauthorized());
    }
  }
}

module.exports = authorize;