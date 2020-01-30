'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'customer',
      password: 'customer',
      phone_number: '0812345678',
      address: 'Gandaria City',
      email: 'test@test.com',
      createdAt: new Date,
      updatedAt: new Date
    }])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('User', null, {});
  }
};
