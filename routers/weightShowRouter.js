const express = require('express');
const router = express.Router();
const weightShowController = require('../controller/weightShowController');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, weightShowController.showWeightHistory);

module.exports = router;