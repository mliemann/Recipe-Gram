const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Table extends Model {}

Table.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
      validate:{
        notEmpty: true,
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
      validate:{
        notEmpty: true,
      }
    },
    visibility: {
      type: DataTypes.BOOLEAN,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
      validate:{
        notEmpty: true,
      }
    },
    directions: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
      validate:{
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      defaultValue: "default",
      validate:{
        notEmpty: true,
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'table',
  }
);

module.exports = Table;
