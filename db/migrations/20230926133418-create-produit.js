'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Produits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
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
      ancienprix: {
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
      adresseF: {
        type: Sequelize.STRING
      },
      contactF: {
        type: Sequelize.INTEGER
      },
      localF: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      engros: {
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
    return queryInterface.dropTable('Produits');
  }
};