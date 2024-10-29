
// Models
const Order = require('../models/Order');

// Service
const { getCustomer } = require('../service/customersService');

module.exports = class OrderController {
    
    static async createOrder(req, res) {
        const { idOrder, cpfCnpjCustomer, totalValue, paymentMethod, typeSale } = req.body;

        if (!idOrder || !cpfCnpjCustomer || !totalValue || !paymentMethod || !typeSale) return res.status(400).json({ message: 'All fields must be informed' });
        if (!Number(totalValue)) return res.status(400).json({ message: 'Total Value must be a numeric value' });

        try {            
            const customer = await getCustomer(cpfCnpjCustomer);
            if(!customer) {
                return res.status(400).json({message: 'Customer not found'});
            }

            const data = {
                idOrder,
                cpfCnpjCustomer,
                totalValue,
                paymentMethod,
                typeSale
            }

            await Order.create(data)

            res.status(201).json({ message: 'Order created successfully' });
        } catch(error) {
            const messageError = error?.response?.data?.error || error?.response?.data?.message;
            res.status(400).json({message: messageError || 'Failed to create order' });
        }
    }

    static async updateOrder(req, res) {
        const { idOrder } = req.params;
        const { totalValue, status } = req.body;

        if (!totalValue && !status) {
            return res.status(400).json({ message: 'All fields must be informed' });
        }

        if (totalValue && !Number(totalValue)) {
            return res.status(400).json({ message: 'Total Value must be a numeric value' });
        }

        try {
            const order = await Order.findOne({ where: { idOrder } });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const updateData = {};
            if (totalValue !== undefined) updateData.totalValue = totalValue;
            if (status !== undefined) updateData.status = status;

            await Order.update(updateData, { where: { idOrder } });
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            const messageError = error?.response?.data?.error || error?.response?.data?.message;
            res.status(400).json({message: messageError || 'Failed to update order' });
        }
    }

    static async getOrder(req, res) {
        const { idOrder } = req.params;

        if (!idOrder) return res.status(400).json({ message: 'All fields must be informed' });

        try {
            const order = await Order.findOne({ where: { idOrder } });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json(order);
        } catch (error) {
            const messageError = error?.response?.data?.error || error?.response?.data?.message;
            res.status(400).json({message: messageError || 'Failed to get order' });
        }
    }

    static async deleteOrder(req, res) {
        const { idOrder } = req.params;

        if (!idOrder) return res.status(400).json({ message: 'All fields must be informed' });

        try {
            const order = await Order.findOne({ where: { idOrder } });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            await Order.destroy({ where: { idOrder } });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            const messageError = error?.response?.data?.error || error?.response?.data?.message;
            res.status(400).json({message: messageError || 'Failed to delete the order' });
        }
    }
};