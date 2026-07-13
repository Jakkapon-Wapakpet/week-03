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
    batteryLife: { type: String }
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
