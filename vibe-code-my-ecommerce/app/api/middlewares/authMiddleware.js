const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware ป้องกัน route — ตรวจสอบ JWT Token ก่อนเข้าถึง
const protect = async (req, res, next) => {
  let token;

  // ตรวจว่า header มี Authorization และขึ้นต้นด้วย 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // ดึง token ออกจาก "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // ตรวจสอบว่า token ถูกต้องและยังไม่หมดอายุ
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ดึงข้อมูล user จาก DB โดยใช้ id ที่ decode ได้ (ไม่ส่ง password กลับ)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง — ไม่พบผู้ใช้นี้ในระบบ' });
      }

      next(); // ผ่านแล้ว — ส่งต่อไปยัง controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง — Token ไม่ถูกต้องหรือหมดอายุ' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง — ไม่พบ Token' });
  }
};

// Middleware ตรวจสอบสิทธิ์ Admin (ต้องใช้หลังจาก protect เสมอ)
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // เป็น admin — ผ่านได้
  } else {
    return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง — เฉพาะผู้ดูแลระบบเท่านั้น' });
  }
};

module.exports = { protect, admin };
