const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
    // ค่าที่ใช้: 'Mouse' | 'Keyboard' | 'Headset' | 'Microphone'
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0 // ค่าเริ่มต้นเป็น 0 ถ้าไม่ระบุ
  },
  images: [{
    type: String // เก็บเป็น path รูปภาพ เช่น '/images/products/mouse.png'
  }],
  specifications: {
    // ฟิลด์ทั่วไปของทุก category
    color: { type: String },
    connection: { type: String },
    weight: { type: String },
    // เฉพาะ Mouse
    sensor: { type: String },
    pollingRate: { type: String },
    // เฉพาะ Keyboard
    switchType: { type: String },
    hotSwappable: { type: Boolean },
    // เฉพาะ Headset
    batteryLife: { type: String },
    // เฉพาะ Microphone
    polarPattern: { type: String },
    frequencyResponse: { type: String },
    formFactor: { type: String }
  },
  tags: [{
    type: String // แท็กสำหรับค้นหา เช่น 'wireless', 'black', 'mechanical'
  }],
  reviews: [{
    // ข้อมูลรีวิวถูก embed ไว้ในสินค้าเลย (ไม่ได้แยก collection)
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true // เพิ่ม createdAt และ updatedAt ให้อัตโนมัติ
});

module.exports = mongoose.model('Product', ProductSchema);
