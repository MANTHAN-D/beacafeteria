var express = require('express');
var router = express.Router();

var Order = require('../models/order_details.js').getModel();

router.post('/create',function(req,res,next){
		
	var data ={};
	var customer_id = parseInt(req.body['customer_id']);
	var daily_deals_flag = (parseInt(req.body['ddf']) == 1)?true:false;
	var menu_items = req.body['menu_items'];
	var amount = parseFloat(req.body['amount']);

	if(typeof(customer_id) != 'undefined' && typeof(daily_deals_flag) != 'undefined' 
		&& typeof(menu_items) != 'undefined' && typeof(amount) != 'undefined'){
		var order = Order.build({customer_id : customer_id, daily_deals_flag : daily_deals_flag, 
			menu_items : menu_items, amount : amount});

		order.placeOrder(function(rows){
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
	var customer_id = parseInt(req.body['customer_id']);	

	if(typeof(customer_id) != 'undefined'){
		var order = Order.build({customer_id : customer_id});

		order.getAllOrders(function(rows){
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