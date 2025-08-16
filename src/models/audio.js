'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Audio.init({
    audio_file: DataTypes.STRING,
    size: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    audio_format: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Audio',
  });
  return Audio;
};