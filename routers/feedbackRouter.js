const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Feedback router working!');
});

module.exports = router;
