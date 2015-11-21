var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Customer = require('../models/customer.js').getModel();

var Order = sequelize.define('order_details',{
	primary_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
	customer_id : {type: DataTypes.INTEGER, references : {model: Customer,key:'primary_id'}, allowNull : false},
	menu_items : {type: DataTypes.STRING, allowNull : false},
	daily_deals_flag : {type: DataTypes.BOOLEAN, allowNull : false},
	amount : {type: DataTypes.DECIMAL(10,2), allowNull : false},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			placeOrder : function(callback){

				var customer_id = this.customer_id;
				var menu_items = this.menu_items;
				var daily_deals_flag = this.daily_deals_flag;
				var amount = this.amount;

				Order.create({customer_id : customer_id, menu_items : menu_items, daily_deals_flag : daily_deals_flag,
				 amount : amount})
				.then(function(docs){
					callback(docs);
				});
			},

			getAllOrders : function(callback){
				var customer_id = this.customer_id;

				Order.find({where : {customer_id : customer_id}})
				.then(function(docs){
					callback(docs);
				});
			}
		}
	}
);

Order.sync();

exports.getModel = function getModel(){
	return Order;
};