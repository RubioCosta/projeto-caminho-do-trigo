const express = require('express');
const router = express.Router();

const controllerCustomer = require('../controllers/CustomerController');

router.post('/create', controllerCustomer.createCustomer);
router.get('/:cpfCnpj', controllerCustomer.getCustomer);

module.exports = router;