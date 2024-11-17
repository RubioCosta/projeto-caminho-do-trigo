
// Models
const Ingredient = require('../models/Ingredient');
const Product = require('../models/Product');
const Recipe = require('../models/Recipe');

// Utils
const { error } = require('../utils/utils');

module.exports = {
  createRecipeIngredient: async function(args, callback) {
    try {
      const { idRecipe, idIngredient, weight } = args;

      if (!idRecipe || !idIngredient || !weight) throw error('REQUIRED_FIELD_MISSING');

      const recipe = await Recipe.findByPk(idRecipe);
      if (!recipe) throw error('RECIPE_NOT_FOUND');

      const ingredient = await Ingredient.findByPk(idIngredient);
      if (!ingredient) throw error('INGREDIENT_NOT_FOUND');

      const recipeIngredient = await RecipeIngredients.create({
        recipeId: idRecipe,
        ingredientId: idIngredient,
        weight
      });

      return callback(null, { id: recipeIngredient.id, message: 'Recipe Ingredient created successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeIngredientsController - createRecipeIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  findRecipeIngredientById: async function(args, callback) {
    try {
      const { idRecipeIngredient } = args;

      if (!idRecipeIngredient) throw error('REQUIRED_FIELD_MISSING');

      const recipeIngredient = await RecipeIngredients.findByPk(idRecipeIngredient);
      if (!recipeIngredient) throw error('RECIPE_INGREDIENT_NOT_FOUND');

      return callback(null, { id: recipeIngredient.id, weight: recipeIngredient.weight });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeIngredientsController - findRecipeIngredientById: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  updateRecipeIngredient: async function(args, callback) {
    try {
      const { idRecipeIngredient, weight } = args;

      if (!idRecipeIngredient) throw error('REQUIRED_FIELD_MISSING');

      const recipeIngredient = await RecipeIngredients.findByPk(idRecipeIngredient);
      if (!recipeIngredient) throw error('RECIPE_INGREDIENT_NOT_FOUND');

      await recipeIngredient.update({ weight });

      return callback(null, { message: 'Recipe Ingredient updated successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeIngredientsController - updateRecipeIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  deleteRecipeIngredient: async function(args, callback) {
    try {
      const { idRecipeIngredient } = args;

      if (!idRecipeIngredient) throw error('REQUIRED_FIELD_MISSING');

      const recipeIngredient = await RecipeIngredients.findByPk(idRecipeIngredient);
      if (!recipeIngredient) throw error('RECIPE_INGREDIENT_NOT_FOUND');

      await recipeIngredient.destroy();

      return callback(null, { message: 'Recipe Ingredient deleted successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeIngredientsController - deleteRecipeIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
};