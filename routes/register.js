var express = require('express');

var gcm = require('node-gcm');

var router = express.Router();

var sender = new gcm.Sender('AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI');
// AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI
// 671150531291

var Customer = require('../models/customer.js').getModel();

router.post('/',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var email = req.body['email'];
	var phone = parseInt(req.body['phone']);
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

router.post('/token',function(req,res,next){
		
	var data ={};	
	var email = req.body['email'];
	var registration_token = req.body['registration_token'];

	if(typeof(email) != 'undefined' && typeof(registration_token) != 'undefined'){		

		var customer = Customer.build({email : email, registration_token : registration_token});

		customer.addRegistrationToken(function(rows){
				if(rows){
						
					var message = new gcm.Message();
					message.addData('message','Token Registration successfull');

					var regTokens = [];

					regTokens.push(registration_token);

					sender.send(message, { registrationTokens : regTokens }, function (err, response) {
					    if(err) console.log(err);
					    else    console.log(response);
					});

					data.status = '200';
					res.json({status : '200'});

				}
				else{		 
					res.status(500).send({status:'Token Registration Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

module.exports = router;

// var gcm = require('node-gcm');

// var message1 = new gcm.Message();

// message1.addData('message', 'Manthan');

// var regTokens = ['flSKMvz1paE:APA91bF5x_GOdqmr69xevLWUw7Z9arPT0r_Dqgm0tyju1-TmzS8y7zKq6G5U3Uzls4lao_TtiEDoLzdJPoqCCP37PVu6et6GyGqk5j2pOHAq0Zijy_lpzVgNB3DeSzYMKDz9lDWqpkfS'];

// // Set up the sender with you API key
// var sender = new gcm.Sender('AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI');

// // Send to a topic, with no retry this time
// sender.sendNoRetry(message1, { topic: '/topics/global' }, function (err, response) {
//     if(err) console.error(err);
//     else    console.log(response);
// });