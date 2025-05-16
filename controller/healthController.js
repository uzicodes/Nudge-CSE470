const db = require('../model/db');
const { calculateBMI, calculateCaloricNeeds, calculateBodyFat } = require('../utils/calculationHelpers');

exports.showCalculators = (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.redirect('/login');

  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) return res.status(500).send('Failed to retrieve user data');

    const user = results[0];
    
    // Perform calculations
    const { bmi, category } = calculateBMI(user.weight, user.height);
    const caloricNeeds = calculateCaloricNeeds(user.weight, user.height, user.age, user.gender, 'moderate');
    const bodyFat = calculateBodyFat(user.gender, user.height, user.neck_circumference, user.belly_circumference);

    res.render('calculators', {
      bmi,
      bmiCategory: category,
      caloricNeeds,
      bodyFat
    });
  });
};
