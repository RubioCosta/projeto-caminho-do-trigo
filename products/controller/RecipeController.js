
// Models
const Recipe = require('../models/Recipe');

// Utils
const { error } = require('../utils/utils');

module.exports = {
  createRecipe: async function(args, callback) {
    try {
      const { description } = args;

      if (!description) throw error('REQUIRED_FIELD_MISSING');

      const recipe = await Recipe.create({ description });

      const { id, createAt } = recipe;

      callback(null, { id, createAt });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeController - createRecipe: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  findRecipeById: async function(args, callback) {
    try {
      const { idRecipe } = args;

      if (!idRecipe) throw error('REQUIRED_FIELD_MISSING');

      const recipe = await Recipe.findByPk(idRecipe);

      if (!recipe) throw error('RECIPE_NOT_FOUND');

      const { id, description } = recipe;

      return callback(null, { id, description });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeController - findRecipeById: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  updateRecipe: async function(args, callback) {
    try {
      const { idRecipe, description } = args;

      if (!idRecipe) throw error('REQUIRED_FIELD_MISSING');

      const recipe = await Recipe.findByPk(idRecipe);

      if (!recipe) throw error('RECIPE_NOT_FOUND');

      await recipe.update({ description });

      return callback(null, { message: 'Recipe updated successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeController - updateRecipe: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  deleteRecipe: async function(args, callback) {
    try {
      const { idRecipe } = args;

      if (!idRecipe) throw error('REQUIRED_FIELD_MISSING');

      const recipe = await Recipe.findByPk(idRecipe);

      if (!recipe) throw error('RECIPE_NOT_FOUND');

      await recipe.destroy();

      return callback(null, { message: 'Recipe deleted successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`RecipeController - deleteRecipe: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
};