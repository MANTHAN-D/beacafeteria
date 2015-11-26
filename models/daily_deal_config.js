var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Counter_Register = require('../models/counter_register.js').getModel();

var DailDeal_Config = sequelize.define('daily_deals_configuration',{
	primary_id : {type: DataTypes.INTEGER,primaryKey: true, autoIncrement : true},
	counter_id : {type: DataTypes.INTEGER, references : {model: Counter_Register,key:'primary_id'}},
	deal_name : {type: DataTypes.STRING, allowNull : false},
	deal_conditions : {type: DataTypes.STRING},
	start_date : {type: DataTypes.DATE, allowNull : false},
	end_date : {type: DataTypes.DATE, allowNull : false},
	deal_image : {type: DataTypes.BLOB},
	price : {type: DataTypes.DECIMAL(10,2), allowNull : false},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			configure : function(callback){
				var counter_id = this.counter_id;
				var deal_name = this.deal_name;
				var deal_conditions = this.deal_conditions;
				var start_date = this.start_date;
				var end_date = this.end_date;
				var deal_image = this.deal_image;
				var price = this.price;

				DailDeal_Config.create({counter_id : counter_id, deal_name : deal_name, deal_conditions : deal_conditions,
				 start_date : start_date,end_date : end_date, deal_image : deal_image,price : price})
				.then(function(docs){
					callback(docs);
				});
			},
			getAllDeals : function(callback){				

				DailDeal_Config.findAll({attributes : ['counter_id', 'deal_name', 'deal_conditions', 'start_date', 'end_date', 'price']})
				.then(function(docs){
					callback(docs);
				});
			},

			getDealsOfCounter : function(callback){				

				var counter_id = this.counter_id;

				DailDeal_Config.findAll({where : {counter_id : counter_id}})
				.then(function(docs){
					callback(docs);
				});
			},

			update : function(callback){
				var counter_id = this.counter_id;
				var deal_name = this.deal_name;
				var deal_conditions = this.deal_conditions;
				var start_date = this.start_date;
				var end_date = this.end_date;
				var deal_image = this.deal_image;
				var price = this.price;

				DailDeal_Config.update({deal_conditions : deal_conditions, start_date : start_date, end_date : end_date, 
					deal_image : deal_image,price : price}, {where : {counter_id : counter_id, deal_name : deal_name}})
				.then(function(docs){
					callback(docs);
				});
			},

			remove : function(callback){
				var counter_id = this.counter_id;
				var deal_name = this.deal_name;				

				DailDeal_Config.destroy({where : {counter_id : counter_id, deal_name : deal_name}})
				.then(function(docs){
					callback(docs);
				});
			}			
		}
	}
);

DailDeal_Config.sync();

exports.getModel = function getModel(){
	return DailDeal_Config;
};