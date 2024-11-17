const express = require('express');
const router = express.Router();

const { 
  createPurchaseOrderItem, 
  deletePurchaseOrderItem,
  getPurchaseOrderItem,
  updatePurchaseOrderItem 
} = require('../../../../controller/PurchaseOrderItemController');

router.post('/', createPurchaseOrderItem);
router.get('/:id', getPurchaseOrderItem);
router.put('/:id', updatePurchaseOrderItem);
router.delete('/:id', deletePurchaseOrderItem);

module.exports = router;
