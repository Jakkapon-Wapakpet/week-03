const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ฟังก์ชันช่วยสร้าง JWT Token จาก user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token มีอายุ 30 วัน
  });
};

// @คำอธิบาย  สมัครสมาชิกผู้ใช้ใหม่
// @route     POST /api/auth/register
// @การเข้าถึง สาธารณะ (ไม่ต้องล็อกอิน)
const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;

    // ตรวจสอบว่ากรอกข้อมูลครบทุกฟิลด์
    if (!username || !email || !password || !firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
    }

    // ตรวจว่า email หรือ username ซ้ำกับที่มีอยู่แล้วหรือไม่
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists || usernameExists) {
      return res.status(400).json({ success: false, message: 'มีผู้ใช้งานที่ใช้อีเมลหรือชื่อผู้ใช้นี้อยู่แล้ว' });
    }

    // สร้าง user ใหม่ (password จะถูก hash โดย pre-save hook ใน User model)
    const user = await User.create({
      username,
      email,
      password,
      role: 'customer', // บังคับเป็น customer เสมอ — admin ต้องตั้งโดยตรงใน DB
      profile: {
        firstName,
        lastName,
        phoneNumber
      }
    });

    if (user) {
      return res.status(201).json({
        success: true,
        token: generateToken(user._id), // ส่ง token กลับไปทันทีเพื่อล็อกอินอัตโนมัติ
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      });
    } else {
      return res.status(400).json({ success: false, message: 'ข้อมูลผู้ใช้ไม่ถูกต้อง' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ตรวจสอบตัวตนและรับ JWT Token
// @route     POST /api/auth/login
// @การเข้าถึง สาธารณะ (ไม่ต้องล็อกอิน)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่ากรอกข้อมูลครบ
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'กรุณาระบุอีเมลและรหัสผ่าน' });
    }

    // ค้นหา user จาก email
    const user = await User.findOne({ email });

    // ตรวจสอบ user และ password (ใช้ method matchPassword จาก User model)
    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      });
    } else {
      return res.status(401).json({ success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ดูข้อมูลโปรไฟล์ของตัวเอง
// @route     GET /api/auth/me
// @การเข้าถึง ต้องล็อกอิน (Private)
const getMe = async (req, res) => {
  try {
    // req.user ถูก set โดย protect middleware ก่อนมาถึงตรงนี้แล้ว
    return res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
