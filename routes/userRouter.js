var express = require('express');


var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('')
        .post(function(req, res){
            var user = new User(req.body);
            user.save();
            res.status(201).send(user);
        })
        .get(function(req,res){

            var query = {};

            console.log(req.query);

            if(req.query.username && req.query.password)
            {
                query.userName = req.query.username;
                query.password = req.query.password;

                User.find(query, function(err,user){
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(user);
                });
            } else {
                res.status(400).send("bad request");
            }
        });

    return userRouter;
};

module.exports = routes;