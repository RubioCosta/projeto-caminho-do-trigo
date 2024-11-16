const express = require('express');
const router = express.Router();

const { 
  createOrder, 
  updateOrder, 
  deleteOrder, 
  getOrder 
} = require('../../../../controllers/OrderController');

router.post('/', createOrder);
router.put('/:idOrder', updateOrder);
router.delete('/:idOrder', deleteOrder);
router.get('/:idOrder', getOrder);

module.exports = router;
