'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        avatar: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isEmail:true
          },
          unique: {
            args: true,
            msg: 'Email address already in use!'
          }
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: {
            args: true,
            msg: 'Phone number already in use!'
          },
          is:/^\+[1-9]\d{1,14}$/,
        },
        isVerified: { type: Sequelize.BOOLEAN },

        verifyToken: { type: Sequelize.STRING },

        verifyShortToken: { type: Sequelize.STRING },

        verifyExpires: { type: Sequelize.DATE },
        verifyChanges: { type: Sequelize.JSON },
        resetToken: { type: Sequelize.STRING },
        resetShortToken: { type: Sequelize.STRING },
        resetExpires: { type: Sequelize.DATE },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      }, {
        // options
      }
    );
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
