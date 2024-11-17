const { DataTypes } = require("sequelize");

const { conn } = require("../db/conn");

const PurchaseOrder = require("./PurchaseOrder");

const PurchaseOrderItem = conn.define("PurchaseOrderItem", {
  idIngredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requestedGrammage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: "idPurchaseOrder" });

module.exports = PurchaseOrderItem;
