'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Users',
          key:'id'
        }
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      RoleId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Roles',
          key:'id'
        }
      },
      password: {
        type: Sequelize.STRING
      },
      blocked:{
        type:Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAccounts');
  }
};