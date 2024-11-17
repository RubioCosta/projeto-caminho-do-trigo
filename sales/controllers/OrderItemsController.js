// Service
const Product = require('../service/productService');

// Models
const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');

// Utils
const { error } = require('../utils/utils');

async function createOrderItem(req, res) {
    try {
        const { idOrder, idProduct, qtdProduct } = req.body;

        if (!idOrder || !idProduct || !qtdProduct) throw error('REQUIRED_FIELD_MISSING');

        if (!Number(qtdProduct)) throw error('INVALID_FIELD_TYPE')

        const order = await Order.findOne({ where: { id: idOrder } });
        if (!order) throw error('ORDER_NOT_FOUND');

        const product = await Product.findProductById(idProduct);
        if (!product) throw error('PRODUCT_NOT_FOUND');

        const data = {
            idOrder,
            idProduct,
            quantity: qtdProduct,
            points: product.points
        };

        const orderItem = await OrderItem.create(data);

        const { id, createAt } = orderItem;

        res.status(201).json({ 
            id,
            createAt,
            message: 'Item created successfully' 
        });
    } catch (err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`OrderItemsController - createOrderItem: ${err}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function deleteOrderItem(req, res) {
    try {
        const { idItem } = req.params;

        if (!idItem) throw error('REQUIRED_FIELD_MISSING');

        const orderItem = await OrderItem.findByPk({ id: idItem });
        if (!orderItem) throw error('ORDER_ITEM_NOT_FOUND');

        await OrderItem.destroy({ where: { id: idItem } });

        res.status(200).json({ message: 'Order item deleted successfully' });
    } catch (err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`OrderItemsController - deleteOrderItem: ${err}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function updateOrderItem(req, res) {
    try {
        const { idItem } = req.params;
        const { qtdProduct } = req.body;

        if (!idItem || !qtdProduct) throw error('REQUIRED_FIELD_MISSING');

        if (!Number(qtdProduct)) throw error('INVALID_FIELD_TYPE');

        const orderItem = await OrderItem.findByPk({ id: idItem });
        if (!orderItem) throw error('ORDER_ITEM_NOT_FOUND');

        await OrderItem.update({ quantity: qtdProduct }, { where: { id: idItem } });

        res.status(200).json({ message: 'Order item updated successfully' });
    } catch (err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`OrderItemsController - updateOrderItem: ${err}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function getOrderItems(req, res) {
    try {
        const { idOrder } = req.params;

        if (!idOrder) throw error('REQUIRED_FIELD_MISSING');

        const orderItems = await OrderItem.findAll({ where: { idOrder } });
        if (orderItems.length === 0) throw error('ORDER_ITEMS_NOT_FOUND');

        res.status(200).json(orderItems);
    } catch (err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`OrderItemsController - getOrderItems: ${err}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

module.exports = {
    createOrderItem,
    deleteOrderItem,
    updateOrderItem,
    getOrderItems
};