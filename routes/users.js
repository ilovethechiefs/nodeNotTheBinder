var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    'title': 'Login'
  });
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user){
        console.log('Unknown User');
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}), function(req, res){
  console.log('Authentication Successful');
  if (req.user.username == 'Debbie') {
    res.redirect('/calendar/culican');
  } else if (req.user.username == 'Kathleen') {
    res.redirect('/calendar/lueder');
  } else if (req.user.username == 'admin'){
    res.redirect('/admin');
  } else {
    res.redirect('/calendar/tychsen');
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/users/login');
});

module.exports = router;
