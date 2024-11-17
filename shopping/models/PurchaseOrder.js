const { DataTypes } = require("sequelize");

const { conn } = require("../db/conn");

const PurchaseOrder = conn.define("PurchaseOrder", {
  cnpjSupplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  observation: {
    type: DataTypes.STRING,
  },
});

module.exports = PurchaseOrder;
