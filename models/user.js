'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model;
  
  class User extends Model{
    getFullName(){
      return `${this.first_name} ${this.last_name}`
    }
  }

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
    user.password = hash
    user.role = "user"
    if(!user.last_name){
        user.last_name = user.first_name
    }
    
  })
  User.associate = function(models) {
    User.belongsToMany(models.Trip, {through: "UserTransactions"})
  };
  return User;
};