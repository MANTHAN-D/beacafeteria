var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
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
					
					var message = new gcm.Message();
					message.addData('message','Registration successfull');

					sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, response) {
					    if(err) console.log(err);
					    else    console.log(response);
					});

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