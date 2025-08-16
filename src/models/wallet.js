'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
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
          as: "user"
        }
      );
      this.hasMany(
        models.CartNumber,
        {
          foreignKey: "wallet_id",
          as: "cartNumbers"
        }
      );
    }
  }
  Wallet.init({
    user_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Wallet',
    tableName: "wallet",
    timestamps: true
  });
  return Wallet;
};