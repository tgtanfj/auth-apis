const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken'); 

// router.get('/get-users', authenticateToken, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get('/get-users', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const users = await User.find({})
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalUsers,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/get-user-by-id/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/update-user-by-id/:id', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, address, age, job } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, address, age, job },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;