var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

var User = require('../models/user');
var Case = require('../models/case');

// Members Page
router.get('/', ensureAuthenticated, function(req, res, next) {
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

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

module.exports = router;
