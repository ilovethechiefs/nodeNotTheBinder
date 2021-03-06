var express = require('express');
var router = express.Router();

// Routing for individual calendars
router.get('/tychsen', function(req, res, next) {
  res.render('calendar', { title: 'Tychsen' });
});

router.get('/lueder', function(req, res, next) {
  res.render('calendar', { title: 'Lueder' });
});

router.get('/culican', function(req, res, next) {
  res.render('calendar', { title: 'Culican' });
});

module.exports = router;
