const express = require("express");
const router = express.Router();

const {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
} = require("../../../../controller/SupplierController");

router.post("/", createSupplier);
router.put("/:cnpj", updateSupplier);
router.delete("/:cnpj", deleteSupplier);
router.get("/:cnpj", getSuppliers);

module.exports = router;
