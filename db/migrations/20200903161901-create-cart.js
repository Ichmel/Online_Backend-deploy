'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      addressId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      taille: {
        type: Sequelize.STRING
      },
      couleur: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      adresseF: {
        type: Sequelize.STRING
      },
      nomF: {
        type: Sequelize.STRING
      },
      contactF: {
        type: Sequelize.STRING
      },
      prixF: {
        type: Sequelize.INTEGER
      },
      
    localF: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Carts');
  }
};