'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProduitsGros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.STRING
      },
      subCategoryId: {
        type: Sequelize.STRING
      },
      chilCategoryId: {
        type: Sequelize.STRING
      },
      nomprod: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      prixF: {
        type: Sequelize.INTEGER
      },
      nomF: {
        type: Sequelize.STRING
      },
      contactF: {
        type: Sequelize.STRING
      },
      adresseF: {
        type: Sequelize.STRING
      },
      localF: {
        type: Sequelize.STRING
      },
      description: {
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
    return queryInterface.dropTable('ProduitsGros');
  }
};