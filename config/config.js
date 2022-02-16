require('dotenv').config();
module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },

  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
