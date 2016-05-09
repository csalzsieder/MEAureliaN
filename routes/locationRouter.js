var express = require('express');
var jwt = require('jwt-simple');

var routes = function(Loc){
    var locationRouter = express.Router();


    locationRouter.use('/:userId/locations', function(req,res,next){
        if(!req.headers.authorization){
            return res.status(401).send({
                message: 'You are not authorized'
            });
        }

        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, "secret..");

        if(!payload.sub) {
            return res.status(401).send({
                message: 'Authentication failed'
            });
        }

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
                res.status(404).send('no locations found');
            }
        });
    });

    locationRouter.route('/:userId/locations')
        .get(function(req,res){
            res.json(req.user);
        });
    locationRouter.route('/locations')
        .post(function(req, res){
            if(!req.headers.authorization){
                return res.status(401).send({
                    message: 'You are not authorized'
                });
            }

            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, "secret..");

            if(!payload.sub) {
                return res.status(401).send({
                    message: 'Authentication failed'
                });
            }

            var location = new Loc(req.body);
            location.save();
            res.status(201).send(location);
        })
    return locationRouter;
};

module.exports = routes;