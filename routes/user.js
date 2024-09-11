const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken'); 

router.get('/get-users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;