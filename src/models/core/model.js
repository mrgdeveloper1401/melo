const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../../db/postgres_db");

class BaseModel extends Model {}
class PublicNotification extends Model {}
class SiteMap extends Model {}
class UserLog extends Model {}

BaseModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: 'BaseModel',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        abstract: true
    }
)

PublicNotification.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.TEXT,
        },
        notification_redirect_url: {
            type: DataTypes.CHAR(100),
            allowNull: true
        },
        notification_type: {
            type: DataTypes.CHAR(30),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "public_notifications",
        modelName: PublicNotification
    }
)

SiteMap.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    site_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    changefreq: {
      type: DataTypes.ENUM(
        'always',
        'hourly',
        'daily',
        'weekly',
        'monthly',
        'yearly',
        'never'
      ),
      defaultValue: 'weekly'
    },
    priority: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0.0,
        max: 1.0
      },
      defaultValue: 0.5
    }
  },
  {
    sequelize,
    modelName: 'SiteMap',
    tableName: 'sitemaps',
    timestamps: false
  }
);

UserLog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    ip_address: {
      type: DataTypes.STRING(45) // برای پشتیبانی از IPv6
    },
    user_agent: {
      type: DataTypes.TEXT
    },
    request_path: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'UserLog',
    tableName: 'user_logs',
    timestamps: true, // فقط createdAt فعال است
    updatedAt: false // غیرفعال کردن updatedAt
  }
);

module.exports = BaseModel;
