const express = require('express');
const router = express.Router();
const { generateCaptcha, verifyCaptcha } = require('../controllers/captcha.controller');

// مسیر دریافت کپچا جدید
router.get('/generate', generateCaptcha);

// مسیر اعتبارسنجی کپچا
router.post('/verify', verifyCaptcha);

module.exports = router; 