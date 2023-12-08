'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProduitsGros = sequelize.define('ProduitsGros', {
    categoryId: DataTypes.STRING,
    subCategoryId: DataTypes.STRING,
    chilCategoryId: DataTypes.STRING,
    nomprod: DataTypes.STRING,
    photo: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    prixF: DataTypes.INTEGER,
    nomF: DataTypes.STRING,
    contactF: DataTypes.STRING,
    adresseF: DataTypes.STRING,
    localF: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  ProduitsGros.associate = function(models) {
    // associations can be defined here
    models.ProduitsGros.hasMany(models.productphotogros, { foreignKey: 'productId' });
    models.ProduitsGros.belongsTo(models.category, { foreignKey: 'categoryId' });
    models.ProduitsGros.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
    models.ProduitsGros.belongsTo(models.ChildCategory, { foreignKey: 'chilCategoryId' });
    models.ProduitsGros.hasMany(models.MessageProduit, { foreignKey: 'productId' });
  };
  return ProduitsGros;
};