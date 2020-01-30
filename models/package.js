'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Package extends Model {
  }

  Package.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Type must be filled"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isDecimal: {
          msg: "Input number on Price"
        }
      }
    },
    duration: {
      type: DataTypes.DECIMAL(10,2),
      validate: {
        isNumeric: {
          msg: "Input number on Duration"
        }
      }
    }
  }, { sequelize })

  Package.associate = function(models) {
    // associations can be defined here
    Package.hasMany(models.UserPackage)
    Package.belongsToMany(models.User, { through: models.UserPackage })
  };
  return Package;
};