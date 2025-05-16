const logModel = require('../model/logModel');

const addLog = (req, res) => {
  const userId = req.session.user.id;
  const { type, description } = req.body; // type = 'meal' or 'exercise'
  logModel.addLog(userId, type, description, (err) => {
    if (err) return res.send('Failed to log');
    res.redirect('/logs');
  });
};

const getLogs = (req, res) => {
  const userId = req.session.user.id;
  logModel.getLogsByUser(userId, (err, results) => {
    if (err) return res.send('Could not fetch logs');
    res.render('logs', { logs: results });
  });
};

module.exports = { addLog, getLogs };
