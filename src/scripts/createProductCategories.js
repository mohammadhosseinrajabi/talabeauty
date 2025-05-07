const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const createProductCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop');
        console.log('Connected to MongoDB');

        // Sample categories
        const categories = [
            {
                name: "محصولات مو",
                description: "انواع شامپو، ماسک و سرم مو",
                isActive: true,
                slug: "محصولات-مو"
            },
            {
                name: "محصولات پوست",
                description: "انواع کرم، لوسیون و ماسک صورت",
                isActive: true,
                slug: "محصولات-پوست"
            },
            {
                name: "ابزار آرایشگری",
                description: "انواع قیچی، شانه و برس",
                isActive: true,
                slug: "ابزار-آرایشگری"
            },
            {
                name: "رنگ مو",
                description: "انواع رنگ مو و دکلره",
                isActive: true,
                slug: "رنگ-مو"
            },
            {
                name: "محصولات اصلاح",
                description: "انواع ژیلت، فوم و افترشیو",
                isActive: true,
                slug: "محصولات-اصلاح"
            }
        ];

        // Insert categories
        for (const category of categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                const newCategory = new Category(category);
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

createProductCategories(); 