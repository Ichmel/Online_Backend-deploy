'use strict';
module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define('Title', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    desc: DataTypes.STRING,
    titre: DataTypes.STRING
  }, {});
  Title.associate = function(models) {
    // associations can be defined here
  };
  return Title;
};