'use-strict';
/******************************************************
* API - ROUTES - USER - AUTHENTICATION - SIGNUP.JS
******************************************************/

const router = require('express').Router();
const User = require('../../../models/user');
const sendEmail = require('../../../system/email/sendmail');
const msgs = require('../../../system/email/messages');
const templates = require('../../../system/email/templates');

router.post('/', function(req, res, next) {
	const { email, password } = req.body;
  if (!email || !password) {
		return res.status(422).send({ msg: 'You must provide an email and password' });
	}
	const user = new User({	email, password });

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			res.status(422).send({ msg: msgs.error.wrong });
			return next(err);
		}
		if (existingUser) {
			if(existingUser && !existingUser.confirmed) {
				sendEmail(existingUser.email, templates.confirm(existingUser._id));
				return res.status(200).send({ msg: msgs.confirm.resend });
			}
			return res.status(200).send({ msg: msgs.confirm.alreadyConfirmed });
		}
		if (!existingUser) {
			user.save(err => {
				if(err) {
					res.status(422).send({ msg: msgs.error.wrong });
					return next(err);
				}
				sendEmail(user.email, templates.confirm(user._id));
				return res.status(200).send({ msg: msgs.confirm.verify });
			})
		}
	})
});

module.exports = router;
