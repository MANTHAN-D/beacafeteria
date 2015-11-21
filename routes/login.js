var express = require('express');
var router = express.Router();

var Customer = require('../models/customer.js').getModel();

router.post('/',function(req,res,next){
		
	var data ={};
	var email = req.body['email'];
	var password = req.body['pass'];

	if(typeof(email) != 'undefined' && typeof(password) != 'undefined'){
		
		var customer = Customer.build();

		customer.validate(email,password,			
			function(rows){
				if(rows){
					data.status = '200';
					res.json({status : '200'});
				}
				else{		 
					res.status(401).send({status:'Invalid Login credentials'});
				}

			});
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;