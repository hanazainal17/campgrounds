const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/userAuthController');
const passport = require('passport');

router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.redirectLogin);

router.get('/logout', users.logout);

module.exports = router;