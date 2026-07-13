const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const TARGET_COLLECTIONS = ['headset_specs', 'keyboard_specs', 'mouse_specs'];

const dropCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB (gearhub)...\n');

    const db = mongoose.connection.db;
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map(c => c.name.toLowerCase());

    console.log('📋 Collections ที่มีอยู่ใน database:');
    existingNames.forEach(name => console.log(`   - ${name}`));
    console.log('');

    let dropped = 0;
    for (const target of TARGET_COLLECTIONS) {
      if (existingNames.includes(target.toLowerCase())) {
        await db.dropCollection(target);
        console.log(`🗑️  ลบ collection "${target}" สำเร็จ`);
        dropped++;
      } else {
        console.log(`⚠️  ไม่พบ collection "${target}" (ข้าม)`);
      }
    }

    console.log(`\n✅ เสร็จสิ้น! ลบไปทั้งหมด ${dropped} collection(s)`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ เกิดข้อผิดพลาด: ${error.message}`);
    process.exit(1);
  }
};

dropCollections();
