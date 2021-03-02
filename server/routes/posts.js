const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller');

router.post('/create', postsController.create);
router.get('/destroy', postsController.destroy);

module.exports = router;
