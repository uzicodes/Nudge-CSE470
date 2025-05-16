const express = require('express');
const router = express.Router();
const weightController = require('../controller/weightController');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, weightController.showWeightPage);
router.post('/add', isAuthenticated, weightController.addWeight);

module.exports = router;