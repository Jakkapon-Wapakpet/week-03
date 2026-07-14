# 📝 GearHub - Project Design & Data Specifications

เอกสารฉบับนี้รวบรวมข้อมูลจำเพาะ โครงสร้างฐานข้อมูล ข้อมูลจำลอง (Mock Data) และแผนการวิเคราะห์ทั้งหมดจากโฟลเดอร์ `data-project` เพื่อจัดเก็บไว้อย่างเป็นระบบก่อนที่จะลบโฟลเดอร์ต้นทางออกไป

---

## 📌 1. แผนธุรกิจและการใช้งาน (Business & Use Cases Summary)

### 1.1 Business Model Canvas (สรุปจาก 02_business-model-canvas)
* **Value Propositions:** ระบบเปรียบเทียบสเปกเกมมิ่งเกียร์อัจฉริยะ (Built-in Compare), อธิบายสเปกภาษาเทคนิคให้เข้าใจง่ายด้วยภาพและไอคอน, ระบบแจ้งสถานะพัสดุและรับประกันผ่าน LINE OA
* **Customer Segments:** Esports Gamers (พีท), Aesthetic & Casual Gamers (ฟ้า), PC & Tech Enthusiasts (ก้อง), Gift Buyers (แม่วรรณ)
* **Customer Relationships:** ระบบสมาชิกพิเศษ (VIP Profile), บริการหลังการขายและระบบส่งข้อมูลใบรับประกันทาง LINE
* **Channels:** หน้าร้าน E-commerce (Mobile & Web), KOLs/Influencers บน Social Media (TikTok/Reels), LINE OA
* **Revenue Streams:** รายได้หลักจากการจำหน่ายอุปกรณ์เกมมิ่งเกียร์ (เมาส์, คีย์บอร์ด, หูฟัง) และบริการจัดส่งด่วนพิเศษ
* **Key Activities:** จัดหาและคัดเลือกอุปกรณ์เกมมิ่งเกียร์แท้, อัปเดตข้อมูลสเปกทางเทคนิค, บริการหลังการขายและส่งด่วน
* **Key Resources:** ฐานข้อมูลสินค้าสเปกเชิงลึก, ตัวเว็บแอปพลิเคชัน, เครือข่ายการขนส่ง
* **Key Partners:** แบรนด์เกมมิ่งเกียร์ชั้นนำ, คอนเทนต์ครีเอเตอร์รีวิวจัดโต๊ะคอม (KOLs), ผู้ให้บริการจัดส่งพัสดุ
* **Cost Structure:** ค่าดูแลระบบเซิร์ฟเวอร์, ค่าการตลาดและ KOLs, ต้นทุนการเก็บสินค้าในคลัง

### 1.2 ขอบเขตการทำงาน (Use Cases Summary - จาก 03_use-case-diagram)
* **บทบาทผู้ใช้ (Actors):**
  - **ลูกค้า (Customer / Guest):** สมัครสมาชิก, เข้าสู่ระบบ, ค้นหาและกรองสินค้า, เปรียบเทียบสเปกสินค้า (สูงสุด 3 รายการ), หยิบใส่ตะกร้า, กรอกที่อยู่จัดส่ง, ชำระเงิน (PromptPay สแกน QR / บัตรเครดิต-เดบิต), บันทึกสินค้าในรายการโปรด (Wishlist), เขียนความคิดเห็นและรีวิวให้คะแนนดาวสินค้า, ตรวจดูประวัติใบเสร็จสั่งซื้อและเลขติดตามพัสดุจัดส่ง (My Orders)
  - **ผู้ดูแลระบบ (Admin):** เข้าสู่ระบบแอดมิน, จัดการข้อมูลสินค้า (เพิ่ม, ลบ, แก้ไขรายละเอียดและสเปกของเมาส์/คีย์บอร์ด/หูฟัง), จัดการคำสั่งซื้อของลูกค้า (ดูรายการสั่งซื้อ, อัปเดตสถานะการส่ง, บันทึกเลขติดตามพัสดุ), ดูแดชบอร์ดสรุปวิเคราะห์ยอดขายและอัตราส่วนสินค้าขายดี (Sales Stats & Charts)

---

## 👥 2. แผนผังความต้องการและประสบการณ์ผู้ใช้ (Persona & Journeys)

*(ข้อมูลสรุปรายละเอียดจากแผนภาพ 08, 09, 10 ในโฟลเดอร์ data-project)*

### 2.1 ข้อมูลกลุ่มผู้ใช้งานตัวแทน (User Personas)
1. **พีท (Esports Gamer):** ต้องการเปรียบเทียบขนาด น้ำหนัก สเปกเซนเซอร์ (PixArt) และอัตราการตอบสนอง (Polling Rate) ไร้สายที่ลึกและละเอียด เพื่อใช้สำหรับซ้อมและแข่งขันเกม FPS
2. **ฟ้า (Aesthetic Gamer):** เน้นโทนสีพาสเทล (ขาว/ชมพู) หน้าตา UI สวยงามน่ารัก และอธิบายชนิดสวิตช์ปุ่มกดเสียงทุ้มนุ่ม (Thocky/Linear) ด้วยภาษาไทยง่ายๆ
3. **ก้อง (PC Enthusiast):** เน้นวัสดุระดับไฮเอนด์ (บอดี้ CNC อะลูมิเนียม) โครงสร้างภายในคีย์บอร์ด (Gasket Mount) สิทธิ์พิเศษ VIP และบริการจัดส่งด่วนในวันนั้น
4. **แม่วรรณ (Gift Buyer - Non-Gamer):** ต้องการป้ายปักบอกยอดนิยม/ขายดีที่สุด แสดงความเข้ากันได้กับเครื่องเล่นเกมคอนโซล (เช่น รองรับ PS5/Switch) และซื้อของผ่านระบบ Guest Checkout ได้ทันทีโดยไม่ต้องสมัครสมาชิก

### 2.2 Customer Journey Map & Social Funnel
* **การสั่งซื้อ:** ค้นหาสินค้า $\rightarrow$ เลือกสินค้าเข้าตารางเปรียบเทียบ $\rightarrow$ ยืนยันสเปกน้ำหนัก/ชนิดปุ่ม $\rightarrow$ หยิบใส่ตะกร้า $\rightarrow$ จ่ายเงินผ่านพร้อมเพย์แสกนด่วน $\rightarrow$ รับใบประกันผ่านทาง LINE OA
* **ช่องทางเข้าถึงจากโซเชียล (Social funnel):** รับชมวีดีโอรีวิวเสียงกดคีย์บอร์ดจาก KOLs $\rightarrow$ กดลิงก์จากคลิปเข้าสู่ Landing Page มือถือ $\rightarrow$ ใช้ระบบ Compare เพื่อวิเคราะห์ความคุ้มค่า $\rightarrow$ จ่ายเงินและแอดไลน์ร้าน $\rightarrow$ ถ่ายภาพลงโซเชียลแลกแต้มสะสม

---

## 🗄️ 3. โครงสร้างฐานข้อมูล MongoDB (JSON Schemas)

### 3.1 Users Collection Schema (`05_mongodb.schema_user.json`)
```json
{
  "collectionName": "users",
  "schema": {
    "bsonType": "object",
    "required": ["username", "email", "password", "role"],
    "properties": {
      "username": { "bsonType": "string" },
      "email": { "bsonType": "string" },
      "password": { "bsonType": "string" },
      "role": { "bsonType": "string" },
      "profile": {
        "bsonType": "object",
        "required": ["firstName", "lastName", "phoneNumber"],
        "properties": {
          "firstName": { "bsonType": "string" },
          "lastName": { "bsonType": "string" },
          "phoneNumber": { "bsonType": "string" }
        }
      }
    }
  }
}
```

### 3.2 Products Collection Schema (`06_mongodb-schema_products.json`)
```json
{
  "collectionName": "products",
  "schema": {
    "bsonType": "object",
    "required": ["name", "category", "price", "stock", "specifications"],
    "properties": {
      "name": { "bsonType": "string" },
      "description": { "bsonType": "string" },
      "category": { "bsonType": "string" },
      "price": { "bsonType": "number" },
      "stock": { "bsonType": "number" },
      "images": {
        "bsonType": "array",
        "items": { "bsonType": "string" }
      },
      "specifications": {
        "bsonType": "object",
        "properties": {
          "color": { "bsonType": "string" },
          "connection": { "bsonType": "string" },
          "weight": { "bsonType": "string" },
          "sensor": { "bsonType": "string" },
          "pollingRate": { "bsonType": "string" },
          "switchType": { "bsonType": "string" },
          "hotSwappable": { "bsonType": "bool" },
          "batteryLife": { "bsonType": "string" }
        }
      },
      "tags": {
        "bsonType": "array",
        "items": { "bsonType": "string" }
      },
      "reviews": {
        "bsonType": "array",
        "items": {
          "bsonType": "object",
          "required": ["username", "rating", "comment"],
          "properties": {
            "username": { "bsonType": "string" },
            "rating": { "bsonType": "number" },
            "comment": { "bsonType": "string" }
          }
        }
      }
    }
  }
}
```

### 3.3 Orders Collection Schema (`07_mongodb-schema_orders.json`)
```json
{
  "collectionName": "orders",
  "schema": {
    "bsonType": "object",
    "required": ["userId", "items", "shippingAddress", "paymentMethod", "totalAmount", "status"],
    "properties": {
      "userId": { "bsonType": "objectId" },
      "items": {
        "bsonType": "array",
        "items": { "bsonType": "object" }
      },
      "shippingAddress": { "bsonType": "object" },
      "paymentMethod": { "bsonType": "string" },
      "totalAmount": { "bsonType": "number" },
      "status": { "bsonType": "string" },
      "trackingNumber": { "bsonType": "string" }
    }
  }
}
```

---

## 🗃️ 4. ข้อมูลจำลองเริ่มต้น (Mock Data JSON)

### 4.1 ข้อมูลสมาชิกจำลอง (`05_mongodb.example_user.json` - 10 รายการ)
```json
[
  {
    "_id": { "$oid": "6a4f1433acf18de193728459" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845a" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845b" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845c" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845d" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845e" },
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
    "_id": { "$oid": "6a4f1433acf18de19372845f" },
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
    "_id": { "$oid": "6a4f1433acf18de193728460" },
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
    "_id": { "$oid": "6a4f1433acf18de193728461" },
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
    "_id": { "$oid": "6a4f1433acf18de193728462" },
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
]
```

### 4.2 ข้อมูลสินค้าจำลอง (`06_mongodb-example_products.json` - 6 รายการ)
```json
[
  {
    "_id": { "$oid": "6a4f1433acf18de19372848b" },
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
    "_id": { "$oid": "6a4f1433acf18de19372848c" },
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
    "_id": { "$oid": "6a4f1433acf18de193728495" },
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
    "_id": { "$oid": "6a4f1433acf18de193728496" },
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
    "_id": { "$oid": "6a4f1433acf18de193728498" },
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
    "_id": { "$oid": "6a4f1433acf18de193728499" },
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
  }
]
```

### 4.3 ข้อมูลประวัติการสั่งซื้อจำลอง (`07_mongodb-example_orders.json` - 6 รายการ)
```json
[
  {
    "_id": { "$oid": "6a4f1433acf18de1937284bd" },
    "userId": { "$oid": "6a4f1433acf18de19372845e" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de19372848b" },
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
    "_id": { "$oid": "6a4f1433acf18de1937284be" },
    "userId": { "$oid": "6a4f1433acf18de19372845f" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de19372848c" },
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
    "_id": { "$oid": "6a4f1433acf18de1937284bf" },
    "userId": { "$oid": "6a4f1433acf18de193728460" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de193728495" },
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
    "_id": { "$oid": "6a4f1433acf18de1937284c0" },
    "userId": { "$oid": "6a4f1433acf18de193728461" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de193728496" },
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
    "_id": { "$oid": "6a4f1433acf18de1937284c1" },
    "userId": { "$oid": "6a4f1433acf18de193728462" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de193728498" },
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
    "_id": { "$oid": "6a4f1433acf18de1937284c2" },
    "userId": { "$oid": "6a4f1433acf18de19372845e" },
    "items": [
      {
        "productId": { "$oid": "6a4f1433acf18de193728499" },
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
]
```
