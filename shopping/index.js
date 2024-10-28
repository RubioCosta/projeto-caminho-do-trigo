require('dotenv').config();
const jayson = require('jayson');
const conn = require('./db/conn');

const PORT_SHOPPING = process.env.PORT_SHOPPING

// Controller
const PurchaseOrderController = require('./controller/PurchaseOrderController');

const server = jayson.server({
  ...PurchaseOrderController
});

conn.sync().then(() => {
  server.http().listen(PORT_SHOPPING, () => {
    console.log(`Conectado na porta ${PORT_SHOPPING}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});