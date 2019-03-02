"use strict";

const CipherService = require('../services/cipher.service');
const UserService = require('../services/user.service');
const envConfig = require('../../config/env');

function setup() {
  return new Promise((resolve, reject) => {
    UserService.list({isAdmin: true})
      .then(async listedUser => {
        if (listedUser.length) {
          resolve({
            message: 'Admin User already exists!'
          })
        }
        else {
          const defaultUserParams = {
            fullName: 'Admin User',
            username: envConfig.get('USER_NAME'),
            email: envConfig.get('EMAIL'),
            password: await CipherService.generateHash(envConfig.get('PASSWORD')),
            isAdmin: envConfig.get('ADMIN'),
            gender: "male",
            designation: "manager",
            profile: "123",
            experience: [{
              name: "Good"
            }]
          };

          return UserService.create(defaultUserParams)
            .then(superAdminCreated => {
              resolve(superAdminCreated)
            })

        }
      })
      .catch(err => {
        reject(err);
      })
  })
}

module.exports = {
  setup
};