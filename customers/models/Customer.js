const { DataTypes } = require('sequelize');

const conn = require('../db/conn');

const Customer = conn.define('Customer', {
    cpfCnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },    
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        required: true,
        defaultValue: true
    }
});

module.exports = Customer;