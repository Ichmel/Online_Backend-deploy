'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageAdmin = sequelize.define('MessageAdmin', {
    message: DataTypes.STRING,
    custid: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  MessageAdmin.associate = function(models) {
    // associations can be defined here
    
  };
  return MessageAdmin;
};