var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Counter_Register = sequelize.define('counter_register',{
	primary_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},	
	name : {type: DataTypes.STRING, allowNull : false, unique : true},
	description : {type: DataTypes.STRING},
	created_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW},
	updated_at : {type: DataTypes.DATE, allowNull : false, defaultValue : DataTypes.NOW}
},	{
		timestamps : false,
		freezeTableName: true,
		instanceMethods : {
			register : function(callback){
				var name = this.name;
				var description = this.description;

				Counter_Register.create({name : name, description : description})
				.then(function(docs){
					callback(docs);
				});
			},

			getCounterList : function(callback){
				
				Counter_Register.findAll()
				.then(function(docs){
					callback(docs);
				});
			},

			getCounter : function(callback){
				
				var name = this.name;
				Counter_Register.find({where : {name : name}})
				.then(function(docs){
					callback(docs);
				});
			},

			update : function(callback){
				
				var primary_id = this.primary_id;
				var name = this.name;
				var description = this.description;

				Counter_Register.update({name : name, description : description},{where : {primary_id : primary_id}})
				.then(function(docs){
					callback(docs);
				});
			},

			remove : function(callback){
				
				var primary_id = this.primary_id;				

				Counter_Register.destroy({where : {primary_id : primary_id}})
				.then(function(docs){
					callback(docs);
				});
			},

			getOutletList : function(callback){
				
				Counter_Register.findAll({attributes : ['name','description']})
				.then(function(docs){
					callback(docs);
				});
			}			
		}
	}
);

Counter_Register.sync();

exports.getModel = function getModel(){
	return Counter_Register;
};