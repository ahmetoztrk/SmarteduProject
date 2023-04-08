const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  authController.createUser
); //localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); //localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //localhost:3000/users/dashboard

module.exports = router;
