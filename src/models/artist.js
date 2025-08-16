'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Album, { foreignKey: 'artist_id' });
      this.belongsToMany(models.Album, { 
        through: models.ArtistAlbum,
        foreignKey: 'artist_id'
      });
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    monthly_listeners: DataTypes.INTEGER,
    cover_image_id: DataTypes.INTEGER,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};