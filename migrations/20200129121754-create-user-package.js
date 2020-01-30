'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      PackageId: {
        type: Sequelize.INTEGER
      },
      price_total: {
        type: Sequelize.INTEGER
      },
      date_order: {
        type: Sequelize.DATE
      },
      date_estimation: {
        type: Sequelize.DATE
      },
      date_pickup: {
        type: Sequelize.DATE
      },
      date_finish: {
        type: Sequelize.DATE
      },
      date_deliver: {
        type: Sequelize.DATE
      },
      date_delivered: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      CourierId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPackages');
  }
};