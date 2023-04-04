const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.createUser); //localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); //localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //localhost:3000/users/dashboard

module.exports = router;
