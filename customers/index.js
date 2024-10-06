require('dotenv').config();

const express = require('express');
const app = express();
const conn = require('./db/conn');

// Variables
const port = process.env.PORT || 3001;

// Routes
const routesCustomer = require('./routes/customerRoutes');

// Models
const Customer = require('./models/Customer');

app.use(express.json());

app.use('/api/customer', routesCustomer);

app.get('*', (req, res) => {
    res.send('Customers page');
});

conn.sync().then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});
