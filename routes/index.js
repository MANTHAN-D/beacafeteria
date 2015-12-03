/*
 * GET home page.
 */
var express = require('express');
var router = express.Router();

var Customer = require('../models/customer.js').getModel();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Beecafeteria' });
});

router.get('/signup', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up Page' });
});

router.get('/loginasadmin', function(req, res, next) {
  res.render('loginAdmin', { title: 'Admin Login' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('aboutUs', { title: 'About Us' });
});

router.get('/contactus', function(req, res, next) {
  res.render('ContactUs', { title: 'Admin Login' });
});

router.post('/registerAdmin',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var email = req.body['email'];
	var phone = req.body['phone'];
	var password = req.body['password'];
	var is_admin = 0;

	if(typeof(name) != 'undefined' && typeof(password) != 'undefined' 
		&& typeof(email) != 'undefined' && typeof(phone) != 'undefined'){
		var customer = Customer.build({name : name, email : email, phone : phone, password : password, is_admin : is_admin});

		customer.register(function(rows){
				if(rows){

					data.statusCode = 200;
					res.json(data);

				}
				else{		 
					res.status(401).send({status:'Registration Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.get('/logout', function(req, res, next) {
  	req.session.destroy();
	res.redirect('/');
});					

module.exports = router;