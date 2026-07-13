const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkDbConnection = require('./middlewares/dbCheckMiddleware');

// Initialize database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Mount API Routes (Check db connection before executing queries)
app.use('/api', checkDbConnection);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Serves the static Frontend (Vanilla HTML/CSS/JS) directly from the server
// This allows the entire project to run on a single port (5000) out of the box
app.use(express.static(path.join(__dirname, '../web')));

// Handle API 404
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Fallback for HTML routing (returns index.html for other undefined static paths)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend accessible at http://localhost:${PORT}`);
});
