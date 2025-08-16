'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Playlist, { foreignKey: 'playlist_id' });
      this.belongsTo(models.Song, { foreignKey: 'song_id' });
    }
  }
  PlaylistSong.init({
    playlist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PlaylistSong',
    timestamps: true,
    tableName: "play_list_song"
  });
  return PlaylistSong;
};