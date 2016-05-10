var express = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');

var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/register')
        .post(function(req, res){

            var user = req.body;

            var newUser = new User({
                userName: user.userName,
                password: user.password
            })

            newUser.save(function(err){
                createSendToken(newUser, res);
            });
        });

    userRouter.route('/login')
        .post(function(req, res){
            req.user = req.body;

            User.findOne({userName: req.user.userName}, function(err, user){
                if(err) throw err;

                if(!user) {
                    return res.status(401).send({message: 'Wrong email/password'});
                }

                user.comparePasswords(req.user.password, function(err, isMatch){
                    if(err) throw err; 

                    if(!isMatch){
                        return res.status(401).send({message: 'Wrong email/password'});              
                    }

                    createSendToken(user, res);
                });
            })
        });

    return userRouter;
};

function createSendToken(user, res) {
    var payload = {
        sub: user._id,
        exp: moment().add(10, 'days').unix()
    }

    var token = jwt.encode(payload, "secret..");

    res.status(200).send({
        user: user,
        token: token
    });

}

module.exports = routes;