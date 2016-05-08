var express = require('express');


var routes = function(Loc){
    var locationRouter = express.Router();

    locationRouter.route('/')
        .post(function(req, res){
            var location = new Loc(req.body);
            Loc.save();
            res.status(201).send(location);

        });

    locationRouter.route('/:userId')
        .get(function(req,res){

            

            Loc.find({}, 'userId name' function(err,user){
                if(err)
                    console.log(req.params.userId);
                    res.status(500).send(err);
                else
                    res.json(user);
            });

            res.json(req.params.userId);
        });
    return locationRouter;
};

module.exports = routes;