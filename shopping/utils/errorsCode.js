module.exports = {
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Ocorreu um erro interno tente mais tarde.",
    httpStatusCode: 500,
  },

  REQUIRED_FIELD_MISSING: {
    code: "REQUIRED_FIELD_MISSING",
    message: "Campos obrigatórios estão faltando.",
    httpStatusCode: 400,
  },

  INVALID_FIELD_TYPE: {
    code: "INVALID_FIELD_TYPE",
    message: "Tipo de campo inválido.",
    httpStatusCode: 400,
  },

  // Customers
  CUSTOMER_ALREADY_EXISTS: {
    code: "CUSTOMER_ALREADY_EXISTS",
    message: "Cliente já cadastrado.",
    httpStatusCode: 400,
  },

  CUSTOMER_NOT_FOUND: {
    code: "CUSTOMER_NOT_FOUND",
    message: "Cliente não encontrado.",
    httpStatusCode: 404,
  },

  // Orders
  ORDER_NOT_FOUND: {
    code: "ORDER_NOT_FOUND",
    message: "Pedido não encontrado.",
    httpStatusCode: 404,
  },

  INVALID_PAYMENT_METHOD: {
    code: "INVALID_PAYMENT_METHOD",
    message: "Método de pagamento inválido.",
    httpStatusCode: 400,
  },

  INVALID_TYPE_SALE: {
    code: "INVALID_TYPE_SALE",
    message: "Tipo de venda inválido.",
    httpStatusCode: 400,
  },

  INVALID_ORDER_STATUS: {
    code: "INVALID_ORDER_STATUS",
    message: "Status do pedido inválido.",
    httpStatusCode: 400,
  },

  // Products
  PRODUCT_NOT_FOUND: {
    code: "PRODUCT_NOT_FOUND",
    message: "Produto não encontrado.",
    httpStatusCode: 404,
  },

  PRODUCT_FETCH_FAILED: {
    code: "PRODUCT_FETCH_FAILED",
    message: "Não foi possível buscar o produto.",
    httpStatusCode: 500,
  },

  INGREDEINT_NOT_FOUND: {
    code: "INGREDEINT_NOT_FOUND",
    message: "Ingrediente não encontrado.",
    httpStatusCode: 404,
  },

  INGREDIENT_FETCH_FAILED: {
    code: "INGREDIENT_FETCH_FAILED",
    message: "Não foi possível buscar o ingrediente.",
    httpStatusCode: 500,
  },

  // Order Items
  ORDER_ITEM_NOT_FOUND: {
    code: "ORDER_ITEM_NOT_FOUND",
    message: "Item do pedido não encontrado.",
    httpStatusCode: 404,
  },

  ORDER_ITEMS_NOT_FOUND: {
    code: "ORDER_ITEMS_NOT_FOUND",
    message: "Itens do pedido não encontrados.",
    httpStatusCode: 404,
  },

  // Shopping
  SUPPLIER_NOT_FOUND: {
    code: "SUPPLIER_NOT_FOUND",
    message: "Fornecedor não encontrado.",
    httpStatusCode: 404,
  },

  SUPPLIER_ALREADY_EXISTS: {
    code: "SUPPLIER_ALREADY_EXISTS",
    message: "Fornecedor já cadastrado.",
    httpStatusCode: 400,
  },
};
