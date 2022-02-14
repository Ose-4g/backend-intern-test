const { Sequelize } = require('sequelize');

const { username, password, database, dialect, host } = require('../config/config').development;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

module.exports = sequelize;
