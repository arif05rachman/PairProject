'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserPackages', [
      {
      id:1,
      UserId = 1,
      PackageId = 1,
      price_total: 60000,
      date_order: new Date(),
      // date_estimation: null,
      // date_pickup: null,
      // date_finish: null,
      // date_deliver: null,
      // date_delivered: null,
      status: 'pending',
      CourierId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }
    // ,
    // {
    //   id: 2,
    //   UserId = 2,
    //   PackageId = 1,
    //   price_total: 30000,
    //   date_order: new Date(),
    //   date_estimation: null,
    //   date_pickup: null,
    //   date_finish: null,
    //   date_deliver: null,
    //   date_delivered: null,
    //   status: 'pending',
    //   CourierId: 2,
    //   createdAt: new Date,
    //   updatedAt: new Date
    // },
    // {
    //   id: 3,
    //   UserId = 1,
    //   PackageId = 3,
    //   price_total: 40000,
    //   date_order: new Date(),
    //   date_estimation: null,
    //   date_pickup: null,
    //   date_finish: null,
    //   date_deliver: null,
    //   date_delivered: null,
    //   status: 'pending',
    //   CourierId: 1,
    //   createdAt: new Date,
    //   updatedAt: new Date
    // }
    // ,
    // {
    //   id: 4,
    //   UserId = 2,
    //   PackageId = 4,
    //   price_total: 70000,
    //   date_order: new Date(),
    //   date_estimation: null,
    //   date_pickup: null,
    //   date_finish: null,
    //   date_deliver: null,
    //   date_delivered: null,
    //   status: 'pending',
    //   CourierId: 2,
    //   createdAt: new Date,
    //   updatedAt: new Date
    // }
    // ,
    // {
    //   id: 5,
    //   UserId = 1,
    //   PackageId = 3,
    //   price_total: 50000,
    //   date_order: new Date(),
    //   date_estimation: null,
    //   date_pickup: null,
    //   date_finish: null,
    //   date_deliver: null,
    //   date_delivered: null,
    //   status: 'pending',
    //   CourierId: 2,
    //   createdAt: new Date,
    //   updatedAt: new Date
    // }
  ])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('UserPackages', null, {});
    }
};
