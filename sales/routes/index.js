const express = require('express');
const router = express.Router();

router.use('/v1/order', require('./v1/order/orderRoutes'));
router.use('/v1/order-items', require('./v1/order/orderItemsRoutes'));

module.exports = router;
