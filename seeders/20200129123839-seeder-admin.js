'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = 'admin'
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    password = hash

   return queryInterface.bulkInsert('Admins', [{
     name: 'admin',
     password: password,
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
