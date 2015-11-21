var mysql = require('../routes/mysql');
var sequelize = mysql.getSequelize();
var DataTypes = mysql.getDataTypes();

var Counter_Register = sequelize.define('counter_register',{
	primary_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},	
	name : {type: DataTypes.STRING, allowNull : false},
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
			}
		}
	}
);

Counter_Register.sync();

exports.getModel = function getModel(){
	return Counter_Register;
};