'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    custId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    Reduction: DataTypes.INTEGER,
    paymentmethod: DataTypes.STRING,
    deliverydate: DataTypes.DATE,
    TotalCart: DataTypes.INTEGER,
    TotalLivraison: DataTypes.INTEGER,
    GrandTotal: DataTypes.INTEGER,
    TotalLivRed: DataTypes.INTEGER,
    TotalReduction :DataTypes.INTEGER,
    codeBonnus: DataTypes.STRING,
    commission: DataTypes.ENUM('nonpaye','paye'),
    localite: DataTypes.STRING,
    prixlocalite: DataTypes.STRING,
    km : DataTypes.STRING,
    express : DataTypes.STRING,
    custEmail : DataTypes.STRING,
    status: DataTypes.ENUM('Traitement','Livraison','Livre','Annuler'),
  }, {});

  Order.associate = function(models) {
    // associations can be defined here
    models.Order.hasMany(models.Address, { foreignKey: 'orderId' });
    models.Order.hasMany(models.Cart, { foreignKey: 'orderId' });
    models.Order.belongsTo(models.customer, { foreignKey: 'custId' }); 

    models.Order.belongsTo(models.Commercial, { foreignKey: 'codeBonnus' });

  };
  return Order;
};