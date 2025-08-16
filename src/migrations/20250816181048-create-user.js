'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mobile_phone: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_staff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_superuser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_artist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

    await queryInterface.addIndex('Users', ['email'], {
      name: "users_email_unique",
      unique: true,
      where: {
        email: {
          [Sequelize.Op.ne]: null
        }
      }
    });

    await queryInterface.addIndex('Users', ['username'], {
      name: "users_username_unique",
      unique: true,
      where: {
        username: {
          [Sequelize.Op.ne]: null
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users', 'users_username_unique');
    await queryInterface.removeIndex('Users', 'users_email_unique');
    await queryInterface.dropTable('Users');
  }
};