const express = require('express');
const { requiresLogin, admin } = require('../middleware/auth');
const router = express.Router();
const controller = require('../controller').blog;


router.post('/blog', requiresLogin, admin, controller.create);
router.get('/blogs', controller.list);
router.post('/blogs-categories-tags', controller.listBlogsCategoriesTags);
router.get('/blog/:slug', controller.read);
router.delete('/blog/:slug', requiresLogin, admin, controller.delete);
router.put('/blog/:slug', requiresLogin, admin, controller.update);
router.get('/blog/photo/:slug', controller.photo);
router.post('/blogs/related', controller.listRelated);


module.exports = router;