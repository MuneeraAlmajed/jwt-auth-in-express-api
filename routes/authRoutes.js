const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl');

router.post('/sign-up', authCtrl.signup);
router.post('/sign-in', authCtrl.login);

module.exports = router;