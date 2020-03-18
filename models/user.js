'use-strict';
/*****************************
* API - MODELS - USER.JS
*****************************/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	confirmed: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: { type: String },
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
	purchases: {
		type: Array
	},
	firstName: { type: String },
	lastName: { type: String },
  location: { type: String }
});

// Hash user password and save
UserSchema.pre('save', function(next) {
	const user = this;
	// Added to prevent user.save() from modifying the password inadvertently
  if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
