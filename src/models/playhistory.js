'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayHistory.init({
    user_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,
    played_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PlayHistory',
  });
  return PlayHistory;
};