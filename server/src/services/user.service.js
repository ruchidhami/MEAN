"use strict";

const User = require('../models/user.model');

function create(userParams) {
  return new Promise((resolve, reject) => {
    let user = new User(userParams);
    user.save()
      .then(userCreated => {
        resolve(userCreated);
      })
      .catch(err => {
        reject(err);
      })
  })
}

function list(params) {
  return new Promise((resolve, reject) => {
    User.find(params)
      .then(listedUser => {
        resolve(listedUser)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function findOne(params) {
  return User.findOne(params);
}

function update(userId, params) {
  return new Promise((resolve, reject) => {
    User.update({
      '_id': userId
    }, {
      '$set': params
    })
      .then(userUpdatedResponse => {
        resolve(userUpdatedResponse)
      })
      .catch(err => {
        reject(err);
      })
  })
}

function search(params) {
  return new Promise((resolve, reject) => {
    return User.aggregate({
      '$unwind': "$client"
    }, {
      '$unwind': "$owner"
    }, {
      "$match": {
        $or: [{
          'client.fullName': params.q
        }, {
          'client.contactNumber': params.q
        }, {
          'client.clientOrganization': params.q
        }, {
          'owner.fullName': params.q
        }, {
          'owner.contactNumber': params.q
        }, {
          'propertyType.typeOfProperty': params.q
        }, {
          'property.otherInfo.bankName': params.q
        }]
      }
    })
      .then(userListing => {
        resolve(userListing);
      })
      .catch(err => {
        reject(err);
      })
  })

}


module.exports = {
  create,
  update,
  list,
  findOne,
  search
};