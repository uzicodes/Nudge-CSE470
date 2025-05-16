const db = require('./db');

const getWeightsByUser = (userId, callback) => {
  const query = `SELECT * FROM weights WHERE user_id = ? ORDER BY logged_at DESC`;
  db.query(query, [userId], callback);
};

module.exports = { getWeightsByUser };