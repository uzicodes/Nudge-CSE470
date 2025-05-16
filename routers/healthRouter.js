const express = require('express');
const router = express.Router();
const path = require('path');

// Health calculators page
router.get('/calculators', (req, res) => {
    try {
        res.render('calculators', {
            title: 'Health Calculators',
            calculator: null,
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds: null,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error rendering calculators page:', error);
        res.status(500).send('Error loading calculators page');
    }
});

// BMI Calculator
router.get('/calculators/bmi', (req, res) => {
    try {
        res.render('calculators', {
            title: 'BMI Calculator',
            calculator: 'bmi',
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds: null,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error rendering BMI calculator:', error);
        res.status(500).send('Error loading BMI calculator');
    }
});

// BMI Calculator POST
router.post('/calculators/bmi', (req, res) => {
    try {
        const weight = parseFloat(req.body.weight);
        const height = parseFloat(req.body.height);
        
        if (!weight || !height) {
            throw new Error('Weight and height are required');
        }

        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        let bmiCategory;
        if (bmi < 18.5) {
            bmiCategory = 'Underweight';
        } else if (bmi < 25) {
            bmiCategory = 'Normal Weight';
        } else if (bmi < 30) {
            bmiCategory = 'Overweight';
        } else {
            bmiCategory = 'Obese';
        }

        // Log the values for debugging
        console.log('BMI Calculation:', {
            weight,
            height,
            heightInMeters,
            bmi,
            bmiCategory
        });

        res.render('calculators', {
            title: 'BMI Calculator',
            calculator: 'bmi',
            user: req.session.user || null,
            bmi: bmi,
            bmiCategory: bmiCategory,
            caloricNeeds: null,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error calculating BMI:', error);
        res.status(500).send('Error calculating BMI: ' + error.message);
    }
});

// Calorie Calculator
router.get('/calculators/calories', (req, res) => {
    try {
        res.render('calculators', {
            title: 'Calorie Calculator',
            calculator: 'calories',
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds: null,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error rendering calorie calculator:', error);
        res.status(500).send('Error loading calorie calculator');
    }
});

// Calorie Calculator POST
router.post('/calculators/calories', (req, res) => {
    try {
        const { weight, height, age, activity } = req.body;
        
        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr = 10 * weight + 6.25 * height - 5 * age;
        bmr = bmr + 5; // Add 5 for men, subtract 161 for women (assuming male for now)
        
        // Apply activity multiplier
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            very: 1.725,
            extra: 1.9
        };
        
        const caloricNeeds = Math.round(bmr * activityMultipliers[activity]);

        res.render('calculators', {
            title: 'Calorie Calculator',
            calculator: 'calories',
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error calculating calories:', error);
        res.status(500).send('Error calculating calories');
    }
});

// Body Fat Calculator
router.get('/calculators/bodyfat', (req, res) => {
    try {
        res.render('calculators', {
            title: 'Body Fat Calculator',
            calculator: 'bodyfat',
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds: null,
            bodyFat: null
        });
    } catch (error) {
        console.error('Error rendering body fat calculator:', error);
        res.status(500).send('Error loading body fat calculator');
    }
});

// Body Fat Calculator POST
router.post('/calculators/bodyfat', (req, res) => {
    try {
        const { weight, height, waist, neck, hip } = req.body;
        
        // Using US Navy Body Fat Calculator formula
        // For men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        // For women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        
        let bodyFat;
        if (hip) { // If hip measurement is provided, assume female
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        } else { // Otherwise assume male
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        }
        
        bodyFat = Math.round(bodyFat * 10) / 10; // Round to 1 decimal place

        res.render('calculators', {
            title: 'Body Fat Calculator',
            calculator: 'bodyfat',
            user: req.session.user || null,
            bmi: null,
            bmiCategory: null,
            caloricNeeds: null,
            bodyFat
        });
    } catch (error) {
        console.error('Error calculating body fat:', error);
        res.status(500).send('Error calculating body fat');
    }
});

// Health home page
router.get('/', (req, res) => {
    res.send('Health router working!');
});

module.exports = router;
