const db = require('./db');

const submitFeedback = (user_id, message, callback) => {
  db.query(
    'INSERT INTO feedback (user_id, message) VALUES (?, ?)',
    [user_id, message],
    callback
  );
};

const getAllFeedback = (callback) => {
  const query = 'SELECT * FROM feedback ORDER BY created_at DESC'; // adjust table/column names as needed
  db.query(query, callback);
};

const deleteFeedback = (feedbackId, callback) => {
  const query = 'DELETE FROM feedback WHERE id = ?';
  db.query(query, [feedbackId], callback);
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
};
