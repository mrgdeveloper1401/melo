'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Image, { foreignKey: 'cover_image_id', as: 'coverImage'})
      this.belongsToMany(models.Artist, { 
        through: models.ArtistAlbum,
        foreignKey: 'album_id'
      });
    }
  }
  Album.init({
    title: DataTypes.STRING,
    bio: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    cover_image_id: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};