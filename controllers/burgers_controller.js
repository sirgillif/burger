var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burger');
});

router.get('/burger', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		//console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burger/create', function (req, res) {
	//console.log(req.body);
	burger.create('burger_name', [req.body.name], function () {
		res.redirect('/burger');
	});
});

router.put('/burger/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	console.log(req.body);
	console.log('condition', condition);

	burger.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burger');
	});
});
router.delete('/burger/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.delete( condition, function () {
		res.redirect('/burger');
	});
});
module.exports = router;