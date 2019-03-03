'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.Schema.Types.Boolean.convertToFalse.add('');
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
    required: true
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
    type: String,
    required:true,
    default: 'active'
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
