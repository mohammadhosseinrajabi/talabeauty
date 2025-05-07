const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Validation middleware for login
exports.validateLogin = [
    body('email')
        .isEmail()
        .withMessage('لطفا یک ایمیل معتبر وارد کنید')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('رمز عبور الزامی است')
];

// Customer signup
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, gender, address } = req.body;

        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'این ایمیل قبلاً ثبت‌نام شده است' });
        }

        // Create new customer
        const customer = new Customer({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            gender,
            address
        });

        await customer.save();

        // Generate JWT token
        const token = jwt.sign(
            { customerId: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'ثبت‌نام با موفقیت انجام شد',
            token,
            customer: {
                id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phoneNumber: customer.phoneNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Customer login
exports.login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find customer by email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({
                success: false,
                message: 'ایمیل یا رمز عبور اشتباه است'
            });
        }

        // Check password
        const isMatch = await customer.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'ایمیل یا رمز عبور اشتباه است'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                customerId: customer._id,
                email: customer.email,
                role: 'customer'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return success response
        res.json({
            success: true,
            message: 'ورود موفقیت‌آمیز',
            token,
            customer: {
                id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                gender: customer.gender,
                address: customer.address
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در سرور',
            error: error.message
        });
    }
};

// Get customer profile
exports.getProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.customerId).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'مشتری یافت نشد' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update customer profile
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.customerId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!customer) {
            return res.status(404).json({ message: 'مشتری یافت نشد' });
        }

        res.json({
            message: 'پروفایل با موفقیت بروزرسانی شد',
            customer
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 