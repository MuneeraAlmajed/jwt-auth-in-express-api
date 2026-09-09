const express = require('express');
const router = express.Router();
const User = require('../models/user');

const isSignedIn = require('../middleware/isSignedIn');

router.get('/protected', isSignedIn, (req, res) => {
  try {
    const userPayload = req.user;

    res.status(200).json({
      user: userPayload
    });
  } catch (err) {
    res.status(500).json({
      err: 'Something went wrong'
    });
  }
});

router.get('/users', isSignedIn, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      err: 'Something went wrong'
    });
  }
});

module.exports = router;