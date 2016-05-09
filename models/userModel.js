var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    userName: String,
    password: String
});

userSchema.methods.toJSON = function () {
	var user = this.toObject();
	delete user.password;
	return user;
};

userSchema.methods.comparePasswords = function (password, callback) {
	bcrypt.compare(password, this.password, callback);
}

userSchema.pre('save', function(next){
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		})
	})
})

module.exports = mongoose.model( 'User', userSchema );