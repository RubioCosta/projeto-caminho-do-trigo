const express = require("express");
const router = express.Router();

const {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrder,
} = require("../../../../controller/PurchaseOrderController");

router.post("/", createPurchaseOrder);
router.put("/:id", updatePurchaseOrder);
router.delete("/:id", deletePurchaseOrder);
router.get("/:id", getPurchaseOrder);

module.exports = router;
