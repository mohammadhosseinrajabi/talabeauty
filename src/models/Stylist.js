// const mongoose = require('mongoose');

// const StylistSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialty: { type: String, required: true },
//   rating: { type: Number, default: 0 },
//   appointments: { type: Number, default: 0 },
//   image: { type: String, default: '' }
// }, { timestamps: true });

// module.exports = mongoose.model('Stylist', StylistSchema);


const mongoose = require('mongoose');

const StylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  appointments: { type: Number, default: 0 },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Stylist', StylistSchema);