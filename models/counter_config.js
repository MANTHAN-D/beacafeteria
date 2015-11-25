var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Counter_Register = require('../models/counter_register.js').getModel();

var Counter_Config = sequelize.define('counter_configuration',{
	primary_id : {type: DataTypes.INTEGER,primaryKey: true, autoIncrement : true},
	counter_id : {type: DataTypes.INTEGER, references : {model: Counter_Register,key:'primary_id'}},
	item_name : {type: DataTypes.STRING, allowNull : false},
	item_image : {type: DataTypes.BLOB},
	item_rating : {type: DataTypes.DECIMAL(10,2)},
	price : {type: DataTypes.DECIMAL(10,2), allowNull : false},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			configure : function(callback){
				var counter_id = this.counter_id;
				var item_name = this.item_name;
				var item_image = this.item_image;				
				var item_rating = this.item_rating;
				var price = this.price;

				Counter_Config.create({counter_id : counter_id, item_name : item_name, item_image : item_image,
				 item_rating : item_rating,price : price})
				.then(function(docs){
					callback(docs);
				});
			},

			getMenuList : function(callback){
				var counter_id = this.counter_id;

				Counter_Config.findAll({where : {counter_id : counter_id}})
				.then(function(docs){
					callback(docs);
				});
			},

			remove : function(callback){
				var counter_id = this.counter_id;
				var item_name = this.item_name;

				Counter_Config.destroy({where : {counter_id : counter_id, item_name : item_name}})
				.then(function(docs){
					callback(docs);
				});
			},

			update : function(callback){
				var counter_id = this.counter_id;
				var item_name = this.item_name;
				var item_image = this.item_image;				
				var item_rating = this.item_rating;
				var price = this.price;

				Counter_Config.update({price : price, item_rating : item_rating, item_image : item_image},
					{where : {counter_id : counter_id, item_name : item_name}})
				.then(function(docs){
					callback(docs);
				});
			}			
		}
	}
);

Counter_Config.sync();

exports.getModel = function getModel(){
	return Counter_Config;
};