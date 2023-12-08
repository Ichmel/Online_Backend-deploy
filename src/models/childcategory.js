'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildCategory = sequelize.define('ChildCategory', {
    categoryId: DataTypes.INTEGER,
    subCatId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  ChildCategory.associate = function(models) {
    // associations can be defined here
    models.ChildCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
    models.ChildCategory.belongsTo(models.SubCategory, { foreignKey: 'subCatId' });
    models.ChildCategory.hasMany(models.Produit, { foreignKey: 'chilCategoryId' });

    models.ChildCategory.hasMany(models.ProduitsGros, { foreignKey: 'chilCategoryId' });
    
    
  };
  return ChildCategory;
};