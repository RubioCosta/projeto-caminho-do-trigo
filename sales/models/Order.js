const { DataTypes } = require('sequelize');

const { conn } = require('../db/conn');

const Order = conn.define('Order', {
  cpfCnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  idTaxCoupon: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  totalValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    required: true
  },
  paymentMethod: {
    type: DataTypes.ENUM('credit', 'debit', 'cash'),
    allowNull: false,
    required: true
  },
  typeSale: {
    type: DataTypes.ENUM('physical', 'online'),
    allowNull: false,
    required: true
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false,
    required: true
  }
});

module.exports = Order;