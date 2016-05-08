var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');

// router.route('/locations/user')
//     .post(function(req, res){
// 	    var loc = new Loc(req.body);
// 	    console.log(req.body);

// 	    loc.save();
// 	    res.status(201).send(loc);

//     });

// router.route('/locations/user/:userId')
// 	.get(function(req,res){
// 	    Loc.find(req.params.userId, function(err,locations){
// 	        if(err)
// 	            res.status(500).send(err);
// 	        else
// 	        	console.log(req.params.userId);
// 	            res.json(locations);
// 	    });
// 	});




/* GET users listing. */
router.get('/api/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/', function(req, res) {
  res.redirect('/app/');
});

/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

module.exports = router;
