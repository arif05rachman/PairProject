'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {
    
  }

  User.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.UserPackage)
    User.belongsToMany(models.Package, { through: models.UserPackage })
  };
  return User;
};