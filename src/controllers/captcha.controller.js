const svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');

// ذخیره‌گاه موقت برای کدهای کپچا
const captchaStore = new Map();

// تولید کپچا جدید
const generateCaptcha = (req, res) => {
    try {
        // تولید کد تصادفی
        const captcha = svgCaptcha.create({
            size: 6, // طول کد
            noise: 2, // تعداد نویز
            color: true, // رنگی
            background: '#f0f0f0' // رنگ پس‌زمینه
        });

        // تولید شناسه یکتا برای این کپچا
        const captchaId = uuidv4();

        // ذخیره کد در حافظه با زمان انقضا (5 دقیقه)
        captchaStore.set(captchaId, {
            text: captcha.text,
            expires: Date.now() + 5 * 60 * 1000 // 5 دقیقه
        });

        // پاکسازی کدهای منقضی شده
        cleanupExpiredCaptchas();

        // ارسال پاسخ
        res.json({
            success: true,
            captchaId: captchaId,
            captchaImage: captcha.data
        });
    } catch (error) {
        console.error('خطا در تولید کپچا:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در تولید کپچا'
        });
    }
};

// اعتبارسنجی کد کپچا
const verifyCaptcha = async (req, res) => {
    try {
        const { captchaId, captchaText } = req.body;

        if (!captchaId || !captchaText) {
            return res.json({
                success: false,
                isValid: false,
                message: 'شناسه کپچا و متن کپچا الزامی است'
            });
        }

        const captchaData = captchaStore.get(captchaId);

        if (!captchaData) {
            return res.json({
                success: false,
                isValid: false,
                message: 'کپچا نامعتبر یا منقضی شده است'
            });
        }

        if (Date.now() > captchaData.expires) {
            captchaStore.delete(captchaId);
            return res.json({
                success: false,
                isValid: false,
                message: 'کپچا منقضی شده است'
            });
        }

        const isValid = captchaText.toLowerCase() === captchaData.text.toLowerCase();
        
        // پاک کردن کپچا بعد از استفاده
        captchaStore.delete(captchaId);

        return res.json({
            success: true,
            isValid: isValid
        });
    } catch (error) {
        console.error('خطا در اعتبارسنجی کپچا:', error);
        return res.json({
            success: false,
            isValid: false,
            message: 'خطا در اعتبارسنجی کپچا'
        });
    }
};

// پاکسازی کدهای منقضی شده
const cleanupExpiredCaptchas = () => {
    const now = Date.now();
    for (const [id, data] of captchaStore.entries()) {
        if (now > data.expires) {
            captchaStore.delete(id);
        }
    }
};

module.exports = {
    generateCaptcha,
    verifyCaptcha
}; 