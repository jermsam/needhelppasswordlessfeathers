// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');


module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
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
      validate: {
        isEmail:{
          args: true,
          msg: 'Invalid Email!'
        }
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
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasOne(models.address);
  };

  return users;
};
