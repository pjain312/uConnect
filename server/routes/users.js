const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');
router.use('/posts', require('./posts'));

router.get('/profile', usersController.profile);
router.post('/update', usersController.update);
router.post('/create', usersController.create);
router.post('/sign-in', usersController.userLogin);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/sign-in' }),
  homeController.home
);

module.exports = router;
