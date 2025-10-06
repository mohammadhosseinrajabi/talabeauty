const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { verifyCaptcha } = require('./captcha.controller');

// Signup for admin
exports.adminSignup = async (req, res) => {
    try {
        const { name, email, password, phone, adminCode } = req.body;

        // Check if admin code is valid (you should store this in environment variables)
        if (adminCode !== process.env.ADMIN_CODE) {
            return res.status(401).json({ message: 'کد ادمین نامعتبر است' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'این ایمیل قبلاً ثبت‌نام شده است' });
        }

        // Create new admin user
        const admin = new User({
            name,
            email,
            password,
            phone,
            role: 'admin'
        });

        await admin.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'ادمین با موفقیت ثبت‌نام شد',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login for admin
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        // Find admin by email
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            console.log('Admin not found:', email);
            return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
        }

        // Check password
        let isMatch;
        try {
            isMatch = await admin.comparePassword(password);
            console.log('Password match result:', isMatch);
        } catch (error) {
            console.error('Error comparing password:', error);
            return res.status(500).json({ message: 'خطا در بررسی رمز عبور' });
        }

        if (!isMatch) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login successful for:', email);
        res.json({
            message: 'ورود موفقیت‌آمیز',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: error.message });
    }
}; 
