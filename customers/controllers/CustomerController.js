const Customer = require('../models/Customer');

module.exports = class CustomerController {

    static async createCustomer(req, res) {
        const { cpfCnpj, name, address, telephone ,status } = req.body;

        try {

            const customerExists = await Customer.findOne({
                where: {
                    cpfCnpj
                }
            });

            if(customerExists) {
                return res.status(400).json({message: 'Customer already exists'});
            }

            const customer = await Customer.create({
                cpfCnpj,
                name,
                address,
                telephone
            });

            res.status(201).json(customer);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Internal server error'});
        }
        
    }

    static async getCustomer(req, res) {
        const { cpfCnpj } = req.params;

        try {
            const customer = await Customer.findOne({
                where: {
                    cpfCnpj
                }
            });

            if(!customer) {
                return res.status(404).json({message: 'Customer not found'});
            }

            res.status(200).json(customer);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};