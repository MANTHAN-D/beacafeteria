var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Customer = require('../models/customer.js').getModel();
var Counter_Register = require('../models/counter_register.js').getModel();

var Order = sequelize.define('order_details',{
	primary_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
	customer_id : {type: DataTypes.INTEGER, references : {model: Customer,key:'primary_id'}, allowNull : false},
	counter_id : {type: DataTypes.INTEGER, references : {model: Counter_Register,key:'primary_id'}, allowNull : false},
	menu_items : {type: DataTypes.STRING, allowNull : false},
	daily_deals_flag : {type: DataTypes.BOOLEAN, allowNull : false},
	amount : {type: DataTypes.DECIMAL(10,2), allowNull : false},
	order_status : {type: DataTypes.INTEGER, allowNull : false, defaultValue : 1},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			placeOrder : function(email,callback){

				var counter_id = this.counter_id;
				var menu_items = this.menu_items;
				var daily_deals_flag = this.daily_deals_flag;
				var amount = this.amount;

				Customer.findOne({where : {email : email}})
				.then(function(docs){
					if(docs){
						var customer_id = docs.primary_id;					

						Order.create({counter_id : counter_id, customer_id : customer_id, menu_items : menu_items, daily_deals_flag : daily_deals_flag,
						 amount : amount})
						.then(function(docs){
							callback(docs);
						});	
					}
					else{
						callback(docs);
					}
					
				});			
			},

			getMyOrders : function(email,callback){				


				Customer.findOne({where : {email : email}})
				.then(function(docs){
					
					if(docs){
						var customer_id = docs.primary_id;		
						
						// Order.find({where : {customer_id : customer_id}})
						// .then(function(docs){
						// 	callback(docs);
						// });
						sequelize.query("SELECT `cr`.name, `od`.menu_items, `od`.amount, `od`.order_status, `od`.created_at FROM order_details od, counter_register cr WHERE od.counter_id = cr.primary_id and od.customer_id = "+customer_id, 
							{ type: sequelize.QueryTypes.SELECT })
						.then(function(docs){
							callback(docs);
						});		
					}
					else{
						callback(docs);
					}
					
				});								
			},

			closeOrder : function(callback){
				var primary_id = this.primary_id;

				Order.update({order_status : 0}, {where : {primary_id : primary_id}})
				.then(function(docs){								
					callback(docs);
				});
			},

			rejectOrder : function(callback){
				var primary_id = this.primary_id;

				Order.update({order_status : 2}, {where : {primary_id : primary_id}})
				.then(function(docs){					
					callback(docs);
				});
			},

			getAllOrders : function(callback){
				
				var counter_id = this.counter_id;
				sequelize.query("SELECT `od`.*, `cd`.name FROM order_details od, customer_details cd WHERE od.customer_id = cd.primary_id and od.counter_id = "+counter_id, 
					{ type: sequelize.QueryTypes.SELECT })
				.then(function(docs){
					callback(docs);
				});
			},

			getAOrder : function(callback){
				var primary_id = this.primary_id;

				Order.findOne({where : {primary_id : primary_id}})
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