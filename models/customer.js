var mysql = require('../routes/mysql');
var crypto = require('crypto');
var salt = "!@272MySeCrEtSALTsTrInG!@272";

var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Counter_Register = require('../models/counter_register.js').getModel();

var Customer = sequelize.define('customer_details',{
	primary_id : {type: DataTypes.INTEGER,primaryKey: true, autoIncrement : true},
	counter_id : {type: DataTypes.INTEGER, references : {model: Counter_Register,key:'primary_id'}},
	name : {type: DataTypes.STRING, allowNull : false},
	email : {type: DataTypes.STRING, allowNull : false},
	phone : {type: DataTypes.BIGINT(10), allowNull : false},
	password : {type: DataTypes.STRING, allowNull : false},
	is_admin : {type: DataTypes.BOOLEAN},
	registration_token : {type: DataTypes.STRING},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			register : function(callback){
				var name = this.name;
				var email = this.email;
				var phone = this.phone;
				var password = crypto.createHash('sha512').update(salt + this.password + salt).digest("hex");
				var is_admin = this.is_admin;

				Customer.create({name : name, email : email, phone : phone, password : password, is_admin : is_admin})
				.then(function(docs){
					callback(docs);
				});
			},			

			validate : function(email,password,callback){
				
				var encryptedPassword = crypto.createHash('sha512').update(salt + password + salt).digest("hex");

				Customer.findOne({where : {email : email, password : encryptedPassword}})
				.then(function(docs){					
					callback(docs);
				});
			},

			fetchOnCustomerId : function(callback){
				var primary_id = this.primary_id;

				Customer.findOne({where : {primary_id : primary_id}})
				.then(function(docs){					
					callback(docs);
				});
			},

			fetchOnCounterId : function(callback){
				var counter_id = this.counter_id;

				Customer.find({where : {counter_id : counter_id}})
				.then(function(docs){					
					callback(docs);
				});
			},

			fetchOnEmailId : function(callback){
				var email = this.email;

				Customer.findOne({where : {email : email}})
				.then(function(docs){					
					callback(docs);
				});
			},

			fetchNotYetAdmin : function(callback){				

				Customer.findAll({where : {is_admin : 0}})
				.then(function(docs){					
					callback(docs);
				});
			},

			approveAdminForCounter : function(callback){				
				var primary_id = this.primary_id;
				var counter_id = this.counter_id;

				Customer.update({is_admin : 1, counter_id : counter_id}, {where : {primary_id : primary_id}})
				.then(function(docs){					
					callback(docs);
				});
			},

			removeCustomer : function(callback){				
				var primary_id = this.primary_id;

				Customer.destroy({where : {primary_id : primary_id}})
				.then(function(docs){					
					callback(docs);
				});
			},

			addRegistrationToken : function(callback){
				var email = this.email;
				var registration_token = this.registration_token;

				Customer.update({registration_token : registration_token}, {where : {email : email}})
				.then(function(docs){					
					callback(docs);
				});

			},

			fetchAllTokenBearers : function(callback){				

				Customer.findAll({where : {registration_token : {$ne : null}}})
				.then(function(docs){					
					callback(docs);
				});
			}


		}
	}
);

Customer.sync();

exports.getModel = function getModel(){
	return Customer;
};