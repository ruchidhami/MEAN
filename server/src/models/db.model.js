'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const envConfig = require('../../config/env');

const User = require('../models/user.model');

module.exports = function () {
  mongoose.connect(envConfig.get('MONGODB_URI'), { useNewUrlParser: true } );
  let db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function callback() {
    console.log('Database opened');
  });
};
