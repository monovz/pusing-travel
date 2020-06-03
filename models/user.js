'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelizel
  const Model = Sequelize.Model;
  
  class User extends Model{}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(["admin","user"]),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    address: DataTypes.TEXT
  }, { sequelize });
  User.associate = function(models) {
    User.belongsToMany(models.Trip, {through: "UserTransactions"})
  };
  return User;
};