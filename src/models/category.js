'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    models.category.hasMany(models.SubCategory, { foreignKey: 'categoryId' });
    models.category.hasMany(models.ChildCategory, { foreignKey: 'categoryId' });
    models.category.hasMany(models.Produit, { foreignKey: 'categoryId' });

    models.category.hasMany(models.ProduitsGros, { foreignKey: 'categoryId' });
  };
  return category;
};
