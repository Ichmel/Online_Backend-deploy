'use strict';
module.exports = (sequelize, DataTypes) => {
  const productphotogros = sequelize.define('productphotogros', {
    productId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    couleur: DataTypes.STRING,
    taille: DataTypes.STRING
  }, {});
  productphotogros.associate = function(models) {
    // associations can be defined here
    models.productphotogros.belongsTo(models.ProduitsGros, { foreignKey: 'productId' });

  };
  return productphotogros;
};