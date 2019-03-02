"use strict";

const Promise = require('bluebird');

const envConfig = require('../../../config/env');
const UserService = require('../../services/user.service');

function createUser(req, res, next) {
  let params = req.body;
  params.profile = req.file.filename

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
  let updateParams = req.body;

  let userId = req.params.id;

  UserService.update(userId, updateParams)
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
  let query = req.query;
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

  // if (query.q) {
  //   ValuationService.search(query)
  //     .then(listValuation => {
  //       const clientArray = [];
  //       return Promise.each(listValuation, function (valuation) {
  //         const client = {};
  //         client.fullName = valuation.client.fullName;
  //         client.clientOrganization = valuation.client.clientOrganization;
  //         client.contactNumber = valuation.client.contactNumber;
  //         client.typeOfProperty = valuation.propertyType.typeOfProperty;
  //         client.statusOfReport = valuation.propertyType.statusOfReport;
  //         client.bankName = valuation.property.otherInfo.bankName;
  //         client.images = valuation.images;
  //         client.id = valuation._id;
  //         clientArray.push(client);
  //       })
  //         .then(() => {
  //           const cli = clientArray.filter((client, index, self) =>
  //             index === self.findIndex((t) => (
  //               t.fullName === client.fullName && t.contactNumber === client.contactNumber
  //             ))
  //           );
  //           const clients = [];
  //           return Promise.each(cli, function (detail) {
  //             const clientList = {};
  //             clientList.clients = [{
  //               fullName: detail.fullName,
  //               contactNumber: detail.contactNumber,
  //               clientOrganization: detail.clientOrganization
  //             }];
  //             clientList.typeOfProperty = detail.typeOfProperty;
  //             clientList.statusOfReport = detail.statusOfReport;
  //             clientList.bankName = detail.bankName;
  //             clientList.id = detail.id;
  //             clients.push(clientList);
  //           })
  //             .then(() => {
  //               res.send({data: clients, total: 0});
  //             })
  //
  //         });
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // } else {
  //   ValuationService.findAll(query)
  //     .then(listValuation => {
  //       return ValuationService.countAll()
  //         .then(count => {
  //           const clients = [];
  //           return Promise.each(listValuation, function (valuation) {
  //             const client = {};
  //             client.clients = valuation.client;
  //             client.typeOfProperty = valuation.propertyType.typeOfProperty;
  //             client.statusOfReport = valuation.propertyType.statusOfReport;
  //             client.bankName = valuation.property.otherInfo.bankName;
  //             client.id = valuation._id;
  //             client.images = valuation.images;
  //             clients.push(client);
  //           })
  //             .then(() => {
  //               res.send({data: clients, total: count})
  //             })
  //         })
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // }
}


module.exports = {
  createUser,
  updateUser,
  fetchAll
};