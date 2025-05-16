// ==== app.js ====
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const authRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');
const healthRouter = require('./routers/healthRouter');
const logRouter = require('./routers/logRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const adminRouter = require('./routers/adminRouter');
const weightRouter = require('./routers/weightRouter');
const weightShowRouter = require('./routers/weightShowRouter');

const feedbackController = require('./controller/feedbackController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'nudge-secret',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/health', healthRouter);
app.use('/logs', logRouter);
app.use('/feedback', feedbackRouter);
app.use('/admin', adminRouter);
app.use('/weight', weightRouter);
app.use('/weightShow', weightShowRouter);

app.get('/', (req, res) => {
  res.render('index'); // Ensure you have an index.ejs file in your views folder
});

app.listen(port, () => {
  console.log(`Nudge app running at http://localhost:${port}`);
});
