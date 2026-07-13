const mongoose = require('mongoose');

// Middleware ตรวจสอบสถานะการเชื่อมต่อฐานข้อมูลก่อนทุก query
const checkDbConnection = (req, res, next) => {
  // readyState: 0 = ตัดการเชื่อมต่อ, 1 = เชื่อมต่ออยู่, 2 = กำลังเชื่อมต่อ, 3 = กำลังตัดการเชื่อมต่อ
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'ฐานข้อมูลออฟไลน์อยู่ (Database is offline). กรุณาตรวจสอบไฟล์ .env หรือการตั้งค่าสิทธิ์เครือข่าย/ผู้ใช้ใน MongoDB Atlas'
    });
  }
  next(); // ผ่านได้ — ส่งต่อไปยัง route handler
};

module.exports = checkDbConnection;
