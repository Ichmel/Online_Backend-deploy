'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageProduit = sequelize.define('MessageProduit', {
    photo: DataTypes.STRING,
    nomprod: DataTypes.STRING,
    email: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    nomF: DataTypes.STRING,
    prixF: DataTypes.INTEGER,
    contactF: DataTypes.STRING,
    localF: DataTypes.STRING,
   
  }, {});
  MessageProduit.associate = function(models) {
    // associations can be defined here
   
  };
  return MessageProduit;
};