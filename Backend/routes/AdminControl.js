const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Query=require('../models/Query')

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const status = req.body.order_status;

        const validStatuses = ['Placed', 'Prepared', 'On the way', 'Delivered'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findOneAndUpdate(
            { 'order_data._id': orderId },
            { $set: { 'order_data.$.status': status } },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated successfully', order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/messages',async(req,res)=>{
    try{
        const query=await Query.find()
        res.json(query)
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
