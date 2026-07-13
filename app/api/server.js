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

// เสิร์ฟไฟล์ Static ของ Frontend แบบใหม่ (Vanilla JS) ที่โฟลเดอร์ app/web
const frontendPath = path.join(__dirname, '../../web');
app.use(express.static(frontendPath));

// จัดการกรณีเรียก API endpoint ที่ไม่มีอยู่
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Route Fallback สำหรับ SPA (จับทุก route ที่ไม่ใช่ API กลับไปหน้า index.html)
// แม้ตอนนี้จะเป็น MPA แต่มี fallback ไว้ก็ปลอดภัย
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server รันอยู่ที่ port ${PORT}`);
  console.log(`เข้าถึง Frontend ได้ที่ http://localhost:${PORT}`);
});
