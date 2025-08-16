'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.Wallet,
        {
          foreignKey: "wallet_id",
          as: "wallet"
        }
      );
    }
  }
  CartNumber.init({
    wallet_id: DataTypes.INTEGER,
    cart: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CartNumber',
    tableName: "cart_number"
  });
  return CartNumber;
};