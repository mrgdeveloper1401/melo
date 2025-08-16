'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArtistAlbum.init({
    artist_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    song_id: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN,
    play_count: DataTypes.INTEGER,
    ganere_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArtistAlbum',
  });
  return ArtistAlbum;
};