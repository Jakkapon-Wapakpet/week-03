const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.log('⚠️ Warning: Server is running without a working database connection. API endpoints will fail, but the static UI is accessible.');
  }
};

module.exports = connectDB;
