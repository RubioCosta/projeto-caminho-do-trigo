const { DataTypes } = require('sequelize');

const { conn } = require('../db/conn');

const Ingredient = conn.define('ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Ingredient;
