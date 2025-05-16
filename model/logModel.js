const db = require('./db');

const addLog = (user_id, type, description, callback) => {
  db.query(
    'INSERT INTO logs (user_id, type, description) VALUES (?, ?, ?)',
    [user_id, type, description],
    callback
  );
};

const getLogsByUser = (user_id, callback) => {
  db.query('SELECT * FROM logs WHERE user_id = ?', [user_id], callback);
};

module.exports = { addLog, getLogsByUser };
