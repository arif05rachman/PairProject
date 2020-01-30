'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserPackages', [{
      id:1,
      UserId : 1,
      PackageId : 1,
      weight: 4,
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
      id: 2,
      UserId : 2,
      PackageId : 1,
      weight: 5,
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
      id: 3,
      UserId : 1,
      PackageId : 3,
      weight: 6,
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
      id: 4,
      UserId : 2,
      PackageId : 4,
      weight: 8,
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
      id: 5,
      UserId : 1,
      PackageId : 3,
      weight: 3,
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
