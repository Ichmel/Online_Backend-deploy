'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Commercials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      adresse: {
        type: Sequelize.STRING
      },
      codeBonnus: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      ordernumber: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      custid: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Commercials');
  }
};