const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const createSampleProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop');
        console.log('Connected to MongoDB');

        // First, get a category ID to use for products
        const category = await Category.findOne();
        if (!category) {
            console.log('No categories found. Please create categories first.');
            process.exit(1);
        }

        // Sample products
        const products = [
            {
                name: "شامپو مو ضد ریزش",
                description: "شامپو تخصصی ضد ریزش مو با فرمول گیاهی",
                price: 85000,
                category: category._id,
                images: ["https://example.com/shampoo1.jpg"],
                stock: 50,
                features: ["ضد ریزش", "تقویت کننده", "مناسب انواع مو"],
                specifications: {
                    "حجم": "250ml",
                    "نوع مو": "همه انواع مو",
                    "جنسیت": "عمومی"
                }
            },
            {
                name: "ژل حالت دهنده مو قوی",
                description: "ژل حالت دهنده با قدرت نگهداری بالا",
                price: 45000,
                category: category._id,
                images: ["https://example.com/gel1.jpg"],
                stock: 75,
                features: ["حالت دهنده قوی", "ماندگاری بالا", "بدون چربی"],
                specifications: {
                    "حجم": "200ml",
                    "قدرت نگهداری": "قوی",
                    "نوع مو": "همه انواع مو"
                }
            },
            {
                name: "روغن آرگان مراکشی",
                description: "روغن آرگان خالص برای مراقبت از مو و پوست",
                price: 120000,
                category: category._id,
                images: ["https://example.com/argan1.jpg"],
                stock: 30,
                features: ["100% طبیعی", "مغذی", "مناسب مو و پوست"],
                specifications: {
                    "حجم": "100ml",
                    "نوع": "خالص",
                    "منشا": "مراکش"
                }
            }
        ];

        // Insert products
        for (const product of products) {
            const existingProduct = await Product.findOne({ name: product.name });
            if (!existingProduct) {
                const newProduct = new Product(product);
                await newProduct.save();
                console.log(`محصول ${product.name} اضافه شد`);
            } else {
                console.log(`محصول ${product.name} قبلاً وجود دارد`);
            }
        }

        console.log('تمام محصولات با موفقیت اضافه شدند');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createSampleProducts(); 