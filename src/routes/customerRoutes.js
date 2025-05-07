const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const barberRequestController = require('../controllers/barberRequestController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', customerController.signup);
router.post('/login', customerController.validateLogin, customerController.login);

// Protected routes
router.use(authMiddleware.customerAuth);

// Profile routes
router.get('/profile', customerController.getProfile);
router.put('/profile', customerController.updateProfile);

// Barber request routes
router.post('/requests', barberRequestController.createRequest);
router.get('/requests', barberRequestController.getCustomerRequests);
router.get('/requests/:id', barberRequestController.getRequest);
router.put('/requests/:id/cancel', barberRequestController.cancelRequest);

module.exports = router; 