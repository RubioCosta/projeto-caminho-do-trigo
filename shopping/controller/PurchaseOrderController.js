const getIngredientById = require('../service/ProductService');

module.exports = {
  createdPurchaseOrder: async function(args, callback) {
    const { idIngredient } = args[0];

    if (!idIngredient) {
      callback({ message: 'Ingrediente não informado' });
    }

    try {

      const ingredient = await getIngredientById(idIngredient);

      if (!ingredient) {
        callback({ message: 'Ingrediente não encontrado' });
      }

      callback(null, { message: 'Pedido de compra criado com sucesso' });
    } catch (error) {
      callback({ message: 'Erro ao criar pedido de compra' });
    }
    
  },
}