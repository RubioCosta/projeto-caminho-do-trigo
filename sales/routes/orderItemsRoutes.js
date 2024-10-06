const express = require('express');
const router = express.Router();

const controllerOrderItems = require('../controllers/OrderItemsController');

router.post('/create-item', controllerOrderItems.createOrderItem);

module.exports = router;