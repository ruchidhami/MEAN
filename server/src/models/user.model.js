'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email:{
    type: String
  },
  username: {
    type: String
  },
  gender: {
    type: String,
  },
  designation: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: String,
    required: true,
    default: false
  },
  experience: [{
    name: {
      type: String,
      required: true
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
