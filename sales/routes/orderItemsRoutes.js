const express = require('express');
const router = express.Router();

const controllerOrderItems = require('../controllers/OrderItemsController');

router.post('/', controllerOrderItems.createOrderItem);
router.get('/:idOrder', controllerOrderItems.getOrderItems);
router.delete('/:idItem', controllerOrderItems.deleteOrderItem);
router.put('/:idItem', controllerOrderItems.updateOrderItem);

module.exports = router;