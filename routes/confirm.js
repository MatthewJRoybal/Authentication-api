'use-strict';
/********************************************************
* API - ROUTES - USER - AUTHENTICATION - CONFIRM.JS
*********************************************************/

const router = require('express').Router();
const User = require('../../../models/user');
const msgs = require('../../../system/email/messages');

router.post('/:id', function(req, res, next) {
  User
    .updateOne({ _id: req.params.id }, { $set: { "confirmed": true }})
    .then(user => res.status(200).send({ msg: msgs.confirm.confirmed }))
    .catch(err => res.status(422).send({ msg: msgs.confirm.unconfirmed }))
});

module.exports = router;
