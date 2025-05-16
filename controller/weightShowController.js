const weightShowModel = require('../model/weightShowModel');

exports.showWeightHistory = (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.redirect('/login');

  weightShowModel.getWeightsByUser(userId, (err, weights) => {
    if (err) {
      console.error('Error fetching weights:', err);
      return res.status(500).send('Database error');
    }
    res.render('weightShow', { weights });
  });
};