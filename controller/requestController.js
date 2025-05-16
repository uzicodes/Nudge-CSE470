const requestModel = require('../model/requestModel');

const setRequest = (req, res) => {
  const userId = req.session.user.id;
  const meal = req.body.meal === 'on' ? 1 : 0;
  const exercise = req.body.exercise === 'on' ? 1 : 0;

  requestModel.setRequestFlags(userId, meal, exercise, (err) => {
    if (err) return res.send('Could not set request');
    res.redirect('/dashboard');
  });
};

// ...existing code...
module.exports = {
  showRequestForm,
  setRequest
};
