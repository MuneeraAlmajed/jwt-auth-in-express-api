const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');


const authCtrl = require('../controllers/authCtrl');

router.post('/sign-up',isSignedIn, authCtrl.signup);
router.post('/sign-in', authCtrl.login);

module.exports = router;