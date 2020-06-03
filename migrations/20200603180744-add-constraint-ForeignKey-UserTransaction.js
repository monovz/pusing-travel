'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserTransactions', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_UserId',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    .then(()=>{
      return queryInterface.addConstraint('UserTransactions', {
        fields: ['ProductId'],
        type: 'foreign key',
        name: 'custom_fkey_ProductId',
        references: { //Required field
          table: 'Trips',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return removeConstraint("UserTransactions", "custom_fkey_UserId")
    .then(()=>{
      return removeConstraint("UserTransactions", "custom_fkey_ProductId")
    })
  }
};
