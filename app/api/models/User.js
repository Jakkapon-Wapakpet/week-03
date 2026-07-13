const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,   // ห้ามซ้ำกัน
    trim: true      // ตัด space หัวท้ายออกอัตโนมัติ
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // แปลงเป็นตัวเล็กทั้งหมดก่อนบันทึก
  },
  password: {
    type: String,
    required: true
    // หมายเหตุ: password จะถูก hash โดย pre-save hook ด้านล่าง ไม่เคยเก็บ plain text
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin'], // รับได้แค่ 2 ค่านี้เท่านั้น
    default: 'customer'
  },
  profile: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true // เพิ่ม createdAt และ updatedAt ให้อัตโนมัติ
});

// Pre-save Hook — รันก่อนบันทึกทุกครั้ง เพื่อ hash password
UserSchema.pre('save', async function (next) {
  // ถ้า password ไม่ได้ถูกแก้ไข ข้ามขั้นตอนนี้ไปเลย (เช่น ตอนแก้ชื่อ)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); // สร้าง random salt 10 รอบ
    this.password = await bcrypt.hash(this.password, salt); // แฮช password
    next();
  } catch (error) {
    next(error);
  }
});

// Method สำหรับเปรียบเทียบ password ตอน login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt.compare จะแฮช enteredPassword แล้วเทียบกับที่เก็บใน DB
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
