'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    mobile_phone: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    is_staff: DataTypes.BOOLEAN,
    is_superuser: DataTypes.BOOLEAN,
    is_artist: DataTypes.BOOLEAN,
    is_public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    tableName: "user"
  });
  return User;
};