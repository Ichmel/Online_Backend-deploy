'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MessageProduits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER
      },
      nomprod: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.INTEGER
      },
      nomF: {
        type: Sequelize.STRING
      },
      contactF: {
        type: Sequelize.STRING
      }, 
      localF: {
        type: Sequelize.STRING
      },

      prixF: {
        type: Sequelize.INTEGER
      },
      email: {
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
    return queryInterface.dropTable('MessageProduits');
  }
};