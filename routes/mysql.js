var mysql = require('mysql');
var Sequelize = require('sequelize');

var connection;

var host;
var user;
var password;
var port;
var database;

exports.getSequelize = function getSequelize(){
	var sequelize;
	host = 'sql3.freemysqlhosting.net';
	user = 'sql397810';
	password = 'uQ9!kF2%';
	port = 3306; //port mysql
	database ='sql397810';
		
	sequelize = new Sequelize(database,user,password,{
		host: host,        
        port : port, //port mysql
		dialect : 'mysql'        
	});
	return sequelize;
};

// exports.getConnection = function getConnection(){
// 	var connection;
// 	host = 'sql3.freemysqlhosting.net';
// 	user = 'sql396984';
// 	password = 'mR9!iF6!';
// 	port = 3306; //port mysql
// 	database ='sql396984';
		
// 	connection = mysql.createConnection({
// 		host: host,
//         user: user,
//         password : password,
//         port : port, //port mysql
//         database : database,
// 		multipleStatements: true
// 	});
// 	return connection;
// };

// exports.getSequelize = function getSequelize(){
// 	var sequelize;
// 	host = 'localhost';
// 	user = 'root';
// 	password = 'helloMysql@123';
// 	port = 3306; //port mysql
// 	database ='beecafeteria';
		
// 	sequelize = new Sequelize(database,user,password,{
// 		host: host,        
//         port : port, //port mysql 
//         dialect : 'mysql'
// 	});
// 	return sequelize;
// };

exports.getDataTypes = function getDataTypes(){	
	return Sequelize;
};