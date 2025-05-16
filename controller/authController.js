// controller/authController.js

const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.send('All fields required');

  const hashedPassword = await bcrypt.hash(password, 10);
  userModel.createUser({ name, email, password: hashedPassword }, (err) => {
    if (err) return res.send('Registration failed');
    res.redirect('/login');
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  userModel.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) return res.send('Invalid credentials');
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.send('Wrong password');

    req.session.user = results[0];
    res.redirect('/dashboard');
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = { register, login, logout };
