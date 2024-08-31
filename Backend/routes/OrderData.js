const express = require('express');
const Orders = require("../models/Order");
const router = express.Router();

router.post("/orderdata", async (req, res) => {
    const orderDetails = {
        Order_date: req.body.order_date,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        order_status: "Order Placed",
        items: req.body.order_data
    };

    try {
        let eID = await Orders.findOne({ email: req.body.email });

        if (eID === null) {
            await Orders.create({ email: req.body.email, order_data: [orderDetails] });
        } else {
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: orderDetails } }
            );
        }
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
