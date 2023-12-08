'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  SubCategory.associate = function(models) {
    // associations can be defined here
    models.SubCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
    models.SubCategory.hasMany(models.ChildCategory, { foreignKey: 'subCatId' });
    models.SubCategory.hasMany(models.Produit, { foreignKey: 'subCategoryId' });
    models.SubCategory.hasMany(models.ProduitsGros, { foreignKey: 'subCategoryId' });

  };
  return SubCategory;
};