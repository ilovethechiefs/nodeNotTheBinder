var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

var User = require('../models/user');
var Case = require('../models/case');

// Members Page
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('admin', { title: 'Admin' });
});

router.get('/addcase', ensureAuthenticated, function(req, res, next) {
  res.render('addcase', { title: 'Add Case'});
})

router.get('/displaycases', ensureAuthenticated, function(req, res, next) {
  Case.find({}, function (err, db_cases) {
    if(err) throw err;
    res.render('displaycases', {
      cases: db_cases
    });
    console.log(db_cases)
  });
});

router.get('/adduser', ensureAuthenticated, function(req, res, next) {
  res.render('adduser', { title: 'Add User'});
})

router.get('/displayusers', ensureAuthenticated, function(req, res, next) {
  User.find({}, function (err, db_users) {
    if(err) throw err;
    res.render('displayusers', {
      users: db_users
    });
  });
});


router.post('/addcase', function(req, res, next){
  // Get Form Values
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var dob = req.body.dob;
  var dos = req.body.dos;
  
  // Form Validation
  req.checkBody('firstname', 'First name is required').notEmpty();
  req.checkBody('lastname', 'Last name is required').notEmpty();
  req.checkBody('dob', 'Date of birth is required').notEmpty();
  req.checkBody('dos', 'Date of service is required').notEmpty();

  // Check for errors
  var errors = req.validationErrors();

  if(errors){
    res.render('addcase', {
      errors: errors,
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      dos: dos
    });
  } else {
    var newCase = new Case({
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      dos: dos,
    });

    // Create User
    Case.createCase(newCase, function(err, newCase) {
      if(err) throw err;
      console.log(newCase);
    });

    // Success Message
    req.flash('success', 'Case submitted');

    res.location('/admin');
    res.redirect('/admin');
  }
});

router.post('/adduser', function(req, res, next){
  // Get Form Values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Form Validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'E-mail field is required').notEmpty();
  req.checkBody('email', 'Please enter a valid email address').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password2', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check for errors
  var errors = req.validationErrors();

  if(errors){
    res.render('adduser', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    // Create User
    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    // Success Message
    req.flash('success', 'You are now registered and may log in');

    res.location('/');
    res.redirect('/');
  }
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

module.exports = router;
