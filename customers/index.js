require("dotenv").config();

const express = require("express");
const app = express();
const { syncDatabase } = require("./db/conn");

// Variables
const port = process.env.PORT || 3001;

// Routes
const routesCustomer = require("./routes/customerRoutes");

app.use(express.json());

app.use("/api/v1/customer", routesCustomer);

app.get("*", (req, res) => {
  res.send("Customer Page");
});

syncDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1);
  });
