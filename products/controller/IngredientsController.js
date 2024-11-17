
// Models
const Ingredient = require('../models/Ingredient');

// Utils
const { error } = require('../utils/utils');

module.exports = {
  findIngredientById: async function(args, callback) {
    try {
      const { idIngredient } = args;

      if (!idIngredient) throw error('REQUIRED_FIELD_MISSING');

      const ingredient = await Ingredient.findByPk(idIngredient);

      if (!ingredient) throw error('INGREDIENT_NOT_FOUND');

      const { id, name, weight } = ingredient;

      return callback(null, { 
        id, 
        name, 
        weight 
      });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`IngredientsController - findIngredientById: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  createIngredient: async function(args, callback) {
    try {
      const { name, weight } = args;

      if (!name || !weight) throw error('REQUIRED_FIELD_MISSING');

      const ingredient = await Ingredient.create({ name, weight });

      const { id } = ingredient;

      return callback(null, { id, message: 'Ingredient created successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`IngredientsController - createIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  updateIngredient: async function(args, callback) {
    try {
      const { idIngredient, name, weight } = args;

      if (!idIngredient) throw error('REQUIRED_FIELD_MISSING');

      const ingredient = await Ingredient.findByPk(idIngredient);

      if (!ingredient) throw error('INGREDIENT_NOT_FOUND');

      await ingredient.update({ name, weight });

      return callback(null, { message: 'Ingredient updated successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`IngredientsController - updateIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  deleteIngredient: async function(args, callback) {
    try {
      const { idIngredient } = args;

      if (!idIngredient) throw error('REQUIRED_FIELD_MISSING');

      const ingredient = await Ingredient.findByPk(idIngredient);

      if (!ingredient) throw error('INGREDIENT_NOT_FOUND');

      await ingredient.destroy();

      return callback(null, { message: 'Ingredient deleted successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`IngredientsController - deleteIngredient: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  }
}