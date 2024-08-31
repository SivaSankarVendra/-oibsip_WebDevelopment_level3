const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Query.create({ name, email, message });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

module.exports = router;
