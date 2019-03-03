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
    User.updateOne({
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

function search(attributes, keyWord) {
  return new Promise((resolve, reject) => {
      const where = {
        $and: [{
          isAdmin: false
        },
          {
            $or: []
          }
        ]
      }

      let key = new RegExp("^" + keyWord.toLowerCase(), "i")

      attributes.forEach(attribute => {
        let likeQuery = {}
        likeQuery[attribute] = {
          $regex: key
        }
        where.$and[1].$or.push(likeQuery)
      })

      return User.find(where)
        .then(userListing => {
          resolve(userListing);
        })
        .catch(err => {
          reject(err);
        })
    }
  )

}


module.exports = {
  create,
  update,
  list,
  findOne,
  search
};