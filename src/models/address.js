'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    nomCom: DataTypes.STRING,
    phone: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    custId: DataTypes.INTEGER,
    ville: DataTypes.STRING,
    quartier: DataTypes.STRING,
    dateL: DataTypes.DATE,
    googlemap : DataTypes.STRING,
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    models.Address.belongsTo(models.Order, { foreignKey: 'orderId' });  
    models.Address.hasMany(models.Cart, { foreignKey: 'addressId' });  
    models.Address.belongsTo(models.customer, { foreignKey: 'custId' });      
  };
  return Address;
};