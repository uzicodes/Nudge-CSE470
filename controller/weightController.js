const weightModel = require('../model/weightModel');

exports.showWeightPage = (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.redirect('/login');

  weightModel.getWeightsByUser(userId, (err, weights) => {
    if (err) {
      console.error('Error fetching weights:', err);
      return res.status(500).send('Database error');
    }
    res.render('weights', { weights });
  });
};

exports.addWeight = (req, res) => {
  const userId = req.session.user?.id;
  const { currentWeight } = req.body;

  if (!userId || !currentWeight) {
    return res.status(400).send('Invalid input');
  }

  weightModel.addWeight(userId, currentWeight, (err) => {
    if (err) {
      console.error('Error adding weight:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/weight');
  });
};