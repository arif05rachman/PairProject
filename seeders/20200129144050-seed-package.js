'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', [{
      type: 'Express',
      price: 10000,
      duration: 1,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      type: 'Instant',
      price: 15000,
      duration: 1,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      type: 'Reguler',
      price: 7000,
      duration: 3,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      type: 'Santuy',
      price: 1000,
      duration: 15,
      createdAt: new Date,
      updatedAt: new Date
    }
  ])
  },
  
  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Packages', null, {});
  }
};
