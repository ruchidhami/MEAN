const express = require('express'),
  router = express.Router();
const Multer = require('multer');
const rootPath = require('path').join(__dirname, '../../../assets/images')

const UserController = require('../controllers/user.controller');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rootPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const multer = Multer({
  storage: storage
})

router.post('/users', multer.single('profile'), UserController.createUser);

router.patch('/users/:id', multer.single('profile'), UserController.updateUser);

router.get('/users', UserController.fetchAll);

router.get('/users/:id', UserController.fetchUser);

router.get('/search', UserController.searchUser);

module.exports = router;