const express = require("express");
const router = express.Router();

router.use(
  "/v1/purchase-order",
  require("./v1/shopping/PurchaseOrderRoutes"),
);
router.use(
  "/v1/supplier",
  require("./v1/shopping/supplierRoutes"),
);
router.use(
  "/v1/purchase-order-item",
  require("./v1/shopping/purchaseOrderItemsRoutes"),
);

router.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = router;
