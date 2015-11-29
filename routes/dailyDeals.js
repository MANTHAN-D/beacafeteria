var express = require('express');
var router = express.Router();

var DailDeal_Config = require('../models/daily_deal_config.js').getModel();

router.get('/addDeals', function(req, res, next) {
  res.render('addDeals', { title: 'Add Deals' });
});

router.post('/create',function(req,res,next){
		
	var data ={};
	var counter_id = parseInt(req.session.data[0].counter); 
	var deal_name = req.body['deal_name'];
	var deal_conditions = req.body['deal_conditions'];
	var start_date = req.body['start_date'];
	var end_date = req.body['end_date'];
	var deal_image = null;
	var price = parseFloat(req.body['price']);	

	if(typeof(counter_id) != 'undefined' && typeof(deal_name) != 'undefined' && typeof(deal_conditions) != 'undefined' 
		&& typeof(start_date) != 'undefined' && typeof(end_date) != 'undefined' && typeof(price) != 'undefined'){
		
		var dailDeal = DailDeal_Config.build({counter_id : counter_id, deal_name : deal_name, deal_conditions : deal_conditions, 
			start_date : start_date, end_date : end_date, deal_image : deal_image, price : price});

		dailDeal.configure(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Daily Deal Configuration Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.get('/fetch',function(req,res,next){
		
	var data ={};	

	
	var dailDeal = DailDeal_Config.build();

	dailDeal.getAllDeals(function(rows){
			if(rows){
				// data.status = '200';
				res.status(200).send(rows);
			}
			else{		 
				res.status(500).send({status:'No Daily Deals Found!'});
			}

		});	
	
});

router.get('/read',function(req,res,next){
		
	var data ={};	
	var counter_id=req.session.data[0].counter;

	var dailDeal = DailDeal_Config.build({counter_id : counter_id});

	dailDeal.getDealsOfCounter(function(rows){
			if(rows){
				// data.status = '200';
				res.send({"results":JSON.stringify(rows)});
			}
			else{		 
				res.status(500).send({status:'No Daily Deals For This Counter!'});
			}

		});	
	
});

router.put('/update',function(req,res,next){
		
	var data ={};
	var counter_id = parseInt(req.body['counter_id']); 
	var deal_name = req.body['deal_name'];
	var deal_conditions = req.body['deal_conditions'];
	var start_date = req.body['start_date'];
	var end_date = req.body['end_date'];
	var deal_image = null;
	var price = parseFloat(req.body['price']);	

	if(typeof(counter_id) != 'undefined' && typeof(deal_name) != 'undefined' && typeof(deal_conditions) != 'undefined' 
		&& typeof(start_date) != 'undefined' && typeof(end_date) != 'undefined' && typeof(price) != 'undefined'){
		
		var dailDeal = DailDeal_Config.build({counter_id : counter_id, deal_name : deal_name, deal_conditions : deal_conditions, 
			start_date : start_date, end_date : end_date, deal_image : deal_image, price : price});

		dailDeal.update(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Daily Deal Updation Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.post('/remove',function(req,res,next){
		
	var data ={};
	var counter_id = parseInt(req.body['counter_id']); 
	var deal_name = req.body['deal_name'];

	if(typeof(counter_id) != 'undefined' && typeof(deal_name) != 'undefined'){
		
		var dailDeal = DailDeal_Config.build({counter_id : counter_id, deal_name : deal_name});

		dailDeal.remove(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Daily Deal Removal Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

module.exports = router;