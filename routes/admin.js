var express = require('express');
var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI');

var router = express.Router();

var Customer = require('../models/customer.js').getModel();
var Counter_Register = require('../models/counter_register.js').getModel();
var Counter_Cofig = require('../models/counter_config.js').getModel();

router.get('/broadCastPage', function(req, res, next) {
  if(req.session.sysadmin){
    res.render('broadCast', { title: 'Message Broadcast' });
  }
  else{
    res.render('loginAdmin', { title: 'Admin Login' });
  }
  
});

router.get('/counterSignUp', function(req, res, next) {
  if(req.session.sysadmin){
    res.render('registerCounter', { title: 'Counter Registration' });
  }
  else{
    res.render('loginAdmin', { title: 'Admin Login' });
  }
  
});

router.get('/dailyDealSignUp', function(req, res, next) {
  if(req.session.sysadmin){
    res.render('add_deals', { title: 'Configure Deals' });
  }
  else{
    res.render('loginAdmin', { title: 'Admin Login' }); 
  }
});

router.get('/loadadminejs', function(req, res, next) {
  if(req.session.sysadmin){
    res.render('mainAdminHome', { title: 'Admin Home' });
  }
  else{
    res.render('loginAdmin', { title: 'Admin Login' });
  }    
});

router.get('/counterAdmin', function(req, res, next) {
  if(req.session.data){
    res.render('adminHome', { title: 'Counter Admin Home' });
  }
  else{
    res.render('loginAdmin', { title: 'Admin Login' });
  }
  
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

// broadcast message
router.post('/broadcast', function(req, res, next) {
  var broadCastMessage=req.body['message'];  
  var regTokens = [];

  var customer = Customer.build();
  customer.fetchAllTokenBearers(function(rows){
    for (var i = 0; i < rows.length; i++) {
      regTokens.push(rows[i].registration_token);
    };

    var message = new gcm.Message();
    message.addData('message',broadCastMessage);

    sender.send(message, { registrationTokens : regTokens }, function (err, response) {
        if(err) console.log(err);
        else    console.log(response);
    });

    res.send(200);

    // sender.sendNoRetry(message1, { topic: '/topics/global' }, function (err, response) {
//     if(err) console.error(err);
//     else    console.log(response);
// });
    
  });
});

module.exports = router;