'use-strict';
/*****************************************************
* API - ROUTES - USER - AUTHENTICATION - FORGOT.JS
*****************************************************/

const router = require('express').Router();
const randToken = require('rand-token');
const User = require('../../../models/user');
const sendMail = require('../../../system/email/sendmail');
const msgs = require('../../../system/email/messages');
const templates = require('../../../system/email/templates');

router.post('/', function(req, res, next) {
  const { email } = req.body;
  if (!email) {
		return res.status(422).send({ msg: msgs.email.required });
	}
	User
		.findOne({ email })
		.then(user => {
			if(!user) {
        res.send({ msg: msgs.email.notFound });
				return Promise.reject('Sorry, we could not find a user with that email address');
			}
      user.resetPasswordToken = randToken.generate(16);
			// user.resetPasswordExpires = Date.now() + 1200000; // 20 minutes
      user.save();
      sendMail(user.email, templates.forgot(user.resetPasswordToken));
    })
    .then(() => res.json({ msg: msgs.reset.forgot }))
    .catch(err => console.log(err))
});

module.exports = router;
