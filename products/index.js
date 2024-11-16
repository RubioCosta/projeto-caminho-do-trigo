require('dotenv').config()

const jayson = require('jayson');
const { syncDatabase } = require('./db/conn');

const PORT = process.env.PORT_PRODUCTS;

// Controller
const IngredientsController = require('./controller/IngredientsController');

const server = jayson.server({
  ...IngredientsController
});

syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1);
  });
