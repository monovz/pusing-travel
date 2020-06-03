'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class UserTransaction extends Model{}

  UserTransaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    item_list: DataTypes.STRING,
    start_trip: DataTypes.DATE,
    end_trip: DataTypes.DATE,
    total_price: DataTypes.INTEGER,
    person_quantity: DataTypes.INTEGER,
    transaction_time: DataTypes.DATE
  }, { sequelize });
  UserTransaction.associate = function(models) {
    UserTransaction.belongsTo(models.User, {foreignKey: "UserId", targetKey: "id"})
    UserTransaction.belongsTo(models.Trip, {foreignKey: "ProductId", targetKey: "id"})
  };
  return UserTransaction;
};