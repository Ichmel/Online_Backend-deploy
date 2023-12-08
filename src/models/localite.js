'use strict';
module.exports = (sequelize, DataTypes) => {
  const localite = sequelize.define('localite', {
    ville: DataTypes.STRING,
    local: DataTypes.STRING,
    km: DataTypes.STRING,
    prix: DataTypes.INTEGER
  }, {});
  localite.associate = function(models) {
    // associations can be defined here
  };
  return localite;
};