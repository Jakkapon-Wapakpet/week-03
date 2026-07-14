const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  payForOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/:id')
  .get(protect, getOrderById);

// Customer pays for their own order (no admin required)
router.route('/:id/pay')
  .put(protect, payForOrder);

// Admin updates order status
router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

module.exports = router;
