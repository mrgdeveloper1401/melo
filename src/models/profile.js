'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.User,
        {
          foreignKey: "user_id",
          as: 'user'
        }
      );
      this.belongsTo(
        models.Image,
        {
          foreignKey: "profile_image_id",
          as: "profileImage"
        }
      );
      this.belongsTo(
        models.Image,
        {
          foreignKey: "banner_image_id",
          as: "bannerImage"
        }
      );
      this.belongsTo(
        models.Image,
        {
          foreignKey: "banner_gallery_image_id",
          as: "bannerGalleryImage"
        }
      );
    }
  }
  Profile.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    bio: DataTypes.TEXT,
    jobs: DataTypes.ARRAY,
    scat: DataTypes.ARRAY,
    profile_image_id: DataTypes.INTEGER,
    banner_image_id: DataTypes.INTEGER,
    banner_gallery_image_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
    timestamps: true,
    tableName: "profile"
  });
  return Profile;
};