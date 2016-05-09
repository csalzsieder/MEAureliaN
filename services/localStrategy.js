var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
	usernameField: 'userName'
};

exports.login = new LocalStrategy(strategyOptions, function (userName, password, done) {

	var searchUser = {
		userName: userName
	};

	User.findOne(searchUser, function (err, user) {
		if (err) return done(err);

		if (!user) return done(null, false, {
			message: 'Wrong email/password'
		});

		user.comparePasswords(password, function (err, isMatch) {
			if (err) return done(err);

			if (!isMatch) return done(null, false, {
				message: 'Wrong email/password'
			});

			return done(null, user);
		});
	})
});

exports.register = new LocalStrategy(strategyOptions, function (userName, password, done) {

	var searchUser = {
		user: userName
	};

	User.findOne(searchUser, function (err, user) {
		if (err) return done(err);

		if (user) return done(null, false, {
			message: 'email already exists'
		});

		var newUser = new User({
			userName: userName,
			password: password
		});

		newUser.save(function (err) {
			done(null, newUser);
		})
	});
});