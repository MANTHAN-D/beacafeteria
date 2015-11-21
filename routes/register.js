var express = require('express');
var router = express.Router();

var Customer = require('../models/customer.js').getModel();

router.post('/',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var email = req.body['email'];
	var phone = req.body['phone'];
	var password = req.body['pass'];

	if(typeof(name) != 'undefined' && typeof(password) != 'undefined' 
		&& typeof(email) != 'undefined' && typeof(phone) != 'undefined'){
		var customer = Customer.build({name : name, email : email, phone : phone, password : password});

		customer.register(function(rows){
				if(rows){
					data.status = '200';
					res.json({status : '200'});
				}
				else{		 
					res.status(500).send({status:'Registration Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;