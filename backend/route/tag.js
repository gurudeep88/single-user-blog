const express = require('express');
const controller = require('../controller').tag;
const { validate, tag: validator } = require('../validator');
const { requiresLogin, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/tag', validator.create, validate, requiresLogin, admin, controller.create);
router.get('/tags', controller.list);
router.get('/tag/:slug', controller.read);
router.delete('/tag/:slug', requiresLogin, admin, controller.delete);

module.exports = router;