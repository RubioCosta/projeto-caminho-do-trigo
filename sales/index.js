require('dotenv').config();

const express = require('express');
const app = express();
const conn = require('./db/conn');

// Variables
const port = process.env.PORT || 3000;

// Routes
const routesOrderItems = require('./routes/orderItemsRoutes');
const routesOrder = require('./routes/orderRoutes');

// Models
const OrderItem = require('./models/OrderItem');

app.use(express.json());

app.use('/api/v1/order-items', routesOrderItems);
app.use('/api/v1/order', routesOrder);

app.get('*', (req, res) => {
    res.send('Sales page');
});

conn.sync().then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});
