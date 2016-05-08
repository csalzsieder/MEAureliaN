var express = require('express');

var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/')
        .post(function(req, res){
            var user = new User(req.body);
            User.save();
            res.status(201).send(user);

        });

    userRouter.route('/:userId')
        .get(function(req,res){ 

            User.find({}, 'userId name' function(err,user){
                if(err)
                    console.log(req.params.userId);
                    res.status(500).send(err);
                else
                    res.json(user);
            });

            res.json(req.params.userId);
        });
    return userRouter;
};

module.exports = routes;