const db = require('../model/db');

exports.viewRequests = (req, res) => {
  const query = `
    SELECT requests.id, users.name, users.email, users.age, users.height, users.weight, users.goal_weight,
           requests.meal_plan_requested, requests.exercise_suggestion_requested
    FROM requests
    JOIN users ON users.id = requests.user_id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.render('adminRequests', { requests: results });
  });
};

exports.resolveRequest = (req, res) => {
  const requestId = req.params.id;

  db.query('DELETE FROM requests WHERE id = ?', [requestId], (err) => {
    if (err) return res.status(500).send('Failed to resolve request');
    res.redirect('/admin/requests');
  });
};
