const { DataTypes } = require("sequelize");

const { conn } = require("../db/conn");

const Supplier = conn.define("Supplier", {
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Supplier;
