'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      custId: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      Reduction: {
        type: Sequelize.STRING
      },
      express: {
        type: Sequelize.STRING
      },
      custEmail: {
        type: Sequelize.STRING
      },
      paymentmethod: {
        type: Sequelize.STRING
      },
    TotalCart : {
        type: Sequelize.INTEGER
      },
      TotalLivraison : {
        type: Sequelize.INTEGER
      },
      GrandTotal: {
        type: Sequelize.INTEGER
      },
      TotalLivRed: {
        type: Sequelize.INTEGER
      },
      TotalReduction:  {
        type: Sequelize.INTEGER
      },
      codeBonnus : {
        type: Sequelize.STRING
      },
      localite: {
        type: Sequelize.STRING
      },
      commission: {
        type: Sequelize.ENUM('nonpaye','paye'),
				defaultValue: 'nonpaye'
      },
      prixlocalite : {
        type: Sequelize.STRING
      },
      km: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Traitement','Livraison','Livre','Annuler'),
				defaultValue: 'Traitement'
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
    return queryInterface.dropTable('Orders');
  }
};