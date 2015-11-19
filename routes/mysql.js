var mysql = require('mysql');

var connection;

var host;
var user;
var password;
var port;
var database;

exports.getConnection = function getConnection(){
	var connection;
	host = 'sql3.freemysqlhosting.net';
	user = 'sql396984';
	password = 'mR9!iF6!';
	port = 3306; //port mysql
	database ='sql396984';
		
	connection = mysql.createConnection({
		host: host,
        user: user,
        password : password,
        port : port, //port mysql
        database : database,
		multipleStatements: true
	});
	return connection;
};