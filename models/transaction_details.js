var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Customer = require('../models/customer.js').getModel();
var Order = require('../models/order_details.js').getModel();

var Transaction = sequelize.define('transaction_details',{
	primary_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
	customer_id : {type: DataTypes.INTEGER, references : {model: Customer,key:'primary_id'}, allowNull : false},
	order_id : {type: DataTypes.INTEGER, references : {model: Order,key:'primary_id'}, allowNull : false},
	success_flag : {type: DataTypes.BOOLEAN},
	amount : {type: DataTypes.DECIMAL(10,2), allowNull : false},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			makeTransaction : function(callback){
				var customer_id = this.customer_id;
				var order_id = this.order_id;
				var success_flag = this.success_flag;
				var amount = this.amount;

				Transaction.create({customer_id : customer_id, order_id : order_id,
				 success_flag : success_flag, amount : amount})
				.then(function(docs){
					callback(docs);
				});
			},
			getTransactions : function(callback){
				var customer_id = this.customer_id;

				Transaction.find({where : {customer_id : customer_id}})
				.then(function(docs){					
					callback(docs);
				});
			}
		}
	}
);

Transaction.sync();

exports.getModel = function getModel(){
	return Transaction;
};