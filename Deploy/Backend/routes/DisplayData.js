const express = require("express");
const router = express.Router();

router.get('/pizzaData', (req, res) => {
    try {
        const responseData = {
            Pizza_Data: global.pizzaData,
        };
        res.status(200).send(responseData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
