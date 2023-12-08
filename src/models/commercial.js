'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commercial = sequelize.define('Commercial', {
    nom: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    adresse: DataTypes.STRING,
    codeBonnus: DataTypes.STRING,
    password: DataTypes.STRING,
    ordernumber: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    custid: DataTypes.INTEGER
  }, {});
  Commercial.associate = function(models) {
    // associations can be defined here

    models.Commercial.hasMany(models.Order, { foreignKey: 'codeBonnus' });
  };
  return Commercial;
};