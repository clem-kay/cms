'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
      id: 1,
      roleName: 'SuperAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      roleName: 'ChurchAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      roleName: 'ChurchMember',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};