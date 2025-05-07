const mongoose = require('mongoose');
const BarberCategory = require('../models/BarberCategory');
require('dotenv').config();

const sampleCategories = [
    {
        name: 'آرایشگر مردانه',
        description: 'متخصص در آرایش و پیرایش آقایان'
    },
    {
        name: 'آرایشگر زنانه',
        description: 'متخصص در آرایش و پیرایش بانوان'
    },
    {
        name: 'آرایشگر کودک',
        description: 'متخصص در آرایش و پیرایش کودکان'
    },
    {
        name: 'آرایشگر عروس',
        description: 'متخصص در آرایش عروس'
    },
    {
        name: 'آرایشگر تخصصی رنگ مو',
        description: 'متخصص در رنگ مو و هایلایت'
    }
];

async function populateCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop');
        console.log('Connected to MongoDB');

        // Clear existing categories
        await BarberCategory.deleteMany({});
        console.log('Cleared existing categories');

        // Insert sample categories
        await BarberCategory.insertMany(sampleCategories);
        console.log('Sample categories inserted successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

populateCategories(); 