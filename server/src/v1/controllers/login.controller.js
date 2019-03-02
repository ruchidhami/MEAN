const UserService = require('../../services/user.service');
const CipherService = require('../../services/cipher.service');

function login(req, res, next) {
  let params = {
    $and: [
      {
        $or: [
          {
            'email': req.body.username
          },
          {
            'username': req.body.username
          }
        ]
      },
      {
        'isAdmin': true
      }
    ]
  }
  return UserService.findOne(params)
    .then(async user => {
      if (user) {
        if (!CipherService.compareHash(req.body.password, user.password)) {
          throw new Error("Password is incorrect.")
        } else {
          res.send({
            data: {
              message: 'Successfully loggedIn.',
              token: await CipherService.generateToken({id: user._id, email: user.email}),
            },
            success: true
          })
        }
      } else {
        throw new Error("Username is incorrect.")
      }
    })
    .catch(err => {
      next(err);
    })
}


module.exports = {
  login
};