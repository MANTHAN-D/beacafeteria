var express = require('express');
var router = express.Router();

var mysql = require('./mysql');

router.post('/',function(req,res,next){
		
	var data ={};
	var uname = req.body['uname'];
	var pass = req.body['pass'];

	if(typeof(uname) != 'undefined' && typeof(pass) != 'undefined'){
		var connection = mysql.getConnection();
		if(connection != null){
				connection.query('SELECT * FROM customer_details cd WHERE cd.email = ? AND cd.password = ?',[uname,pass],
					function(err,rows){
						if(err)
							console.log('Error Selecting : %s ',err);
						if(rows.length == 1){
							data.status = '200';
							res.json(data);			
						}
						else{		
							res.status(500).send({status:'Invalid Login credentials'});
						}

					});
		}
	}
	else{
		res.status(500).send({status:'500'});
	}	
});
module.exports = router;