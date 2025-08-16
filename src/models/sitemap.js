'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SiteMap extends Model {
    static associate(models) {
      // define associate
    }
  }

  SiteMap.init({
    site_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false,
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
      allowNull: false,
      defaultValue: 'weekly'
    },
    priority: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.5,
      validate: {
        min: 0.0,
        max: 1.0
      }
    }
  }, {
    sequelize,
    modelName: 'SiteMap',
    tableName: 'sitemaps',
    timestamps: true
  });

  return SiteMap;
};