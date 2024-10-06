const axios = require('axios');

async function getCustomer(cpfCnpj) {
    const customer = await axios.get(`http://localhost:3001/api/customer/${cpfCnpj}`);
    return customer.data;
}

module.exports = { getCustomer };