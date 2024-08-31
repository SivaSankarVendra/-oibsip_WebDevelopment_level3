const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const JWT_Secret = process.env.Secret_key;

router.post(
  "/createuser",
  [
    body("name", "Incorrect Name").isLength({ min: 5 }),
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Email Id already exists" });
    }
    const salt = await bcryt.genSalt(10);
    const secPassword = await bcryt.hash(req.body.password, salt);
    try {
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_Secret);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
