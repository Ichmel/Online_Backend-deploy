'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomCom: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      ville: {
        type: Sequelize.STRING
      },
      quartier: {
        type: Sequelize.STRING
      },
      googlemap: {
        type: Sequelize.STRING
      },
      dateL: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Addresses');
  }
};