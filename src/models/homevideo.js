'use strict';
module.exports = (sequelize, DataTypes) => {
  const homevideo = sequelize.define('homevideo', {
    titre: DataTypes.STRING,
    text: DataTypes.STRING,
    video: DataTypes.STRING
  }, {});
  homevideo.associate = function(models) {
    // associations can be defined here
  };
  return homevideo;
};