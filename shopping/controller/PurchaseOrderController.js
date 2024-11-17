// Models
const PurchaseOrder = require("../models/PurchaseOrder");
const Supplier = require("../models/Supplier");

// Utils
const { error } = require("../utils/utils");

// Services
const Product = require("../service/ProductService");

async function createPurchaseOrder(req, res) {
  try {
    const { cnpj, totalValue, observation = "" } = req.body;

    if (!cnpj || !totalValue) throw error("REQUIRED_FIELD_MISSING");

    const supplier = await Supplier.findOne({ cnpj });
    if (!supplier) throw error("SUPPLIER_NOT_FOUND");

    const purchaseOrder = await PurchaseOrder.create({
      cnpj,
      totalValue,
      observation,
    });

    const { id, createdAt } = purchaseOrder;

    return res
      .status(201)
      .json({ id, createdAt, message: "Order created successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`PurchaseOrderController - createPurchaseOrder: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function updatePurchaseOrder(req, res) {
  try {
    const { id } = req.params;
    const { totalValue, observation } = req.body;

    if (!totalValue || !id) throw error("REQUIRED_FIELD_MISSING");
    if (!Number(totalValue)) throw error("INVALID_FIELD_TYPE");

    const purchaseOrder = await PurchaseOrder.findById(id);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    await PurchaseOrder.findByIdAndUpdate(id, { totalValue, observation });

    return res.status(200).json({ message: "Order updated successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`PurchaseOrderController - updatePurchaseOrder: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function deletePurchaseOrder(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw error("REQUIRED_FIELD_MISSING");

    const purchaseOrder = await PurchaseOrder.findById(id);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    await PurchaseOrder.findByIdAndDelete(id);

    return res.status(200).json({ message: "Order deleted successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`PurchaseOrderController - deletePurchaseOrder: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function getPurchaseOrder(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw error("REQUIRED_FIELD_MISSING");

    const purchaseOrder = await PurchaseOrder.findById(id);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    return res.status(200).json(purchaseOrder);
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`PurchaseOrderController - getPurchaseOrder: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

module.exports = {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrder,
};
