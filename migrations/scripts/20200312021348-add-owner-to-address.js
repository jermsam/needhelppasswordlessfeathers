'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.describeTable('address').then(attributes => {
      if (!attributes.owner) {
        return queryInterface.addColumn('address', 'owner', {
          type: Sequelize.INTEGER
        });
      }
    });
  },

  down: (queryInterface,  ) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.describeTable('address').then(attributes => {
      if (attributes.owner) {
        return queryInterface.removeColumn('address', 'owner');
      }
    });
  }
};
