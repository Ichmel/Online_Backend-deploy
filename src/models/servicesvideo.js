'use strict';
module.exports = (sequelize, DataTypes) => {
  const servicesvideo = sequelize.define('servicesvideo', {
    titrevideo: DataTypes.STRING,
    textvideo: DataTypes.STRING,
    video: DataTypes.STRING
  }, {});
  servicesvideo.associate = function(models) {
    // associations can be defined here
  };
  return servicesvideo;
};