'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageCustomer = sequelize.define('MessageCustomer', {
    message: DataTypes.STRING,
    custid: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  MessageCustomer.associate = function(models) {
    // associations can be defined here
  
  };
  return MessageCustomer;
};