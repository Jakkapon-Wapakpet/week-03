const mongoose = require('mongoose');

// Middleware to check database connection status
const checkDbConnection = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'ฐานข้อมูลออฟไลน์อยู่ (Database is offline). กรุณาตรวจสอบไฟล์ .env หรือการตั้งค่าสิทธิ์เครือข่าย/ผู้ใช้ใน MongoDB Atlas'
    });
  }
  next();
};

module.exports = checkDbConnection;
