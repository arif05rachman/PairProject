'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', [{
      id: 1,
      type: 'Express',
      price: 10000,
      duration: 1,
      createdAt: new Date,
      updatedAt: new Date
    }])
  },


  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Packages', null, {});
  }
};
