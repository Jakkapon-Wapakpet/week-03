const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const seedDB = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // 2. Clear Existing Data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing database collections.');

    // 3. Load Mock Data from files
    const usersRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data-project/05_mongodb.example_user.json'), 'utf-8'));
    const productsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data-project/06_mongodb-example_products.json'), 'utf-8'));
    const ordersRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data-project/07_mongodb-example_orders.json'), 'utf-8'));

    // 4. Map MongoDB extended JSON properties (like $oid) to Mongoose ObjectIds
    const users = usersRaw.map(u => ({
      ...u,
      _id: new mongoose.Types.ObjectId(u._id.$oid)
    }));

    const products = productsRaw.map(p => ({
      ...p,
      _id: new mongoose.Types.ObjectId(p._id.$oid)
    }));

    const orders = ordersRaw.map(o => ({
      ...o,
      _id: new mongoose.Types.ObjectId(o._id.$oid),
      userId: new mongoose.Types.ObjectId(o.userId.$oid),
      items: o.items.map(item => ({
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId.$oid)
      }))
    }));

    // 5. Insert documents using insertMany (bypasses pre-save hooks so pre-hashed passwords are kept)
    await User.insertMany(users);
    console.log(`Seeded ${users.length} users successfully.`);

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully.`);

    await Order.insertMany(orders);
    console.log(`Seeded ${orders.length} orders successfully.`);

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
