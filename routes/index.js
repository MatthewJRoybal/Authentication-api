'use-strict';
/******************************************************
* API - ROUTES - USER - AUTHENTICATION - INDEX.JS
******************************************************/

const passport = require('passport');
const router = require('express').Router();
require('../../middleware/passport');

// Middleware
const SigninCheck = passport.authenticate('local', { session: false });
const LoginCheck = passport.authenticate('jwt', { session: false });

router.use('/signin', SigninCheck, require('./signin'));
router.use('/signup', require('./signup'));
router.use('/confirm', require('./confirm'));
router.use('/forgot', require('./forgot'));
router.use('/reset', require('./reset'));

module.exports = router;
