const express = require('express');
const router = express.Router();

const controllerCustomer = require('../controllers/CustomerController');

router.post('/', controllerCustomer.createCustomer);
router.get('/:cpfCnpj', controllerCustomer.getCustomer);
router.put('/poits', controllerCustomer.updatePoits)

module.exports = router;