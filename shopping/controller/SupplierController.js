const Supplier = require("../models/Supplier");

const { error } = require("../utils/utils");

async function createSupplier(req, res) {
  try {
    const { cnpj, email } = req.body;

    if (!cnpj || !email) throw error("REQUIRED_FIELD_MISSING");

    const supplierExists = await Supplier.findOne({ where: { cnpj } });
    if (supplierExists) throw error("SUPPLIER_ALREADY_EXISTS");

    const supplier = await Supplier.create({ cnpj, email });

    const { id, createdAt } = supplier;

    return res
      .status(201)
      .json({ id, createdAt, message: "Supplier created successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`SupplierController - createSupplier: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function getSuppliers(req, res) {
  try {
    const { cnpj } = req.params;

    const suppliers = await Supplier.findOne({ where: { cnpj } });
    if (!suppliers) throw error("SUPPLIER_NOT_FOUND");

    return res.status(200).json(suppliers);
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`SupplierController - getSuppliers: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function updateSupplier(req, res) {
  try {
    const { cnpj } = req.params;
    const { email } = req.body;

    if (!cnpj || !email) throw error("REQUIRED_FIELD_MISSING");

    const supplier = await Supplier.findOne({ where: { cnpj } });
    if (!supplier) throw error("SUPPLIER_NOT_FOUND");

    await Supplier.update({ email }, { where: { cnpj } });

    return res.status(200).json({ message: "Supplier updated successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`SupplierController - updateSupplier: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function deleteSupplier(req, res) {
  try {
    const { cnpj } = req.params;

    if (!cnpj) throw error("REQUIRED_FIELD_MISSING");

    const supplier = await Supplier.findOne({ where: { cnpj } });
    if (!supplier) throw error("SUPPLIER_NOT_FOUND");

    await Supplier.destroy({ where: { cnpj } });

    return res.status(200).json({ message: "Supplier deleted successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`SupplierController - deleteSupplier: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

module.exports = {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};
