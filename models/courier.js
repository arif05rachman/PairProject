'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Courier extends Model {
    
  }

  Courier.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must be filled"
        }
      }
    },
    phone_number: {
      type:DataTypes.STRING,
      validate: {
          len: {
            args: [7,13],
            msg: 'Phone number input must be 8 - 12 characters'
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Incorrect email format"
        }
      }
    }
  }, { sequelize })

  Courier.associate = function(models) {
    // associations can be defined here
    Courier.hasOne(models.UserPackage)
  };
  return Courier;
};