var express = require('express');
var gcm = require('node-gcm');
var router = express.Router();

var sender = new gcm.Sender('AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI');

var Order = require('../models/order_details.js').getModel();
var Customer = require('../models/customer.js').getModel();

router.get('/viewOrders', function(req, res, next) {
  res.render('viewOrders', { title: 'View Orders',counter:req.session.data.counter });
});

router.post('/create',function(req,res,next){
		
	var data ={};
	var email = req.body['email'];
	var counter_id = parseInt(req.body['counter_id']);
	var daily_deals_flag = (parseInt(req.body['ddf']) == 1)?true:false;
	var menu_items = req.body['menu_items'];
	var amount = parseFloat(req.body['amount']);

	if(typeof(email) != 'undefined' && typeof(daily_deals_flag) != 'undefined' 
		&& typeof(menu_items) != 'undefined' && typeof(amount) != 'undefined' && typeof(counter_id) != 'undefined'){
		var order = Order.build({counter_id : counter_id, daily_deals_flag : daily_deals_flag, 
			menu_items : menu_items, amount : amount});

		order.placeOrder(email, function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Order Processing Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.post('/read',function(req,res,next){
		
	var data ={};
	var email = req.body['email'];

	if(typeof(email) != 'undefined'){
		var order = Order.build();

		order.getMyOrders(email, function (rows){
				if(rows){
					// data.status = '200';
					res.status(200).send(rows);
				}
				else{		 
					res.status(500).send({status:'No Orders Found!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.get('/fetch',function(req,res,next){			

	var counter_id = parseInt(req.session.data[0].counter);	

	var order = Order.build({counter_id : counter_id});

	order.getAllOrders(function(rows){
			if(rows){
				res.status(200).send(rows);
			}
			else{		 
				res.status(500).send({status:'No Orders Found!'});
			}

		});	
	
});

router.put('/approve',function(req,res,next){
		
	var primary_id = parseInt(req.body['primary_id']);	

	if(typeof(primary_id) != 'undefined'){
		var order = Order.build({primary_id : primary_id});

		order.closeOrder(function (rows){
				if(rows){
					
					order.getAOrder(function (findRecord){
						if(findRecord){
							var customer_id = findRecord.customer_id;
							var customer = Customer.build({primary_id : customer_id});

							customer.fetchOnCustomerId(function (record){
								if(record){
									var message = new gcm.Message();
									message.addData('message','Your order is ready');

									var regTokens = [];
									regTokens.push(record.registration_token);
									console.log(regTokens);

									sender.send(message, { registrationTokens : regTokens }, function (err, response) {
									    if(err) console.log(err);
									    else    console.log(response);
									});							
								}
								res.status(200).send({status : 'Order updated successfully'});
							});
						}
						else{
							res.status(200).send({status : 'No such Order'});
						}						
					});										
				}
				else{		 
					res.status(500).send({status:'No Orders Found!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.put('/reject',function(req,res,next){
		
	var primary_id = parseInt(req.body['primary_id']);	

	if(typeof(primary_id) != 'undefined'){
		var order = Order.build({primary_id : primary_id});

		order.rejectOrder(function (rows){
				if(rows){
					// data.status = '200';
					res.status(200).send(rows);
				}
				else{		 
					res.status(500).send({status:'No Orders Found!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

module.exports = router;