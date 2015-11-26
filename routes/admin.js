var express = require('express');
var router = express.Router();

var Customer = require('../models/customer.js').getModel();
var Counter_Register = require('../models/counter_register.js').getModel();
var Counter_Cofig = require('../models/counter_config.js').getModel();

router.get('/counterSignUp', function(req, res, next) {
  res.render('registerCounter', { title: 'Counter Registration' });
});

router.get('/dailyDealSignUp', function(req, res, next) {
  res.render('add_deals', { title: 'Configure Deals' });
});

router.get('/loadadminejs', function(req, res, next) {
  res.render('mainAdminHome', { title: 'Admin Home' });
});

router.get('/counterAdmin', function(req, res, next) {
  res.render('adminHome', { title: 'Counter Admin Home' });
});

// router.get('/loadhome', function(req, res, next) {
   
// 	var counter_id=JSON.stringify(req.session.data[0].counter_id);	
// 	var customer = Customer.build({counter_id : counter_id});

// 	customer.fetchOnCounterId(function(rows){
// 		if(rows){
// 			if(rows.length > 0)
// 			{
// 				req.session.data=rows;
// 				console.log("valid inselect");
// 				res.render('adminHome',{results:JSON.stringify(results)});				
// 				res.status(200);
// 			}
// 			else 
// 			{
// 				console.log("error");
// 				res.status(401);
// 			}
// 		}
// 		else{
// 			throw err;
// 			console.log("error");
// 		}
// 	});	
// });


router.get('/loadadminhome', function(req, res, next) {
   
   var customer = Customer.build();
   var counter_register = Counter_Register.build();

   customer.fetchNotYetAdmin(function(customerRows){
   	if(customerRows){
   		counter_register.getCounterList(function(counterRows){
   			if(counterRows){
   				res.send({"results":JSON.stringify(customerRows),"results1":JSON.stringify(counterRows)});
   			}
   			else{
   				counterRows = [];
   				res.send({"results":JSON.stringify(customerRows),"results1":JSON.stringify(counterRows)});
   			}
   		});
   	}
   	else{
   		customerRows = [];
   		var counterRows = [];
   		res.send({"results":JSON.stringify(customerRows),"results1":JSON.stringify(counterRows)});
   	}
   });	
});

//approve request admin
router.post('/approveAdmin', function(req, res, next) {
	var primary_id=req.body['primary_id'];
	var counter_id = req.body['counter_id'];

	var customer = Customer.build({primary_id : primary_id, counter_id : counter_id});
	customer.approveAdminForCounter(function(rows){
		res.send();
	});
});

//deny admin request
router.post('/denyAdmin', function(req, res, next) {
	var primary_id=req.body['primary_id'];

	var customer = Customer.build({primary_id : primary_id});
	customer.removeCustomer(function(rows){
		res.send();
	});
});

module.exports = router;