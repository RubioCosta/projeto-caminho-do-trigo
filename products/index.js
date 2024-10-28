require('dotenv').config()
const jayson = require('jayson');
const conn = require('./db/conn');

const PORT_PRODUCTS = process.env.PORT_PRODUCTS;

// Controller
const IngredientsController = require('./controller/IngredientsController');

const server = jayson.server({
  ...IngredientsController
});

conn.sync().then(() => {
  server.http().listen(PORT_PRODUCTS, () => {
    console.log(`Conectado na porta ${PORT_PRODUCTS}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});