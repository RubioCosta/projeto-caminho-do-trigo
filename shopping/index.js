require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const { syncDatabase } = require("./db/conn");
const router = require("./routes");

// Variables
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.use(cors({ origin: `${BASE_URL}:${PORT}` }));
app.use(express.json());

app.use("/api", router);

syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
