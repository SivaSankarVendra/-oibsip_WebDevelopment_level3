const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const JWT_SECRET = process.env.Secret_key;

router.post(
  "/loginuser",
  [
    body("email", "Invalid email address").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const payload = { id: user.id, role: user.role }; 
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 

      res.json({ success: true, token, userRole: user.role }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
