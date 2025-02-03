const express = require('express');
const auth = require('../middleware/auth');
const { read } = require('../controller/user');
const router = express.Router();

router.get('/profile', auth.requiresLogin, auth.user, read);

module.exports = router;