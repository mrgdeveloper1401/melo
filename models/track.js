'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Track.init({
    artist_id: DataTypes.BIGINT,
    album_id: DataTypes.BIGINT,
    title: DataTypes.STRING,
    song_id: DataTypes.BIGINT,
    release_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN,
    play_count: DataTypes.INTEGER,
    genre_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};