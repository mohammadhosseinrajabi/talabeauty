const mongoose = require('mongoose');

const barberRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BarberCategory',
        required: true
    },
    serviceType: {
        type: String,
        enum: ['home', 'salon'],
        required: true
    },
    address: {
        province: String,
        city: String,
        street: String,
        postalCode: String,
        details: String
    },
    preferredDate: {
        type: Date,
        required: true
    },
    preferredTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    },
    assignedBarber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BarberRequest', barberRequestSchema); 