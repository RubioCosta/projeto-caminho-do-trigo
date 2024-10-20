const jayson = require('jayson');

// Controller
import IngredientsController from './controller/IngredientsController';

const server = jayson.server({
  ...IngredientsController
});

server.http().listen(8081, () => {
    console.log("Conectado na porta 8081");
});