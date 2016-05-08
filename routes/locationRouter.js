var express = require('express');


var routes = function(Loc){
    var locationRouter = express.Router();

    locationRouter.route('/')
        .post(function(req, res){
            var location = new Loc(req.body);
            location.save();
            res.status(201).send(location);

        });

    locationRouter.route('/:userId')
        .get(function(req,res){

            Loc.find({'userId': req.params.userId}, function(err,user){
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(user);
                }
            });

            res.json(req.params.userId);
        });
    return locationRouter;
};

module.exports = routes;