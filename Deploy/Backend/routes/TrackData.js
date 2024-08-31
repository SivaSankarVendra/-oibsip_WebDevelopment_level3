const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params; 
        const order = await Order.findOne({ 'order_data._id': orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const orderData = order.order_data.find(item => item._id.toString() === orderId);

        if (!orderData) {
            return res.status(404).json({ message: 'Order data not found' });
        }
        res.json({ status: orderData.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
