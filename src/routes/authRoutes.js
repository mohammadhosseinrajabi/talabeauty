const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin signup route
router.post('/admin/signup', authController.adminSignup);

// Admin login route
router.post('/admin/login', authController.adminLogin);

module.exports = router; 