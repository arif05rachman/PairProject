'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Admins', [{
     name: 'admin',
     password: 'admin',
     phone_number: '0812345678',
     email: 'dipndry2020@gmail.com',
     createdAt: new Date,
     updatedAt: new Date
   }])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Admins', null, {});
  }
};
