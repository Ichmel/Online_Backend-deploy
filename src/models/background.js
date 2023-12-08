'use strict';
module.exports = (sequelize, DataTypes) => {
  const background = sequelize.define('background', {
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  background.associate = function(models) {
    // associations can be defined here
  };
  return background;
};