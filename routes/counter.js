var express = require('express');
var router = express.Router();

var Counter_Register = require('../models/counter_register.js').getModel();

router.post('/create',function(req,res,next){
		
	var data ={};
	var name = req.body['name'];
	var description = req.body['description'];	

	if(typeof(name) != 'undefined' && typeof(description) != 'undefined'){
		var counter_register = Counter_Register.build({name : name, description : description});

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
module.exports = router;