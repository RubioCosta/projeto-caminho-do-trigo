const jayson = require('jayson');

const client = jayson.client.http({ port: 8081 });

function getProduct(idProduct) {
    return new Promise((resolve, reject) => {
        client.request('getProduct', { idProduct }, (err, response) => {
        if (err) {
            console.error(err);
            reject(err);
        }
        resolve(response.result);
        })
    });
}

const Product = {
    getProduct
}

module.exports = Product;