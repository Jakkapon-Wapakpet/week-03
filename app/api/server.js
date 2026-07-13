const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkDbConnection = require('./middlewares/dbCheckMiddleware');

// เชื่อมต่อฐานข้อมูล MongoDB
connectDB();

const app = express();

// Middleware กลาง — ทำงานก่อนทุก request ที่เข้ามา
app.use(cors());         // อนุญาตให้ Frontend ต่าง origin (port) เรียก API ได้
app.use(express.json()); // แปลง request body จาก JSON string เป็น JavaScript object

// ผูก Routes เข้ากับ app (ตรวจสอบการเชื่อมต่อ DB ก่อนทุก query)
app.use('/api', checkDbConnection);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// เสิร์ฟไฟล์ Frontend (React build) จากโฟลเดอร์ dist
// ทำให้ทั้ง Frontend และ Backend รันบน port เดียวกัน (5000) ตอน Production
app.use(express.static(path.join(__dirname, '../web/dist')));

// จัดการกรณีเรียก API endpoint ที่ไม่มีอยู่
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Fallback — คืน index.html สำหรับทุก path ที่ React Router จัดการ
// ป้องกัน 404 เมื่อ refresh หน้าใน Single Page Application (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server รันอยู่ที่ port ${PORT}`);
  console.log(`เข้าถึง Frontend ได้ที่ http://localhost:${PORT}`);
});
