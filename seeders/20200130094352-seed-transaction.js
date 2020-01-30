'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserPackages', [
      {
      UserId: 1,
      PackageId: 1,
      weight: 5.2,
      date_order: new Date(),
      date_estimation: null,
      date_pickup: null,
      date_finish: null,
      date_deliver: null,
      date_delivered: null,
      status: 'pending',
      CourierId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }
    ,
    {
      UserId: 1,
      PackageId: 2,
      weight: 6,
      date_order: new Date(),
      date_estimation: null,
      date_pickup: null,
      date_finish: null,
      date_deliver: null,
      date_delivered: null,
      status: 'pending',
      CourierId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      UserId: 1,
      PackageId: 3,
      weight: 3.2,
      date_order: new Date(),
      date_estimation: null,
      date_pickup: null,
      date_finish: null,
      date_deliver: null,
      date_delivered: null,
      status: 'pending',
      CourierId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }
    ,
    {
      UserId: 1,
      PackageId: 4,
      weight: 4,
      date_order: new Date(),
      date_estimation: null,
      date_pickup: null,
      date_finish: null,
      date_deliver: null,
      date_delivered: null,
      status: 'pending',
      CourierId: 2,
      createdAt: new Date,
      updatedAt: new Date
    }
    ,
    {
      UserId: 1,
      PackageId: 3,
      weight: 2,
      date_order: new Date(),
      date_estimation: null,
      date_pickup: null,
      date_finish: null,
      date_deliver: null,
      date_delivered: null,
      status: 'pending',
      CourierId: 2,
      createdAt: new Date,
      updatedAt: new Date
    }
  ])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('UserPackages', null, {});
    }
};
