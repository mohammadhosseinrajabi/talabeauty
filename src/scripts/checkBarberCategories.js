const mongoose = require('mongoose');
const BarberCategory = require('../models/BarberCategory');
require('dotenv').config();

const checkCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop');
        console.log('Connected to MongoDB');

        // Get all categories
        const categories = await BarberCategory.find();
        console.log('Categories in database:', categories);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkCategories(); 