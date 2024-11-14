const { errorResponse } = require("../utils/utils");
const Customer = require("../models/Customer");

async function createCustomer(req, res) {
  const { cpfCnpj, name, address, telephone } = req.body;

  if (!cpfCnpj || !name || !address || !telephone) {
    const { httpStatusCode, code, message } = errorResponse(
      "REQUIRED_FIELD_MISSING",
    );
    return res.status(httpStatusCode).json({ code, message });
  }

  try {
    const customerExists = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (customerExists) {
      const { httpStatusCode, code, message } = errorResponse(
        "CUSTOMER_ALREADY_EXISTS",
      );
      return res.status(httpStatusCode).json({ code, message });
    }

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
  } catch (error) {
    console.log(`CustomerController - createCustomer: ${error}`);
    const { httpStatusCode, code, message } = errorResponse(
      "INTERNAL_SERVER_ERROR",
    );
    res.status(httpStatusCode).json({ code, message });
  }
}

async function getCustomer(req, res) {
  const { cpfCnpj } = req.params;

  if (!cpfCnpj) {
    const { httpStatusCode, code, message } = errorResponse(
      "REQUIRED_FIELD_MISSING",
    );
    return res.status(httpStatusCode).json({ code, message });
  }

  try {
    const customer = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (!customer) {
      const { httpStatusCode, code, message } =
        errorResponse("CUSTOMER_NOT_FOUND");
      return res.status(httpStatusCode).json({ code, message });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.log(`CustomerController - getCustomer: ${error}`);
    const { httpStatusCode, code, message } = errorResponse(
      "INTERNAL_SERVER_ERROR",
    );
    res.status(httpStatusCode).json({ code, message });
  }
}

async function updatePoints(req, res) {
  const { totalPoints, cpfCnpj } = req.body;

  if (!totalPoints || !cpfCnpj) {
    const { httpStatusCode, code, message } = errorResponse(
      "REQUIRED_FIELD_MISSING",
    );
    return res.status(httpStatusCode).json({ code, message });
  }

  if (!Number(totalPoints)) {
    const { httpStatusCode, code, message } =
      errorResponse("POINTS_NOT_NUMERIC");
    return res.status(httpStatusCode).json({ code, message });
  }

  try {
    const customer = await Customer.findOne({
      where: {
        cpfCnpj,
      },
    });

    if (!customer) {
      const { httpStatusCode, code, message } =
        errorResponse("CUSTOMER_NOT_FOUND");
      return res.status(httpStatusCode).json({ code, message });
    }

    customer.points += totalPoints;

    await Customer.update(customer);

    res.status(200).json({ message: "Customer points updated successfully" });
  } catch (error) {
    console.log(`CustomerController - getCustomer: ${error}`);
    const { httpStatusCode, code, message } = errorResponse(
      "INTERNAL_SERVER_ERROR",
    );
    res.status(httpStatusCode).json({ code, message });
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  updatePoints,
};
