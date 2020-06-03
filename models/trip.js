'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Trip extends Model{}

  Trip.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    location: DataTypes.STRING,
    availability: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  }, { sequelize });
  Trip.associate = function(models) {
    Trip.belongsToMany(models.User, {through: "UserTransactions"})
  };
  return Trip;
};