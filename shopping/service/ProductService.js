const jayson = require("jayson");

const BASE_URL_PRODUCT = process.env.BASE_URL_PRODUCT;
const PORT_PRODUCT = process.env.PORT_PRODUCT;

const client = jayson.client.http({
  port: PORT_PRODUCT,
  hostname: BASE_URL_PRODUCT,
});

function findIngredientById(idIngredient) {
  return new Promise((resolve, reject) => {
    client.request("findIngredientById", { idIngredient }, (err, response) => {
      if (err) {
        const { code } = err;

        if (code === "ECONNREFUSED")
          return reject(error("INGREDIENT_FETCH_FAILED"));

        return reject(error("INGREDEINT_NOT_FOUND"));
      }

      resolve(response.result);
    });
  });
}

module.exports = {
  findIngredientById,
};
