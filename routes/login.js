var express = require('express');

var router = express.Router();
    

var Customer = require('../models/customer.js').getModel();

router.post('/',function(req,res,next){
		
	var data ={};
	var email = req.body['email'];
	var password = req.body['password'];

	if(typeof(email) != 'undefined' && typeof(password) != 'undefined'){		
		
		if(email == 'admin@beecafeteria.net' && password == 'password@1'){
			console.log('Main admin');
			res.json({statusCode : 200});
		}
		else{
			var customer = Customer.build();

			customer.validate(email,password,			
				function(rows){
					if(rows){
						if(rows.is_admin == 0){
							console.log('To be admin');
							data.statusCode = 201;
							res.json(data);
						}
						else if(rows.is_admin == 1){
							console.log('Counter admin');
							data.statusCode = 202;
							req.session.data = [{email : rows.email, counter : rows.counter_id}];
							res.json(data);
						}
						else{
							console.log('Customer');
							data.statusCode = '200';
							res.json(data);

						}						
					}
					else{		 
						res.status(401).send({status:'Invalid Login credentials'});
					}

				});
		}		
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;