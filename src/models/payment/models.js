const sequelize = require("../db/postgres_db");
const { DataTypes, Model } = require('sequelize');


class Gateway extends Model {}
class UserPayment extends Model {}

Gateway.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Gateway',
    tableName: 'gateways',
    timestamps: false
  }
);

UserPayment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    response_gateway: {
      type: DataTypes.JSONB // برای ذخیره پاسخ کامل درگاه
    }
  },
  {
    sequelize,
    modelName: 'UserPayment',
    tableName: 'user_payments',
    timestamps: false
  }
);

const defineAdditionalRelations = () => {
  // UserLog Relations
  UserLog.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  // UserPayment Relations
  UserPayment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  UserPayment.belongsTo(Gateway, {
    foreignKey: 'gateway_id',
    as: 'gateway'
  });

  UserPayment.belongsTo(Subscription, {
    foreignKey: 'subscription_id',
    as: 'subscription'
  });

  // Gateway Relations
  Gateway.hasMany(UserPayment, {
    foreignKey: 'gateway_id',
    as: 'payments'
  });
};

defineAdditionalRelations();