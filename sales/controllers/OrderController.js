
// Models
const Order = require('../models/Order');

// Service
const { getCustomer } = require('../service/customersService');

// Utils
const { isValidPaymentMethod, isValidTypeSale } = require('../utils/validation');
const { sendMessage, getMessage } = require('../utils/invoiceUtils');
const { error } = require('../utils/utils');
    
async function createOrder(req, res) {
    try {            
        const { cpfCnpj, totalValue, paymentMethod, typeSale, idTaxCoupon } = req.body;

        if (!cpfCnpj || !totalValue || !paymentMethod || !typeSale || !idTaxCoupon) 
            throw error('REQUIRED_FIELD_MISSING')

        if (!Number(totalValue)) throw error('INVALID_FIELD_TYPE');

        if (!isValidPaymentMethod(paymentMethod)) throw error('INVALID_PAYMENT_METHOD');

        if (!isValidTypeSale(typeSale)) throw error('INVALID_TYPE_SALE');

        const customer = await getCustomer(cpfCnpj);
        if(!customer) throw error('CUSTOMER_NOT_FOUND');

        const data = {
            cpfCnpj,
            totalValue,
            paymentMethod,
            typeSale,
            idTaxCoupon
        }

        const order = await Order.create(data);

        //await sendMessage('invoice', JSON.stringify(order));

        const { id, createdAt, status } = order;

        res.status(201).json({
            id,
            createdAt,
            status,
            message: 'Order created successfully'
        });
    } catch(err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`CustomerController - createCustomer: ${err}`);
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
    } catch (err) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
          console.log(`CustomerController - createCustomer: ${err}`);
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
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
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

        //const orderInvoice = await getMessage('invoice');

        //console.log("Retirado da Fila: ", orderInvoice);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        if (err.code)
            return res
              .status(err.httpStatusCode)
              .json({ code: err.code, message: err.message });
      
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