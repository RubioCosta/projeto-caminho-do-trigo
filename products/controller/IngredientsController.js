module.exports = {
  findIngredientById: function(args, callback) {
    const { idIngredient } = args[0];

    if (!idIngredient) {
      callback({ message: 'Id Ingrediente não informado' });
    }

    try {
      callback(null, { id: 1, name: 'Farinha de Trigo', price: 10.00 });
    } catch (error) {
      callback({ message: 'Erro ao criar pedido de compra' });
    }
    
  },
}