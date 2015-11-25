var express = require('express');
var router = express.Router();

var DailDeal_Config = require('../models/daily_deal_config.js').getModel();

router.post('/create',function(req,res,next){
		
	var data ={};
	var deal_name = req.body['deal_name'];
	var deal_conditions = req.body['deal_conditions'];
	var start_date = req.body['start_date'];
	var end_date = req.body['end_date'];
	var deal_image = null;
	var price = parseFloat(req.body['price']);	

	if(typeof(deal_name) != 'undefined' && typeof(deal_conditions) != 'undefined' 
		&& typeof(start_date) != 'undefined' && typeof(end_date) != 'undefined' && typeof(price) != 'undefined'){
		
		var dailDeal = DailDeal_Config.build({deal_name : deal_name, deal_conditions : deal_conditions, 
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
module.exports = router;