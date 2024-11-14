const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomer,
  updatePoints,
} = require("../controllers/CustomerController");

router.post("/", createCustomer);
router.get("/:cpfCnpj", getCustomer);
router.put("/points", updatePoints);

module.exports = router;
