'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      format: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      width: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      height: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      size: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};