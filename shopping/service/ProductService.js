const jayson = require('jayson');

const client = jayson.client.http({ port: 8081 });

function getIngredientById(idIngredient) {
  try {
    return new Promise((resolve, reject) => {
      client.request('findIngredientById', [{ idIngredient }], (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(response.result);
      })
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { 
  getIngredientById 
};