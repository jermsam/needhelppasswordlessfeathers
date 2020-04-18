const Sequelize = require('sequelize');

module.exports = function (app) {
// Option 1: Passing parameters separately
  let sequelize =null;
  const { dbName, dbUser, dbPassword, dbHost ,dbPort} = app.get('postgres');
  // checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
  if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres'
    });
  }else{

    sequelize=new Sequelize(dbName, dbUser, dbPassword, {
      port:dbPort,
      host: dbHost,
      logging:false,
      dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });

  }
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
};
