const jayson = require('jayson');
const { error } = require('../utils/utils');

const BASE_URL_PRODUCT = process.env.BASE_URL_PRODUCT;
const PORT_PRODUCT = process.env.PORT_PRODUCT;

const client = jayson.client.http({ port: PORT_PRODUCT, hostname: BASE_URL_PRODUCT });

function findProductById(idProduct) {
    return new Promise((resolve, reject) => {
        client.request('findProductById', { idProduct }, (err, response) => {

        if (err) {
            const { code } = err;

            if (code === 'ECONNREFUSED') return reject(error('PRODUCT_FETCH_FAILED'));

            return reject(error('PRODUCT_NOT_FOUND'));
        }
        
        resolve(response.result);
        })
    });
}

function createProduct() {
    return new Promise((resolve, reject) => {
        client.request('createProduct', { name: 'Arroz', price: 12.50, stockQuantity: 50, points: 50 }, (err, response) => {
        if (err) {
            const { code } = err;

            if (code === 'ECONNREFUSED') return reject(error('PRODUCT_CREATE_FAILED'));
            
            if (code) return reject(error(code));

            return reject(error('PRODUCT_CREATE_FAILED'));
        }
        
        resolve(response.result);
        });
    });
}

const Product = {
    findProductById,
    createProduct
}

module.exports = Product;