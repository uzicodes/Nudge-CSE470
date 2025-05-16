const db = require('./db');

const setRequestFlags = (user_id, meal, exercise, callback) => {
  db.query(
    `INSERT INTO requests (user_id, meal_plan_requested, exercise_suggestion_requested)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
     meal_plan_requested = VALUES(meal_plan_requested),
     exercise_suggestion_requested = VALUES(exercise_suggestion_requested)`,
    [user_id, meal, exercise],
    callback
  );
};

const getRequestFlags = (user_id, callback) => {
  db.query('SELECT * FROM requests WHERE user_id = ?', [user_id], callback);
};

module.exports = { setRequestFlags, getRequestFlags };
