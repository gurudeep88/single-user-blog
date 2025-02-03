const express = require('express');
const { validate, category: validator } = require('../validator');
const controller = require('../controller').category;
const { requiresLogin, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/category', validator.create, validate, requiresLogin, admin, controller.create);
router.get('/category/:slug', controller.read);
router.get('/categories', controller.list);
router.delete('/category/:slug', requiresLogin, admin, controller.delete);

module.exports = router;