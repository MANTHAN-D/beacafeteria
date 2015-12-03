var express = require('express');
var router = express.Router();

var Counter_Register = require('../models/counter_register.js').getModel();

router.post('/create',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var description = req.body['description'];	
	var rating = parseInt(req.body['rating']);

	if(typeof(name) != 'undefined' && typeof(description) != 'undefined' && typeof(rating) != 'undefined'){
		var counter_register = Counter_Register.build({name : name, description : description, rating : rating});

		counter_register.register(function(rows){
				if(rows){
					data.statusCode = 200;
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Counter registration Failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.get('/read',function(req,res,next){
		
	var data ={};		
	
	var counter_register = Counter_Register.build();

	counter_register.getCounterList(function(rows){
			if(rows){
				// data.status = '200';
				res.status(200).send(rows);
			}
			else{		 
				res.status(500).send({status:'No Counters Found!'});
			}

		});			
});

router.get('/fetch',function(req,res,next){
		
	var data ={};		
	
	var counter_register = Counter_Register.build();

	counter_register.getOutletList(function(rows){
			if(rows){
				// data.status = '200';
				res.status(200).send(rows);
			}
			else{		 
				res.status(500).send({status:'No Counters Found!'});
			}

		});			
});

router.get('/read/:name',function(req,res,next){
		
	var data ={};		
	var name = req.params.name;
	var counter_register = Counter_Register.build({name : name});

	counter_register.getCounter(function(rows){
			if(rows){
				// data.status = '200';
				res.status(200).send(rows);
			}
			else{		 
				res.status(500).send({status:'No such counter exists!'});
			}

		});			
});

router.put('/update',function(req,res,next){
		
	var data ={};
	var primary_id = req.body['primary_id'];
	var name = req.body['name'];
	var description = req.body['description'];
	var rating = parseInt(req.body['rating']);

	if(typeof(name) != 'undefined' && typeof(description) != 'undefined' 
		&& typeof(primary_id) != 'undefined' && typeof(rating) != 'undefined'){
		var counter_register = Counter_Register.build({primary_id : primary_id, name : name, description : description, rating : rating});

		counter_register.update(function(rows){
				if(rows){
					data.statusCode = 200;
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Counter updation failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});

router.post('/remove',function(req,res,next){
		
	var data ={};
	var primary_id = req.body['primary_id'];	

	if(typeof(primary_id) != 'undefined'){
		var counter_register = Counter_Register.build({primary_id : primary_id});

		counter_register.remove(function(rows){
				if(rows){
					data.statusCode = 200;
					res.json(data);
				}
				else{		 
					res.status(500).send({status:'Counter removal failed!'});
				}

			});	
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;