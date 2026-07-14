const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // อ้างอิงข้ามไปยัง collection 'users' (ใช้กับ .populate())
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
      // บันทึกชื่อสินค้า ณ ตอนที่สั่งซื้อ (Snapshot) ป้องกันกรณีแก้ไขชื่อสินค้าในภายหลัง
    },
    price: {
      type: Number,
      required: true
      // บันทึกราคา ณ ตอนที่สั่งซื้อ (Snapshot) ป้องกันกรณีราคาสินค้าเปลี่ยนแปลง
    },
    quantity: {
      type: Number,
      required: true,
      min: 1 // จำนวนขั้นต่ำ 1 ชิ้น
    }
  }],
  shippingAddress: {
    receiverName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine: { type: String, required: true },
    subDistrict: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['CreditCard', 'DebitCard', 'PromptPay'] // รับได้แค่ 3 วิธีนี้
  },
  totalAmount: {
    type: Number,
    required: true
    // คำนวณฝั่ง Server เสมอ ไม่เชื่อราคาที่ client ส่งมา (ป้องกันการแก้ราคา)
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending' // ออเดอร์ใหม่เริ่มต้นที่ Pending เสมอ
  },
  trackingNumber: {
    type: String // ไม่บังคับ — Admin ใส่ตอนส่งพัสดุ
  }
}, {
  timestamps: true // เพิ่ม createdAt และ updatedAt ให้อัตโนมัติ
});

module.exports = mongoose.model('Order', OrderSchema);
