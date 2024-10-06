const { getCustomer } = require('../service/customersService');

module.exports = class OrderController {
    
    static async createOrder(req, res) {
        const { cpfCnpjCustomer } = req.body;

        try {            
            const customer = await getCustomer(cpfCnpjCustomer);
            if(!customer) {
                return res.status(404).json({message: 'Customer not found'});
            }

            // Create order

            res.status(201).json({
                customer,
                message: 'Order created successfully'
            });

        } catch(e) {
            const message = e?.response?.data?.message;
            res.status(500).json({message: message || 'Internal server error' });
        }
    }

};