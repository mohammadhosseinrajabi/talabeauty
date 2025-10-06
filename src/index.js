const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Set default JWT_SECRET for local development
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'your-local-development-secret-key';
}

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://talabeauty.jelvanii.ir',
  'https://mh.mtcoding.ir'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
console.log('Current __dirname:', __dirname)
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/barber-categories', require('./routes/barberCategoryRoutes'));
// app.use('/api/barbershops', require('./routes/barbershopRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

const captchaRoutes = require('./routes/captcha.routes');

app.use('/api/stylists', require('./routes/stylists.js'));


// مسیرهای کپچا
app.use('/api/captcha', captchaRoutes);
app.use('/api/upload', require('./routes/upload'));
// Serve static files from uploads directory
console.log('Serving uploads from:', path.join(__dirname, '..', 'uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
}); 