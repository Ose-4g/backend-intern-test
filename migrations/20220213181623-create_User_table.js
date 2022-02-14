'use strict';
const { DataTypes } = require('sequelize');
const { STRING, INTEGER } = DataTypes;
const { DATE } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('users', {
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
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.dropTable('users');
  },
};
