const express = require('express');
const Orders = require('../models/Order');
const router = express.Router();

router.get('/myorders', async (req, res) => {
    try {
        const email = req.query.email;
        const orders = await Orders.find({ email: email });
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'No orders found for this user.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
