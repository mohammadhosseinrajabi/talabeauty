
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Customer = require('../models/Customer');

// A middleware that accepts either user or customer tokens (single-pass)
const anyAuth = async (req, res, next) => {
  try {
    const header = req.header('Authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'لطفاً وارد شوید' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try user first
    if (decoded && decoded.userId) {
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
        req.user.id = user._id;
        return next();
      }
    }

    // Then try customer
    if (decoded && decoded.customerId) {
      const customer = await Customer.findById(decoded.customerId);
      if (customer) {
        req.customerId = customer._id;
        return next();
      }
    }

    return res.status(401).json({ message: 'دسترسی غیرمجاز' });
  } catch (err) {
    if (!res.headersSent) {
      return res.status(401).json({ message: 'لطفاً وارد شوید' });
    }
  }
};

router.get('/', anyAuth, cartController.getCart);
router.post('/add', anyAuth, cartController.addItem);
router.put('/update', anyAuth, cartController.updateItem);
router.delete('/remove/:productId', anyAuth, cartController.removeItem);
router.delete('/clear', anyAuth, cartController.clearCart);

module.exports = router;



