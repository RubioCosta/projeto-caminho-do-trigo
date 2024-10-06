const {DataTypes} = require('sequelize');

const conn = require('../db/conn');

const OrderItems = conn.define('OrderItems', {
    idOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    }
});

module.exports = OrderItems;