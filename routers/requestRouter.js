// const express = require('express');
// const router = express.Router();
// const requestController = require('../controller/requestController');

// // Middleware to check if user is logged in
// function isAuthenticated(req, res, next) {
//   if (req.session.user) return next();
//   res.redirect('/login');
// }

// router.get('/', isAuthenticated, requestController.showRequestForm);
// router.post('/', isAuthenticated, requestController.setRequest);

// module.exports = router;

// routes/requestRouter.js
const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestController');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, requestController.showRequestForm);
router.post('/', isAuthenticated, requestController.setRequest);

module.exports = router;

