'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SiteMaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      last_modified: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      changefreq: {
        allowNull: false,
        type: Sequelize.ENUM(
          'always',
          'hourly',
          'daily',
          'weekly',
          'monthly',
          'yearly',
          'never'
        )
      },
      priority: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.5,
        validate: {
          min: 0.0,
          max: 1.0
        }
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
    await queryInterface.dropTable('SiteMaps');
  }
};