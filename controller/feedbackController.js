const feedbackModel = require('../model/feedbackModel');

// Submit feedback from a user
const submitFeedback = (req, res) => {
  const userId = req.session.user.id;
  const { message } = req.body;
  feedbackModel.submitFeedback(userId, message, (err) => {
    if (err) return res.send('Could not submit feedback');
    res.redirect('/dashboard');
  });
};

// Get all feedback (for admin)
const getAllFeedback = (req, res) => {
  feedbackModel.getAllFeedback((err, results) => {
    if (err) return res.status(500).send('Database error fetching feedback');

    // Render a view or send JSON as needed
    res.render('feedbackList', { feedbacks: results }); // Example: render a view named 'feedbackList'
    // Or, if no view: res.json(results);
  });
};

// Delete feedback by ID (for admin)
const deleteFeedback = (req, res) => {
  const feedbackId = req.params.id;

  feedbackModel.deleteFeedback(feedbackId, (err) => {
    if (err) return res.status(500).send('Failed to delete feedback');
    res.redirect('/admin/feedback');
  });
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
};
