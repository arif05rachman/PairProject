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
    },
    {
      id: 2,
      type: 'Instant',
      price: 15000,
      duration: 1,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      id: 3,
      type: 'Reguler',
      price: 7000,
      duration: 3,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      id: 4,
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
