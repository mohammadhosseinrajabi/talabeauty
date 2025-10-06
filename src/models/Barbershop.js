// const mongoose = require('mongoose');

// const barbershopSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   address: { type: String, required: true, trim: true },
//   phone: { type: String, required: true, trim: true },
//   description: { type: String, trim: true },
//   image: { type: String },
//   categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BarberCategory' }],
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Barbershop', barbershopSchema); 