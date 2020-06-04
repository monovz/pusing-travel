'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model;
  
  class User extends Model{}

  User.init({
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Username Harus di isi'
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM(["admin","user"]),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    address: DataTypes.TEXT
  }, { sequelize });
  User.addHook('beforeCreate',(user,options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user,password = hash
  })
  User.associate = function(models) {
    User.belongsToMany(models.Trip, {through: "UserTransactions"})
  };
  return User;
};