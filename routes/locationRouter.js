var express = require('express');


var routes = function(Loc){
    var locationRouter = express.Router();

    locationRouter.use('/:userId/locations', function(req,res,next){
        Loc.find({'userId': req.params.userId}, function(err,user){
            if(err)
                res.status(500).send(err);
            else if(user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });

    locationRouter.route('/:userId/locations')
        .post(function(req, res){
            var location = new Loc(req.body);
            location.save();
            res.status(201).send(location);
        })
        .get(function(req,res){
            res.json(req.user);
        });
    return locationRouter;
};

module.exports = routes;