
// Models
const Order = require('../models/Order');

// Service
const { getCustomer } = require('../service/customersService');

// Utils
const { isValidPaymentMethod, isValidTypeSale } = require('../utils/validation');
const { error } = require('../utils/utils');
    
async function createOrder(req, res) {
    try {            
        const { idOrder, cpfCnpjCustomer, totalValue, paymentMethod, typeSale } = req.body;

        if (!idOrder || !cpfCnpjCustomer || !totalValue || !paymentMethod || !typeSale) 
            throw error('REQUIRED_FIELD_MISSING')

        if (!Number(totalValue)) throw error('INVALID_FIELD_TYPE');

        if (!isValidPaymentMethod(paymentMethod)) throw error('INVALID_PAYMENT_METHOD');

        if (!isValidTypeSale(typeSale)) throw error('INVALID_TYPE_SALE');

        const customer = await getCustomer(cpfCnpjCustomer);
        if(!customer) throw error('CUSTOMER_NOT_FOUND');

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
        if (error.code)
            return res
              .status(error.httpStatusCode)
              .json({ code: error.code, message: error.message });
      
          console.log(`CustomerController - createCustomer: ${error}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function updateOrder(req, res) {
    try {
        const { idOrder } = req.params;
        const { totalValue, status } = req.body;

        if (!totalValue && !status) throw error('REQUIRED_FIELD_MISSING');

        if (!Number(totalValue)) throw error('INVALID_FIELD_TYPE');

        const order = await Order.findOne({ where: { idOrder } });
        if (!order) throw error('ORDER_NOT_FOUND');

        const updateData = {};
        if (totalValue) updateData.totalValue = totalValue;
        if (status) updateData.status = status;

        await Order.update(updateData, { where: { idOrder } });

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        if (error.code)
            return res
              .status(error.httpStatusCode)
              .json({ code: error.code, message: error.message });
      
          console.log(`CustomerController - createCustomer: ${error}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function getOrder(req, res) {
    try {
        const { idOrder } = req.params;

        if (!idOrder) throw error('REQUIRED_FIELD_MISSING');

        const order = await Order.findOne({ where: { idOrder } });
        if (!order) throw error('ORDER_NOT_FOUND');

        res.status(200).json(order);
    } catch (error) {
        if (error.code)
            return res
              .status(error.httpStatusCode)
              .json({ code: error.code, message: error.message });
      
          console.log(`CustomerController - createCustomer: ${error}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

async function deleteOrder(req, res) {
    try {
        const { idOrder } = req.params;

        if (!idOrder) throw error('REQUIRED_FIELD_MISSING');

        const order = await Order.findOne({ where: { idOrder } });
        if (!order) throw error('ORDER_NOT_FOUND');

        await Order.destroy({ where: { idOrder } });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        if (error.code)
            return res
              .status(error.httpStatusCode)
              .json({ code: error.code, message: error.message });
      
          console.log(`CustomerController - createCustomer: ${error}`);
          const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
          res.status(httpStatusCode).json({ code, message });
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getOrder,
    deleteOrder
}