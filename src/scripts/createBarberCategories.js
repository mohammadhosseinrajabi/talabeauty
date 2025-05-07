const mongoose = require('mongoose');
const BarberCategory = require('../models/BarberCategory');
require('dotenv').config();

const createBarberCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop');

        // Sample categories
        const categories = [
            {
                name: "آرایش مو",
                description: "خدمات آرایش و پیرایش مو برای آقایان و بانوان",
                status: "active"
            },
            {
                name: "رنگ مو",
                description: "خدمات رنگ مو و هایلایت",
                status: "active"
            },
            {
                name: "کاشت مو",
                description: "خدمات کاشت مو طبیعی و مصنوعی",
                status: "active"
            },
            {
                name: "ماساژ سر",
                description: "ماساژ درمانی و آرامش بخش سر و گردن",
                status: "active"
            },
            {
                name: "اصلاح صورت",
                description: "خدمات اصلاح و آرایش صورت برای آقایان",
                status: "active"
            }
        ];

        // Insert categories
        for (const category of categories) {
            const existingCategory = await BarberCategory.findOne({ name: category.name });
            if (!existingCategory) {
                const newCategory = new BarberCategory(category);
                await newCategory.save();
                console.log(`دسته‌بندی ${category.name} اضافه شد`);
            } else {
                console.log(`دسته‌بندی ${category.name} قبلاً وجود دارد`);
            }
        }

        console.log('عملیات با موفقیت انجام شد');
        process.exit(0);
    } catch (error) {
        console.error('خطا در ایجاد دسته‌بندی‌ها:', error);
        process.exit(1);
    }
};

createBarberCategories(); 