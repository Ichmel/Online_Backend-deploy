'use strict';
module.exports = (sequelize, DataTypes) => {
  const services = sequelize.define('services', {
    titre: DataTypes.STRING,
    text: DataTypes.STRING,
    video: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  services.associate = function(models) {
    // associations can be defined here
  };
  return services;
};