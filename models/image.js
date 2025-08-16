'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(
        models.Profile,
        {
          foreignKey: "banner_image_id",
          as: "profileAsBanner"
        }
      );
      this.hasOne(
        models.Profile,
        {
          foreignKey: "profile_image_id",
          as: "profileAsImage"
        }
      );
      this.hasOne(
        models.Profile,
        {
          foreignKey: "banner_gallery_image_id",
          as: "profileAsBannerGallery"
        }
      )
    }
  }
  Image.init({
    file_name: DataTypes.STRING,
    path: DataTypes.STRING,
    format: DataTypes.STRING,
    type: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Image',
    tableName: "image",
    timestamps: true
  });
  return Image;
};