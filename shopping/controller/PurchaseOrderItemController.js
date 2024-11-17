// Utils
const { error } = require("../utils/utils");

// Models
const PurchaseOrderItem = require("../models/PurchaseOrderItem");
const PurchaseOrder = require("../models/PurchaseOrder");

// Service
const Product = require("../service/ProductService");

async function createPurchaseOrderItem(req, res) {
  try {
    const { requestedGrammage, idIngredient, idPurchaseOrder } = req.body;

    if (!requestedGrammage || !idIngredient || !idPurchaseOrder)
      throw error("REQUIRED_FIELD_MISSING");
    if (!Number(requestedGrammage)) throw error("INVALID_FIELD_TYPE");

    const purchaseOrder = await PurchaseOrder.findById(idPurchaseOrder);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    const product = await Product.findIngredientById(idIngredient);
    if (!product) throw error("INGREDEINT_NOT_FOUND");

    const purchaseOrderItem = await PurchaseOrderItem.create({
      requestedGrammage,
      idIngredient,
      idPurchaseOrder,
    });

    const { id, createdAt } = purchaseOrderItem;

    return res
      .status(201)
      .json({ id, createdAt, message: "Item created successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(
      `PurchaseOrderItemController - createPurchaseOrderItem: ${err}`,
    );
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function updatePurchaseOrderItem(req, res) {
  try {
    const { id } = req.params;
    const { requestedGrammage, idIngredient, idPurchaseOrder } = req.body;

    if (!requestedGrammage || !idIngredient || !id || !idPurchaseOrder)
      throw error("REQUIRED_FIELD_MISSING");
    if (!Number(requestedGrammage)) throw error("INVALID_FIELD_TYPE");

    const purchaseOrder = await PurchaseOrder.findById(idPurchaseOrder);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    const purchaseOrderItem = await PurchaseOrderItem.findById(id);
    if (!purchaseOrderItem) throw error("ORDER_ITEM_NOT_FOUND");

    const product = await Product.findIngredientById(idIngredient);
    if (!product) throw error("INGREDEINT_NOT_FOUND");

    await PurchaseOrderItem.findByIdAndUpdate(id, {
      requestedGrammage,
      idIngredient,
    });

    return res.status(200).json({ message: "Item updated successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(
      `PurchaseOrderItemController - updatePurchaseOrderItem: ${err}`,
    );
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function deletePurchaseOrderItem(req, res) {
  try {
    const { id } = req.params;
    const { idPurchaseOrder } = req.body;

    if (!id || !idPurchaseOrder) throw error("REQUIRED_FIELD_MISSING");

    const purchaseOrder = await PurchaseOrder.findById(idPurchaseOrder);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    const purchaseOrderItem = await PurchaseOrderItem.findById(id);
    if (!purchaseOrderItem) throw error("ORDER_ITEM_NOT_FOUND");

    await PurchaseOrderItem.findByIdAndDelete(id);

    return res.status(200).json({ message: "Item deleted successfully." });
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(
      `PurchaseOrderItemController - deletePurchaseOrderItem: ${err}`,
    );
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

async function getPurchaseOrderItem(req, res) {
  try {
    const { id } = req.params;
    const { idPurchaseOrder } = req.body;

    if (!idPurchaseOrder || !id) throw error("REQUIRED_FIELD_MISSING");

    const purchaseOrder = await PurchaseOrder.findById(idPurchaseOrder);
    if (!purchaseOrder) throw error("ORDER_NOT_FOUND");

    const purchaseOrderItem = await PurchaseOrderItem.findOne({
      where: { id, idPurchaseOrder },
    });
    if (!purchaseOrderItem) throw error("ORDER_ITEM_NOT_FOUND");

    return res.status(200).json(purchaseOrderItem);
  } catch (err) {
    if (err.code)
      return res
        .status(err.httpStatusCode)
        .json({ code: err.code, message: err.message });

    console.log(`PurchaseOrderItemController - getPurchaseOrderItem: ${err}`);
    const { httpStatusCode, code, message } = error("INTERNAL_SERVER_ERROR");
    res.status(httpStatusCode).json({ code, message });
  }
}

module.exports = {
  createPurchaseOrderItem,
  updatePurchaseOrderItem,
  deletePurchaseOrderItem,
  getPurchaseOrderItem,
};
