const Customer = require('../models/Customer');

module.exports = class CustomerController {

    static async createCustomer(req, res) {
        const { cpfCnpj, name, address, telephone } = req.body;

        if (!cpfCnpj || !name || !address || !telephone) {
            req.status(400).json({ message: 'All fields must be informed' })
        }

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
        } catch(error) {
            const messageError = error.data.respose.error || error.data.respose.message
            res.status(500).json({message: messageError || 'Failed to create custumer'});
        }
        
    }

    static async getCustomer(req, res) {
        const { cpfCnpj } = req.params;

        if (!cpfCnpj) {
            req.status(400).json({ message: 'All fields must be informed' })
        }

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
        } catch(error) {
            const messageError = error.data.respose.error || error.data.respose.message
            res.status(400).json({message: messageError || 'Failed to search for user'});
        }
    }

    static async updatePoits(req, res) {
        const { totalPoits, cpfCnpj } = req.body;

        if (!totalPoits || !cpfCnpj) {
            req.status(400).json({ message: 'All fields must be informed' });
        }

        if (!Number(totalPoits)) {
            req.status(400).json({ message: 'The point value must be numeric' })
        }

        try {

            const customer = await Customer.findOne({
                where: {
                    cpfCnpj
                }
            });

            if(!customer) {
                return res.status(400).json({message: 'Unregistered customer'});
            }

            customer.points += totalPoits;
            
            await Customer.update(customer)

            res.status(200).json({ message: 'Customer points updated successfully' });
        } catch(error) {
            const messageError = error.data.respose.error || error.data.respose.message
            res.status(400).json({message: messageError || 'Failed to update custumer points'});
        }

    }

};