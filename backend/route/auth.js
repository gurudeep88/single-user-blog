const express = require('express');
const controller = require('../controller').auth;
const {validate, auth: validator} = require('../validator');
const router = express.Router();

router.post('/register', validator.register, validate, controller.register);
router.post('/login', validator.login, validate, controller.login);
router.get('/logout', controller.logOut);


// router.get('/secret', auth.requiresLogin, (req, res) => {
//     console.log('req', req.auth);
//     res.json({
//         user: req.auth
//     })
// })

module.exports = router;
