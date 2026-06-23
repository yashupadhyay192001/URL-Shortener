const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Url = sequelize.define(
  'Url',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    original_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },

    short_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },

    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: 'urls',
    underscored: true
  }
);

module.exports = Url;