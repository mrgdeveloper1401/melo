'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      jobs: {
        type: Sequelize.ARRAY,
        allowNull: true
      },
      scat: {
        type: Sequelize.ARRAY,
        allowNull: true
      },
      profile_image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Image",
          key: "id"
        }
      },
      banner_image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Image",
          key: "id"
        }
      },
      banner_gallery_image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Image",
          key: "id"
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
    await queryInterface.dropTable('Profiles');
  }
};