'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'test',
      password: 'test',
      phone_number: '0812345678',
      address: 'fakeaddress',
      email: 'test@test.com',
      createdAt: new Date,
      updatedAt: new Date
    }])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('User', null, {});
  }
};
