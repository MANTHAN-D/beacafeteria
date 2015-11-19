var express = require('express');
var router = express.Router();

var mysql = require('./mysql');

router.post('/',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var email = req.body['email'];
	var phone = req.body['phone'];
	var pass = req.body['pass'];

	if(typeof(name) != 'undefined' && typeof(pass) != 'undefined' 
		&& typeof(email) != 'undefined' && typeof(phone) != 'undefined'){
		
		var connection = mysql.getConnection();
		connection.query('INSERT INTO customer_details (name,email,phone,password) values (?,?,?,?)',[name,email,parseInt(phone),pass],
			function(err,rows){
				if(err){
					console.log('Error Selecting : %s ',err);
					res.status(500).send({status:'Registration Failed!'});
				}
				else{
					data.status = '200';
					res.json(data);			
				}				
			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;