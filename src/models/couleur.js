'use strict';
module.exports = (sequelize, DataTypes) => {
  const Couleur = sequelize.define('Couleur', {
    color: DataTypes.STRING
  }, {});
  Couleur.associate = function(models) {
    // associations can be defined here
  };
  return Couleur;

};