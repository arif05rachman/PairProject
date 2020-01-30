'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = 'customer'
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    password = hash

    return queryInterface.bulkInsert('Users', [{
      name: 'customer',
      password: password,
      phone_number: '080808080',
      address: 'Gandaria City',
      email: 'test@test.com',
      createdAt: new Date,
      updatedAt: new Date
    }])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
