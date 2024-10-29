const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.post('/', orderController.createOrder);
router.put('/:idOrder', orderController.updateOrder);
router.delete('/:idOrder', orderController.deleteOrder);
router.get('/:idOrder', orderController.getOrder);

module.exports = router;