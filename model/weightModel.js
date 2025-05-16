const db = require('./db');

const addWeight = (userId, currentWeight, callback) => {
  const query = `INSERT INTO weights (user_id, current_weight) VALUES (?, ?)`;
  db.query(query, [userId, currentWeight], callback);
};

const getWeightsByUser = (userId, callback) => {
  const query = `SELECT * FROM weights WHERE user_id = ? ORDER BY logged_at DESC`;
  db.query(query, [userId], callback);
};

module.exports = { addWeight, getWeightsByUser };