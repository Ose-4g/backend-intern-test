const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
const { STRING, INTEGER } = DataTypes;

const User = sequelize.define('users', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: STRING(30),
    unique: true,
    allowNull: false,
  },

  password: {
    type: STRING(100),
    allowNull: false,
  },

  firstName: {
    type: STRING(20),
    allowNull: false,
  },

  lastName: {
    type: STRING(20),
    allowNull: false,
  },

  phoneNumber: {
    type: STRING(15),
    allowNull: false,
  },
});

module.exports = User;
