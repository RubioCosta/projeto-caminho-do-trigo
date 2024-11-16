const express = require("express");
const router = express.Router();

router.use("/v1/customer", require("./v1/customer"));

router.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = router;
