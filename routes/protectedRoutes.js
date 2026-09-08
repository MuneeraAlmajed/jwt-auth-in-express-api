const express = require('express');
const router = express.Router();

const isSignedIn = require('../middleware/isSignedIn');

router.get('/protected', isSignedIn, (req, res) => {
  const userPayload = req.user;

  res.status(200).json({ user: userPayload });
});

module.exports = router;