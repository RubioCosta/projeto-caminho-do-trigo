const axios = require('axios');

const BASE_URL_CUSTOMER = process.env.BASE_URL_CUSTOMER;

/**
 * @typedef {Object} CustomerType
 * @property {number} id
 * @property {string} cpfCnpj
 * @property {string} name
 * @property {string} address
 * @property {number} points
 * @property {string} telephone
 * @property {boolean} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Get customer by cpfCnpj
 * @param {string} cpfCnpj
 * @returns {Promise<CustomerType>}
 * @example
 * const customer = await getCustomer('12345678901');
*/
async function getCustomer(cpfCnpj) {
    const customer = await axios.get(`${BASE_URL_CUSTOMER}/v1/customer/${cpfCnpj}`);
    return customer.data;
}

module.exports = { getCustomer };