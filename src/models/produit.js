'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.STRING,
    chilCategoryId: DataTypes.STRING,
    nomprod: DataTypes.STRING,
    photo: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    ancienprix: DataTypes.INTEGER,
    qty : DataTypes.INTEGER,
    prixF: DataTypes.INTEGER,
    nomF: DataTypes.STRING,
    contactF: DataTypes.INTEGER,
    localF: DataTypes.STRING,
    adresseF: DataTypes.STRING,
    description: DataTypes.STRING,
    engros: DataTypes.STRING
  }, {});
  Produit.associate = function(models) {
    // associations can be defined here

    //donnner le clés
    models.Produit.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
    models.Produit.belongsTo(models.ChildCategory, { foreignKey: 'chilCategoryId' });
    models.Produit.belongsTo(models.category, { foreignKey: 'categoryId' });

    //recevoir le clés
    models.Produit.hasMany(models.productphoto, { foreignKey: 'productId' });
    
    models.Produit.hasMany(models.Cart, { foreignKey: 'productId' });
    
   
  };
  return Produit;
};