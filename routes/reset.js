'use-strict';
/******************************************************
* API - ROUTES - USER - AUTHENTICATION - RESET.JS
******************************************************/

 const router = require('express').Router();
 const User = require('../../../models/user');
 const sendMail = require('../../../system/email/sendmail');
 const msgs = require('../../../system/email/messages');
 const templates = require('../../../system/email/templates');

router.post('/', function(req, res, next) {
	const newPassword = req.body.newPassword;
  const newPasswordConfirm = req.body.newPasswordConfirm;
  const resetPasswordToken = req.body.token;
  // Need to check token expiration
  if (newPassword !== newPasswordConfirm) {
    return res.status(422).send({ msg: msgs.reset.passwordsDoNotMatch });
  } else {
    User
      .findOne({ resetPasswordToken })
      .then(user => {
        if(!user) {
          return Promise.reject( msgs.reset.tokenNotFound );
        }
        user.password = newPassword;
        return user.save();
      })
      .then(() => res.send({ msg: msgs.reset.success }))
      .catch(err => res.status(500).send({ msg: msgs.reset.failure }))
  }
});

module.exports = router;
