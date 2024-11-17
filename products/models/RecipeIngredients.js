const { DataTypes } = require('sequelize');

const { conn } = require('../db/conn');

const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

const RecipeIngredients = conn.define('recipeIngredients', {
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredients });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredients });

module.exports = RecipeIngredients;
