const Order = require('../models/Order');
const Product = require('../models/Product');

// @คำอธิบาย  สร้างคำสั่งซื้อใหม่
// @route     POST /api/orders
// @การเข้าถึง ต้องล็อกอิน (Private)
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'ไม่มีรายการสินค้าในออเดอร์' });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'กรุณาระบุที่อยู่จัดส่งและวิธีชำระเงิน' });
    }

    // ตรวจสอบ stock และดึงราคาสินค้าจาก DB (ไม่เชื่อราคาที่ client ส่งมา — ป้องกันการโกง)
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `ไม่พบสินค้า: ${item.name}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `สินค้าไม่เพียงพอ: ${product.name} มีแค่ ${product.stock} ชิ้น` });
      }

      // บันทึก Snapshot ของสินค้า ณ เวลาสั่งซื้อ (ราคา/ชื่ออาจเปลี่ยนในอนาคต)
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price, // ใช้ราคาจาก DB เสมอ ไม่รับจาก client
        quantity: item.quantity
      });

      calculatedTotal += product.price * item.quantity;
    }

    // หักสต็อกแบบ Atomic (ป้องกัน Race Condition กรณี 2 คน order พร้อมกัน)
    for (const item of orderItems) {
      const updated = await Product.findOneAndUpdate(
        { _id: item.productId, stock: { $gte: item.quantity } }, // ตรวจสอบก่อนหักพร้อมกัน
        { $inc: { stock: -item.quantity } }
      );
      if (!updated) {
        return res.status(400).json({ success: false, message: `สินค้าหมดสต็อกระหว่างดำเนินการ: ${item.name}` });
      }
    }

    // สร้างออเดอร์ใหม่ในฐานข้อมูล
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: calculatedTotal, // ใช้ยอดที่คำนวณฝั่ง server
      status: 'Pending'
    });

    return res.status(201).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ดูประวัติออเดอร์ (ลูกค้าเห็นแค่ของตัวเอง, Admin เห็นทุกออเดอร์)
// @route     GET /api/orders
// @การเข้าถึง ต้องล็อกอิน (Private)
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      // Admin: ดึงออเดอร์ทั้งหมด พร้อม populate ข้อมูล user (username, email, profile)
      orders = await Order.find({}).populate('userId', 'username email profile').sort({ createdAt: -1 });
    } else {
      // ลูกค้า: ดึงเฉพาะออเดอร์ของตัวเอง
      orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ดูรายละเอียดออเดอร์ตาม ID
// @route     GET /api/orders/:id
// @การเข้าถึง ต้องล็อกอิน (Private)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email profile');

    if (!order) {
      return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์นี้ในระบบ' });
    }

    // ตรวจสอบว่าเป็นเจ้าของออเดอร์ หรือเป็น Admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์ดูออเดอร์นี้' });
    }

    return res.json({ success: true, order });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์นี้ในระบบ' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  Admin อัพเดตสถานะออเดอร์และเลขพัสดุ
// @route     PUT /api/orders/:id/status
// @การเข้าถึง เฉพาะ Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    // ตรวจสอบว่า status ที่ส่งมาอยู่ในค่าที่อนุญาตหรือไม่
    const validStatuses = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'สถานะออเดอร์ไม่ถูกต้อง' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์นี้ในระบบ' });
    }

    order.status = status;
    if (trackingNumber !== undefined) {
      order.trackingNumber = trackingNumber; // บันทึกเลขพัสดุ (ถ้ามี)
    }

    const updatedOrder = await order.save();
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ลูกค้ายืนยันการชำระเงินของตัวเอง (จำลอง PromptPay)
// @route     PUT /api/orders/:id/pay
// @การเข้าถึง ต้องล็อกอิน (ไม่ต้องเป็น Admin)
const payForOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์นี้ในระบบ' });
    }

    // ตรวจสอบว่าเป็นเจ้าของออเดอร์นี้จริงๆ
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์ยืนยันการชำระเงินออเดอร์นี้' });
    }

    // อนุญาตเฉพาะออเดอร์ที่ยังอยู่ในสถานะ Pending เท่านั้น
    if (order.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'ออเดอร์นี้ไม่อยู่ในสถานะรอชำระเงิน' });
    }

    order.status = 'Paid';
    const updatedOrder = await order.save();
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์นี้ในระบบ' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  payForOrder
};
