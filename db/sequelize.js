const { Sequelize } = require('sequelize');
const config = require('../config/config')

const { username, password, database, dialect, host } = process.env.NODE_ENV==='test' ?  config.test: config.development;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging:false
});
module.exports = sequelize;
