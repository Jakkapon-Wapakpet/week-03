const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide shipping address and payment method' });
    }

    // Verify stock and fetch fresh product prices to calculate the real totalAmount
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.name}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}` });
      }

      // Track order item snapshot
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price, // use DB price for safety
        quantity: item.quantity
      });

      calculatedTotal += product.price * item.quantity;
    }

    // Deduct stock from products
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // Create Order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: calculatedTotal,
      status: 'Pending'
    });

    return res.status(201).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders OR all orders if Admin
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      // Admin sees all orders, populated with user info
      orders = await Order.find({}).populate('userId', 'username email profile').sort({ createdAt: -1 });
    } else {
      // Customers see only their own orders
      orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email profile');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if requester is order owner or an admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    return res.json({ success: true, order });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const validStatuses = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    if (trackingNumber !== undefined) {
      order.trackingNumber = trackingNumber;
    }

    const updatedOrder = await order.save();
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
