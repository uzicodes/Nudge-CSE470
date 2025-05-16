const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
}

router.get('/', isAuthenticated, (req, res) => {
    try {
        res.render('profile', {
            title: 'My Profile',
            user: req.session.user
        });
    } catch (error) {
        console.error('Error rendering profile page:', error);
        res.status(500).send('Error loading profile page');
    }
});

router.post('/update', isAuthenticated, profileController.updateProfile);

module.exports = router;
