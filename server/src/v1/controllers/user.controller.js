"use strict";
const UserService = require('../../services/user.service');

function createUser(req, res, next) {
  let params = JSON.parse(req.body.data);
  params.profile = req.file.filename
  if (params.status) {
    params.status = 'active'
  } else {
    params.status = 'inactive'
  }
  return UserService.create(params)
    .then(createdResponse => {
      res.send({
        data: {
          message: "User created Successfully!",
          user: createdResponse
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function updateUser(req, res, next) {
  let updateParams = JSON.parse(req.body.data);
  if (req.file) {
    updateParams.profile = req.file.filename
  }

  if (updateParams.status) {
    updateParams.status = 'active'
  } else {
    updateParams.status = 'inactive'
  }

  let userId = req.params.id;

  return UserService.update(userId, updateParams)
    .then(() => {
      res.send({
        data: {
          message: "Updated Successfully!"
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function fetchAll(req, res, next) {
  return UserService.list({isAdmin: false})
    .then(users => {
      res.send({
        data: {
          users: users
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function fetchUser(req, res, next) {
  return UserService.findOne({_id: req.params.id})
    .then(user => {
      res.send({
        data: {
          user: user
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function searchUser(req, res, next) {
  let query = req.query;
  let attributes = ['fullName', 'designation', 'status', 'gender']
  return UserService.search(attributes, query.q)
    .then(users => {
      res.send({
        data: {
          users: users
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

module.exports = {
  createUser,
  updateUser,
  fetchAll,
  fetchUser,
  searchUser
};