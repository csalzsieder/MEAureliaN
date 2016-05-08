var express = require('express');


var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/')
        .post(function(req, res){
            var user = new User(req.body);
            user.save();
            res.status(201).send(user);
        });

    userRouter.use('/:userId', function(req,res,next){
        User.find({'userId': req.params.userId}, function(err,user){
            if(err)
                res.status(500).send(err);
            else if(user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });

    userRouter.route('/:userId')
        .get(function(req,res){
            res.json(req.user);
        });
    return userRouter;
};

module.exports = routes;