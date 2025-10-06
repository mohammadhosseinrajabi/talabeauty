const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Customer = require('../models/Customer');

// Admin authentication middleware
exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'لطفاً وارد شوید' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await User.findOne({ _id: decoded.userId, role: 'admin' });

        if (!admin) {
            return res.status(401).json({ message: 'دسترسی غیرمجاز' });
        }

        req.user = admin;
        req.user.id = admin._id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'لطفاً وارد شوید' });
    }
};

// User authentication middleware (for both admin and regular users)
exports.userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'لطفاً وارد شوید' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'دسترسی غیرمجاز' });
        }

        req.user = user;
        req.user.id = user._id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'لطفاً وارد شوید' });
    }
};

// Customer authentication middleware
exports.customerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'لطفاً وارد شوید' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customer.findById(decoded.customerId);

        if (!customer) {
            return res.status(401).json({ message: 'دسترسی غیرمجاز' });
        }

        req.customerId = customer._id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'لطفاً وارد شوید' });
    }
}; 