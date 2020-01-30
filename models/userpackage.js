'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class UserPackage extends Model {
    
  }

  UserPackage.init({
    UserId: DataTypes.INTEGER,
    PackageId: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    price_total: DataTypes.INTEGER,
    date_order: DataTypes.DATE,
    date_estimation: DataTypes.DATE,
    date_pickup: DataTypes.DATE,
    date_finish: DataTypes.DATE,
    date_deliver: DataTypes.DATE,
    date_delivered: DataTypes.DATE,
    status: DataTypes.STRING,
    CourierId: DataTypes.INTEGER
  }, { sequelize })

  UserPackage.associate = function(models) {
    // associations can be defined here
    UserPackage.belongsTo(models.User)
    UserPackage.belongsTo(models.Package)
    UserPackage.belongsTo(models.Courier)
  };
  return UserPackage;
};