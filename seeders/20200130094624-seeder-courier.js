'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Couriers', [{
      name: 'kurir',
      email: 'kurir@email.com',
      phone_number: "0808080808",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'courier',
      email: 'courier@email.com',
      phone_number: "0808080808",
      createdAt: new Date,
      updatedAt: new Date
    }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Couriers', null, {});
  }
};
