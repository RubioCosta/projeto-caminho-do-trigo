const express = require('express');
const router = express.Router();

const { 
  createOrderItem, 
  getOrderItems, 
  deleteOrderItem, 
  updateOrderItem 
} = require('../../../../controllers/OrderItemsController');

router.post('/', createOrderItem);
router.get('/:idOrder', getOrderItems);
router.delete('/:idItem', deleteOrderItem);
router.put('/:idItem', updateOrderItem);

module.exports = router;
