require('dotenv').config()

const jayson = require('jayson');
const { syncDatabase } = require('./db/conn');

const PORT = process.env.PORT;

// Controller
const IngredientsController = require('./controller/IngredientsController');
const ProductsController = require('./controller/ProductsController');

const server = jayson.server({
  ...IngredientsController,
  ...ProductsController
});

syncDatabase()
  .then(() => {
    server.http().listen(PORT, () => {
      console.log(`Conectado na porta ${PORT}`);
    })
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1);
  });
