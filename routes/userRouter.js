var express = require('express');
var jwt = require('jwt-simple');
var passport = require('passport');
var Local


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
                res.status(200).send(newUser);
                //createSendToken(newUser, res);
            })
        })

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

                    res.status(200).send(user);
                    //createSendToken(user, res);
                });
            })
        })
        .get(function(req,res){
            //find by email
            var query = {};

            console.log(req.query);

            if(req.query.username && req.query.password)
            {
                query.userName = req.query.username;
                query.password = req.query.password;

                User.find(query, function(err, user){
                    if(err) {
                        res.status(500).send(err);
                    } else {
                        User.comparePasswords(query.password, function(err, isMatch){
                            if(err) throw err;

                            if(isMatch)
                                createSendToken(user,res);
                        });
                        
                    }
                });
            } else {
                res.status(400).send("bad request");
            }
        });

    return userRouter;
};

function createSendToken(user, res) {
    var payload = {
        iss: req.hostname,
        sub: user._id
    }

    var token = jwt.encode(payload, "secret..");

    res.status(200).send(payload);
}

module.exports = routes;