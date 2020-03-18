'use-strict';
/*******************************************************
* API - ROUTES - USER - AUTHENTICATION - SIGNIN.JS
*******************************************************/

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const { SECRET } = require('../../../system/config');
const sendEmail = require('../../../system/email/sendmail');
const msgs = require('../../../system/email/messages');
const templates = require('../../../system/email/templates');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.sign({ sub: user._id, iat: timestamp }, SECRET);
}

// Middleware passed...send token and user info for localStorage
router.post('/', function(req, res, next) {
	if(!req.user.confirmed) {
			sendEmail(req.user.email, templates.confirm(req.user._id));
			return res.status(403).send({ msg: msgs.confirm.unconfirmed });
		} else {
		res.status(200).send({
      token: tokenForUser(req.user),
      user: {
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        aNumber: req.user.aNumber,
				dnum: req.user.dnum,
				status: req.user.status,
				role: req.user.role,
				commitment: req.user.commitment,
				hiredDem: req.user.hiredDem,
				postClass: req.user.postClass,
				peoplesoft: req.user.peoplesoft,
				postId: req.user.postId,
				iaed: req.user.iaed,
				dsw: req.user.dsw,
				confirmed: req.user.confirmed,
        classification: req.user.classification,
        seniority8238: req.user.seniority8238,
        seniority8239: req.user.seniority8239,
        seniority8240: req.user.seniority8240
      }
    })
  }
});

module.exports = router;
