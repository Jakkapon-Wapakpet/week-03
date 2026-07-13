const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`เชื่อมต่อ MongoDB สำเร็จ: ${conn.connection.host}`);
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล: ${error.message}`);
    console.log('⚠️ คำเตือน: Server กำลังรันโดยไม่มีการเชื่อมต่อฐานข้อมูล API จะใช้งานไม่ได้ แต่ยังเข้าถึง UI ได้');
  }
};

module.exports = connectDB;
