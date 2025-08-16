'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicNotification.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    notification_redirect_url: DataTypes.STRING,
    notification_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PublicNotification',
  });
  return PublicNotification;
};