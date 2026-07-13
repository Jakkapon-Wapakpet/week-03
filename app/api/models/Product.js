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
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  images: [{
    type: String
  }],
  specifications: {
    color: { type: String },
    connection: { type: String },
    weight: { type: String },
    sensor: { type: String },
    pollingRate: { type: String },
    switchType: { type: String },
    hotSwappable: { type: Boolean },
    batteryLife: { type: String },
    polarPattern: { type: String },
    frequencyResponse: { type: String },
    formFactor: { type: String }
  },
  tags: [{
    type: String
  }],
  reviews: [{
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
