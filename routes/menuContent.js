var express = require('express');
var router = express.Router();

var Counter_Config = require('../models/counter_config.js').getModel();
var Counter_Register = require('../models/counter_register.js').getModel();

router.post('/create',function(req,res,next){
		
	var data ={};
	var counter_id = parseInt(req.session.data[0].counter);
	var item_name = req.body['item_name'];
	var item_rating = parseFloat(req.body['item_rating']);
	var item_image = null;
	var price = parseFloat(req.body['price']);	

	if(typeof(counter_id) != 'undefined' && typeof(item_name) != 'undefined' 
		&& typeof(item_rating) != 'undefined' && typeof(price) != 'undefined'){
		var counter_config = Counter_Config.build({counter_id : counter_id, item_name : item_name, item_rating : item_rating,
			item_image : item_image, price : price});

		counter_config.configure(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Menu Item creation Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.get('/read', function(req, res, next) {
	
	var counter_id=req.session.data[0].counter;

	var counter_config = Counter_Config.build({counter_id : counter_id});

	counter_config.getMenuList(function(rows){
		if(rows){
			res.send({"results":JSON.stringify(rows)});
		}
		else{
			res.status(401).send({status:'No Menu Items For This Counter!'});
		}
	});	
});


router.get('/read/:counter_name', function(req, res, next) {
	
	var name = req.params.counter_name;

	var counter_register = Counter_Register.build({name: name});

	counter_register.getCounter(function(rows){
		if(rows){
			var counter_id = rows.primary_id;
			var counter_config = Counter_Config.build({counter_id : counter_id});

			counter_config.getMenuList(function(menuRows){
				if(rows){
					res.json(menuRows);
				}
				else{
					res.status(401).send({status:'No Menu Items For This Counter!'});
				}
			});
		}
	});	
});

// router.post('/read',function(req,res,next){
		
// 	var data ={};
// 	var counter_id = parseInt(req.body['counter_id']);

// 	if(typeof(counter_id) != 'undefined'){
// 		var counter_config = Counter_Config.build({counter_id : counter_id});

// 		counter_config.getMenuList(function(rows){
// 				if(rows){
// 					// data.status = '200';
// 					res.status(200).send(rows);
// 				}
// 				else{		 
// 					res.status(500).send({status:'No Menu Items Found!'});
// 				}

// 			});	
// 	}
// 	else{
// 		res.status(500).send({status:'500'});
// 	}	
// });

router.put('/update',function(req,res,next){
		
	var data ={};
	var counter_id = parseInt(req.body['counter_id']);
	var item_name = req.body['item_name'];
	var item_rating = parseFloat(req.body['item_rating']);
	var item_image = null;
	var price = parseFloat(req.body['price']);	

	if(typeof(counter_id) != 'undefined' && typeof(item_name) != 'undefined' 
		&& typeof(item_rating) != 'undefined' && typeof(price) != 'undefined'){
		var counter_config = Counter_Config.build({counter_id : counter_id, item_name : item_name, item_rating : item_rating,
			item_image : item_image, price : price});

		counter_config.update(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Menu Item updation failed!'});
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
	var item_name = req.body['item_name'];	

	if(typeof(counter_id) != 'undefined' && typeof(item_name) != 'undefined'){
		var counter_config = Counter_Config.build({counter_id : counter_id, item_name : item_name});

		counter_config.remove(function(rows){
				if(rows){
					data.status = '200';
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Menu Item removal failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;