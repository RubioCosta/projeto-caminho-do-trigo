const { error } = require("../utils/utils");
const Customer = require("../models/Customer");

// Create a new customer
async function createCustomer(req, res) {
  try {
    const { cpfCnpj, name, address, telephone } = req.body;

    if (!cpfCnpj || !name || !address || !telephone)
      throw error("REQUIRED_FIELD_MISSING");

    const customerExists = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (customerExists) throw error("REQUIRED_FIELD_MISSING");

    const customer = await Customer.create({
      cpfCnpj,
      name,
      address,
      telephone,
    });

    const { points, id, createdAt } = customer;

    res.status(201).json({
      id,
      points,
      createdAt,
    });
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

// Get a customer by cpfCnpj
async function getCustomer(req, res) {
  try {
    const { cpfCnpj } = req.params;

    if (!cpfCnpj) throw error("REQUIRED_FIELD_MISSING");

    const customer = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (!customer) throw error("CUSTOMER_NOT_FOUND");

    res.status(200).json(customer);
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`CustomerController - getCustomer: ${error}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

// Update customer points
async function updatePoints(req, res) {
  try {
    const { totalPoints, cpfCnpj } = req.body;

    if (!totalPoints || !cpfCnpj) throw error("REQUIRED_FIELD_MISSING");

    if (!Number(totalPoints)) throw error("INVALID_FIELD_TYPE");

    const customer = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (!customer) throw error("CUSTOMER_NOT_FOUND");

    customer.points += totalPoints;

    await Customer.update(customer);

    res.status(200).json({ message: "Customer points updated successfully" });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`CustomerController - updatePoints: ${error}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  updatePoints,
};
