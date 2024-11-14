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

  POINTS_NOT_NUMERIC: {
    code: "POINTS_NOT_NUMERIC",
    message: "O valor dos pontos deve ser numérico.",
    httpStatusCode: 400,
  },
};
