const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
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
    enum: ['CreditCard', 'DebitCard', 'PromptPay']
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  trackingNumber: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
