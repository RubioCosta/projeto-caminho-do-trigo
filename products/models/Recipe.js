const { DataTypes } = require('sequelize');

const { conn } = require('../db/conn');

const Recipe = conn.define('recipe', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Recipe;
