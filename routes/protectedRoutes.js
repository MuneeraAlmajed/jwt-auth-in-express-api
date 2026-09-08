const express = require('express');
const router = express.Router();

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

module.exports = router;