const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Embed mock data directly to ensure the script is self-contained after data-project deletion
const usersData = [
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728459"),
    "username": "admin_gearhub_1",
    "email": "admin.1@gearhub.com",
    "password": "$2b$10$hashedpasswordforuser_1_1234567890abcdefg",
    "role": "admin",
    "profile": {
      "firstName": "สมศักดิ์",
      "lastName": "รักงาน",
      "phoneNumber": "0811111111"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845a"),
    "username": "admin_gearhub_2",
    "email": "admin.2@gearhub.com",
    "password": "$2b$10$hashedpasswordforuser_2_1234567890abcdefg",
    "role": "admin",
    "profile": {
      "firstName": "สมหมาย",
      "lastName": "มุ่งมั่น",
      "phoneNumber": "0822222222"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845b"),
    "username": "admin_gearhub_3",
    "email": "admin.3@gearhub.com",
    "password": "$2b$10$hashedpasswordforuser_3_1234567890abcdefg",
    "role": "admin",
    "profile": {
      "firstName": "สมจิต",
      "lastName": "ขยันยิ่ง",
      "phoneNumber": "0833333333"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845c"),
    "username": "admin_gearhub_4",
    "email": "admin.4@gearhub.com",
    "password": "$2b$10$hashedpasswordforuser_4_1234567890abcdefg",
    "role": "admin",
    "profile": {
      "firstName": "สมศรี",
      "lastName": "ดีงาม",
      "phoneNumber": "0844444444"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845d"),
    "username": "admin_gearhub_5",
    "email": "admin.5@gearhub.com",
    "password": "$2b$10$hashedpasswordforuser_5_1234567890abcdefg",
    "role": "admin",
    "profile": {
      "firstName": "สมชาย",
      "lastName": "ยอดเยี่ยม",
      "phoneNumber": "0855555555"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845e"),
    "username": "gamer_pro_1",
    "email": "gamer.1@example.com",
    "password": "$2b$10$hashedpasswordforuser_6_1234567890abcdefg",
    "role": "customer",
    "profile": {
      "firstName": "กิตติ",
      "lastName": "เก่งกาจ",
      "phoneNumber": "0866666666"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372845f"),
    "username": "gamer_pro_2",
    "email": "gamer.2@example.com",
    "password": "$2b$10$hashedpasswordforuser_7_1234567890abcdefg",
    "role": "customer",
    "profile": {
      "firstName": "ธีระ",
      "lastName": "รอบรู้",
      "phoneNumber": "0877777777"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728460"),
    "username": "gamer_pro_3",
    "email": "gamer.3@example.com",
    "password": "$2b$10$hashedpasswordforuser_8_1234567890abcdefg",
    "role": "customer",
    "profile": {
      "firstName": "อนันต์",
      "lastName": "ขยันเพียร",
      "phoneNumber": "0888888888"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728461"),
    "username": "gamer_pro_4",
    "email": "gamer.4@example.com",
    "password": "$2b$10$hashedpasswordforuser_9_1234567890abcdefg",
    "role": "customer",
    "profile": {
      "firstName": "วีระ",
      "lastName": "กล้าหาญ",
      "phoneNumber": "0899999999"
    }
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728462"),
    "username": "gamer_pro_5",
    "email": "gamer.5@example.com",
    "password": "$2b$10$hashedpasswordforuser_10_1234567890abcdefg",
    "role": "customer",
    "profile": {
      "firstName": "อภิชาติ",
      "lastName": "ใจเย็น",
      "phoneNumber": "0800000000"
    }
  }
];

const productsData = [
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372848b"),
    "name": "Razer Viper V3 Pro",
    "description": "Premium gaming mouse designed for maximum competitive performance and esports players.",
    "category": "Mouse",
    "price": 500,
    "stock": 5,
    "images": [ "/images/products/viper-v3-pro-white.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Wireless 2.4GHz / Wired",
      "weight": "50g",
      "sensor": "PixArt PAW3395",
      "pollingRate": "8000Hz"
    },
    "tags": [ "mouse", "black", "wireless" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372848c"),
    "name": "Logitech G Pro X Superlight 2",
    "description": "Premium gaming mouse designed for maximum competitive performance and esports players.",
    "category": "Mouse",
    "price": 780,
    "stock": 8,
    "images": [ "/images/products/g-pro-superlight-2-black.png" ],
    "specifications": {
      "color": "White",
      "connection": "Wireless 2.4GHz / Wired",
      "weight": "51g",
      "sensor": "Focus Pro 35K Optical",
      "pollingRate": "1000Hz"
    },
    "tags": [ "mouse", "white", "wired" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728495"),
    "name": "Wooting 60HE+",
    "description": "Analog mechanical gaming keyboard with rapid trigger technology.",
    "category": "Keyboard",
    "price": 8900,
    "stock": 12,
    "images": [ "/images/products/wooting-60he.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Wired USB-C",
      "weight": "600g",
      "switchType": "Lekker Linear Hall Effect",
      "hotSwappable": true
    },
    "tags": [ "keyboard", "mechanical", "wired" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728496"),
    "name": "Keychron Q1 Pro",
    "description": "Premium full-metal wireless custom mechanical keyboard.",
    "category": "Keyboard",
    "price": 6990,
    "stock": 8,
    "images": [ "/images/products/keychron-q1-pro.png" ],
    "specifications": {
      "color": "Grey",
      "connection": "Bluetooth / Wired",
      "weight": "1700g",
      "switchType": "Keychron K Pro Red",
      "hotSwappable": true
    },
    "tags": [ "keyboard", "mechanical", "wireless" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728498"),
    "name": "Razer BlackShark V2 Pro",
    "description": "Definitive wireless esports gaming headset.",
    "category": "Headset",
    "price": 6490,
    "stock": 18,
    "images": [ "/images/products/blackshark-v2-pro-white.png" ],
    "specifications": {
      "color": "White",
      "connection": "Wireless 2.4GHz / Bluetooth",
      "weight": "320g",
      "batteryLife": "Up to 70 hours"
    },
    "tags": [ "headset", "wireless", "audio" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728499"),
    "name": "HyperX Cloud III",
    "description": "The evolution of legendary comfort and audio clarity.",
    "category": "Headset",
    "price": 3490,
    "stock": 25,
    "images": [ "/images/products/cloud-iii-red-black.png" ],
    "specifications": {
      "color": "Red/Black",
      "connection": "Wired USB-C / 3.5mm",
      "weight": "310g",
      "batteryLife": "N/A (Wired)"
    },
    "tags": [ "headset", "wired", "audio" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372848d"),
    "name": "Pulsar X2V2 Wireless",
    "description": "High-performance symmetrical gaming mouse with raw optical switch speed.",
    "category": "Mouse",
    "price": 3590,
    "stock": 15,
    "images": [ "/images/products/pulsar-x2v2.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Wireless 2.4GHz",
      "weight": "53g",
      "sensor": "PixArt PAW3395",
      "pollingRate": "4000Hz"
    },
    "tags": [ "mouse", "black", "wireless" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372848e"),
    "name": "G-Wolves HTS Plus 4K",
    "description": "Ultra-lightweight fingertip gaming mouse with true 4000Hz polling rate.",
    "category": "Mouse",
    "price": 5990,
    "stock": 6,
    "images": [ "/images/products/g-wolves-hts.png" ],
    "specifications": {
      "color": "Grey",
      "connection": "Wireless 2.4GHz",
      "weight": "49g",
      "sensor": "PixArt PAW3395",
      "pollingRate": "4000Hz"
    },
    "tags": [ "mouse", "grey", "wireless" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de193728497"),
    "name": "SteelSeries Apex Pro TKL",
    "description": "World's fastest mechanical gaming keyboard with OmniPoint adjustable switches.",
    "category": "Keyboard",
    "price": 8990,
    "stock": 10,
    "images": [ "/images/products/apex-pro-tkl.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Wired USB-C",
      "weight": "960g",
      "switchType": "OmniPoint Adjustable Magnetic",
      "hotSwappable": false
    },
    "tags": [ "keyboard", "mechanical", "wired" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372849a"),
    "name": "ASUS ROG Azoth",
    "description": "75% custom wireless gaming keyboard with OLED display and triple-layer dampening.",
    "category": "Keyboard",
    "price": 9990,
    "stock": 5,
    "images": [ "/images/products/rog-azoth.png" ],
    "specifications": {
      "color": "Gunmetal",
      "connection": "Wireless 2.4GHz / Bluetooth / Wired",
      "weight": "1180g",
      "switchType": "ROG NX Red Linear",
      "hotSwappable": true
    },
    "tags": [ "keyboard", "mechanical", "wireless" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372849b"),
    "name": "SteelSeries Arctis Nova Pro Wireless",
    "description": "Premium wireless multi-system gaming headset with active noise cancellation.",
    "category": "Headset",
    "price": 16500,
    "stock": 8,
    "images": [ "/images/products/arctis-nova-pro.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Wireless 2.4GHz / Bluetooth",
      "weight": "340g",
      "batteryLife": "Up to 44 hours"
    },
    "tags": [ "headset", "wireless", "audio" ]
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de19372849c"),
    "name": "Astro A50 X",
    "description": "Lightspeed wireless gaming headset with base station, Dolby Atmos, and multi-system switching.",
    "category": "Headset",
    "price": 14990,
    "stock": 12,
    "images": [ "/images/products/astro-a50-x.png" ],
    "specifications": {
      "color": "Black",
      "connection": "Lightspeed Wireless 2.4GHz",
      "weight": "363g",
      "batteryLife": "Up to 24 hours"
    },
    "tags": [ "headset", "wireless", "audio" ]
  }
];

const ordersData = [
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284bd"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de19372845e"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de19372848b"),
        "name": "Razer Viper V3 Pro",
        "price": 500,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "สมชาย รักเรียน",
      "phone": "0812345678",
      "addressLine": "123/45 ซอย 5",
      "subDistrict": "จอมพล",
      "district": "จตุจักร",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10900"
    },
    "paymentMethod": "CreditCard",
    "totalAmount": 500,
    "status": "Paid"
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284be"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de19372845f"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de19372848c"),
        "name": "Logitech G Pro X Superlight 2",
        "price": 780,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "สมศรี มีสุข",
      "phone": "0823456789",
      "addressLine": "88/9 หมู่บ้านแสนดี",
      "subDistrict": "บางนา",
      "district": "บางนา",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10260"
    },
    "paymentMethod": "DebitCard",
    "totalAmount": 780,
    "status": "Processing"
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284bf"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de193728460"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de193728495"),
        "name": "Wooting 60HE+",
        "price": 8900,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "วิชัย รวยรื่น",
      "phone": "0898765432",
      "addressLine": "999/1 ถ.สุขุมวิท",
      "subDistrict": "คลองเตย",
      "district": "คลองเตย",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10110"
    },
    "paymentMethod": "PromptPay",
    "totalAmount": 8900,
    "status": "Shipped",
    "trackingNumber": "TH1000000001A"
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284c0"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de193728461"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de193728496"),
        "name": "Keychron Q1 Pro",
        "price": 6990,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "เกรียงไกร ไปไกล",
      "phone": "0855551234",
      "addressLine": "456 ซอยสุขใจ",
      "subDistrict": "ห้วยขวาง",
      "district": "ห้วยขวาง",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10310"
    },
    "paymentMethod": "CreditCard",
    "totalAmount": 6990,
    "status": "Delivered",
    "trackingNumber": "TH1000000002A"
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284c1"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de193728462"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de193728498"),
        "name": "Razer BlackShark V2 Pro",
        "price": 6490,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "สุพรรณิการ์ งามจริง",
      "phone": "0867891234",
      "addressLine": "77 ถนนพหลโยธิน",
      "subDistrict": "สนามบิน",
      "district": "ดอนเมือง",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10210"
    },
    "paymentMethod": "PromptPay",
    "totalAmount": 6490,
    "status": "Pending"
  },
  {
    "_id": new mongoose.Types.ObjectId("6a4f1433acf18de1937284c2"),
    "userId": new mongoose.Types.ObjectId("6a4f1433acf18de19372845e"),
    "items": [
      {
        "productId": new mongoose.Types.ObjectId("6a4f1433acf18de193728499"),
        "name": "HyperX Cloud III",
        "price": 3490,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "receiverName": "สมชาย รักเรียน",
      "phone": "0812345678",
      "addressLine": "123/45 ซอย 5",
      "subDistrict": "จอมพล",
      "district": "จตุจักร",
      "province": "กรุงเทพมหานคร",
      "postalCode": "10900"
    },
    "paymentMethod": "CreditCard",
    "totalAmount": 3490,
    "status": "Cancelled"
  }
];

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

    // 3. Insert documents
    await User.insertMany(usersData);
    console.log(`Seeded ${usersData.length} users successfully.`);

    await Product.insertMany(productsData);
    console.log(`Seeded ${productsData.length} products successfully.`);

    await Order.insertMany(ordersData);
    console.log(`Seeded ${ordersData.length} orders successfully.`);

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
