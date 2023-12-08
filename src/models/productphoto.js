'use strict';
module.exports = (sequelize, DataTypes) => {
  const productphoto = sequelize.define('productphoto', {
    productId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    couleur: DataTypes.STRING,
    taille: DataTypes.STRING,
  }, {});
  productphoto.associate = function(models) {
    // associations can be defined here
    models.productphoto.belongsTo(models.Produit, { foreignKey: 'productId' });
   
  };
  return productphoto;
};