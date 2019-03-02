'use strict';

const HttpStatus = require('http-status');
const CustomError = require('./customError');

module.exports = handler;

function handler(err, req, res, next) {
  if (err instanceof CustomError.NotFound) {
    res.status(HttpStatus.NOT_FOUND);
  }
  else if (err instanceof CustomError.BadRequest) {
    res.status(HttpStatus.BAD_REQUEST);
  }
  else if (err instanceof CustomError.Unauthorized) {
    res.status(HttpStatus.UNAUTHORIZED);
  }
  else {
    res.status(HttpStatus.BAD_REQUEST);
  }

  res.json({
    error: {
      message: err.message
    },
    success: false
  })
}