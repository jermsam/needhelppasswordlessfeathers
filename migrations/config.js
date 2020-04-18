/* eslint-disable quotes */
const app = require("../src/app");
const env = process.env.NODE_ENV || "development";
const dialect = "postgres";
const { dbName, dbUser, dbPassword, dbHost ,dbPort} = app.get('postgres');

const target = {
  dialect,
  migrationStorageTableName: '_migrations'
};

const source =  process.env.DATABASE_URL?{
  url: process.env.DATABASE_URL,
}:{
  port:dbPort,
  database:dbName,
  username:dbUser,
  password:dbPassword,
  host:dbHost,
};

const returnedTarget = Object.assign(target, source);
// console.log(returnedTarget);

module.exports = {
  [env]: returnedTarget
};
