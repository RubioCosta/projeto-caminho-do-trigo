// Models
const { where } = require('sequelize');
const Product = require('../models/Product');

// Utils
const { error } = require('../utils/utils');

module.exports = {
  findProductById: async function(args, callback) {
    try {
      const { idProduct } = args;

      if (!idProduct) throw error('REQUIRED_FIELD_MISSING');

      const product = await Product.findByPk(idProduct);

      if (!product) throw error('PRODUCT_NOT_FOUND');

      const { name, price, stockQuantity, points } = product.dataValues;

      callback(null, { 
        name, 
        price, 
        stockQuantity, 
        points 
      }, 200);
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`ProductController - getProduct: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  createProduct: async function(args, callback) {
    try {
      const { name, price, stockQuantity, points } = args;
      
      if (!name || !price || !stockQuantity || !points) throw error('REQUIRED_FIELD_MISSING');
      
      if (!Number(price) || !Number(stockQuantity) || !Number(points)) throw error('INVALID_FIELD_TYPE');

      const product = await Product.create({ name, price, stockQuantity, points });

      const { id, createAt } = product;

      callback(null, { id, createAt });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`ProductController - createProduct: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  updateProduct: async function(args, callback) {
    try {
      const { idProduct, name, price, stockQuantity, points } = args;

      if (!idProduct) throw error('REQUIRED_FIELD_MISSING');

      const product = await Product.findByPk(idProduct);

      if (!product) throw error('PRODUCT_NOT_FOUND');

      if (name) product.name = name;
      if (price) product.price = price;
      if (stockQuantity) product.stockQuantity = stockQuantity;
      if (points) product.points = points;

      await product.save();

      callback(null, { message: 'Product updated successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`ProductController - updateProduct: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
  deleteProduct: async function(args, callback) {
    try {
      const { idProduct } = args;

      if (!idProduct) throw error('REQUIRED_FIELD_MISSING');

      const product = await Product.findByPk(idProduct);

      if (!product) throw error('PRODUCT_NOT_FOUND');

      await product.destroy();

      callback(null, { message: 'Product deleted successfully' });
    } catch (err) {
      if (err.code) return callback({ code: err.code, message: err.message }, null);

      console.log(`ProductController - deleteProduct: ${err}`);
      const { httpStatusCode, code, message } = error('INTERNAL_SERVER_ERROR');
      return callback({ code, message }, null, httpStatusCode);
    }
  },
}