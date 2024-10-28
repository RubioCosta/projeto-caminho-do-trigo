const Product = require('../service/productService');
const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');

module.exports = class OrderItemsController {

    static async createOrderItem(req, res) {
        const { idOrder, idProduct, qtdProduct } = req.body;
        
        if (!idOrder || !idProduct || !qtdProduct) return res.status(400).json({ message: 'All fields must be informed' });
        if (!Number(qtdProduct)) return res.status(400).json({ message: 'Quantity must be a numeric value' });

        try {
            const order = await Order.findOne({ where: { idOrder } });
            if (!order) return res.status(400).json({ message: 'Unregistered order' });

            const product = await Product.getProduct(idProduct);
            if (!product) return res.status(400).json({ message: 'Unregistered product' });

            const data = {
                idOrder,
                idProduct,
                quantity: qtdProduct,
                pointsProduct: product.points
            };

            await OrderItem.create(data);
            res.status(201).json({ message: 'Item created successfully' });
        } catch (error) {
            const errorMessage = error.data.response.error || error.data.response.message
            res.status(400).json({ message: errorMessage || 'Failed to create order item' });
        }
    }

    static async deleteOrderItem(req, res) {
        const { idItem } = req.params;

        try {
            const orderItem = await OrderItem.findByPk({ id: idItem });
            if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

            await OrderItem.destroy({ where: { id: idItem } });
            res.status(200).json({ message: 'Order item deleted successfully' });
        } catch (error) {
            const errorMessage = error.data.response.error || error.data.response.message
            res.status(400).json({ message: errorMessage || 'Failed to delete item from order' });
        }
    }

    static async updateOrderItem(req, res) {
        const { idItem } = req.params;
        const { qtdProduct } = req.body;

        if (!Number(qtdProduct)) return res.status(400).json({ message: 'Quantity must be a numeric value' });

        try {
            const orderItem = await OrderItem.findByPk({ id: idItem });
            if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

            await OrderItem.update({ quantity: qtdProduct }, { where: { id: idItem } });
            res.status(200).json({ message: 'Order item updated successfully' });
        } catch (e) {
            const errorMessage = error.data.response.error || error.data.response.message
            res.status(400).json({ message: errorMessage || 'Failed to update order item' });
        }
    }

    static async getOrderItems(req, res) {
        const { idOrder } = req.params;

        try {
            const orderItems = await OrderItem.findAll({ where: { idOrder } });
            if (orderItems.length === 0) return res.status(400).json({ message: 'No order items found for this order' });

            res.status(200).json(orderItems);
        } catch (e) {
            const errorMessage = error.data.response.error || error.data.response.message
            res.status(400).json({ message: errorMessage || 'Failed to get order items' });
        }
    }
};
