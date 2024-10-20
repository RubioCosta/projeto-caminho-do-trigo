const jayson = require('jayson');

// Controller
import PurchaseOrderController from './controller/PurchaseOrderController';

const server = jayson.server({
  ...PurchaseOrderController
});

server.http().listen(8081, () => {
    console.log("Conectado na porta 8081");
});