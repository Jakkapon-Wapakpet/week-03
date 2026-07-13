# 🎮 GearHub - Smart Gaming Gear Store

ยินดีต้อนรับสู่ **GearHub** แพลตฟอร์มอีคอมเมิร์ซแบบผู้ขายรายเดียว (Single-vendor E-commerce) ที่มุ่งเน้นการปฏิวัติประสบการณ์การซื้ออุปกรณ์เกมมิ่งเกียร์ (Gaming Peripherals) เช่น เมาส์ คีย์บอร์ด หูฟัง และไมโครโฟน ให้ง่าย สะดวก และคุ้มค่าที่สุดผ่านนวัตกรรมระบบเปรียบเทียบสเปกในตัว (Smart Product Comparison)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (หรือ MongoDB local)

### 1. Clone & Setup

```bash
git clone <repository-url>
cd vibe-code-my-ecommerce
```

### 2. Setup Backend (API)

```bash
cd app/api
npm install

# สร้างไฟล์ .env ตาม template ด้านล่าง
# แล้วรัน seed เพื่อเติมข้อมูลตัวอย่าง
node scripts/seed.js

# Start server
npm run dev
```

**ตัวอย่าง `.env`:**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/gearhub
JWT_SECRET=your_super_secret_key
```

### 3. Setup Frontend (Web)

```bash
cd app/web
npm install
npm run dev
```

เว็บจะเปิดที่ `http://localhost:5173` (Vite dev server)  
API server อยู่ที่ `http://localhost:5000`

---

## 🔑 Test Accounts (หลังรัน Seed)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin.1@gearhub.com` | `Admin@1234` |
| **Customer** | `gamer.1@example.com` | `User@1234` |

> ⚠️ รัน `node scripts/seed.js` ทุกครั้งที่ต้องการ reset ข้อมูล

---

## 📦 Project Structure

```
vibe-code-my-ecommerce/
├── app/
│   ├── api/                        # Backend (Node.js + Express)
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js   # Register / Login / Me
│   │   │   ├── productController.js# CRUD products + Reviews
│   │   │   └── orderController.js  # Orders + Pay + Status
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js   # JWT protect + admin guard
│   │   │   └── dbCheckMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── scripts/
│   │   │   ├── seed.js             # Database seeder
│   │   │   └── drop-collections.js # Drop utility
│   │   ├── server.js
│   │   └── .env
│   └── web/                        # Frontend (React + Vite)
│       └── src/
│           ├── components/
│           │   ├── Header.jsx
│           │   └── ProductCard.jsx
│           ├── context/
│           │   ├── AuthContext.jsx
│           │   ├── CartContext.jsx
│           │   ├── CompareContext.jsx
│           │   ├── WishlistContext.jsx
│           │   └── ToastContext.jsx
│           ├── pages/
│           │   ├── Home.jsx        # หน้าแรก + Bento Grid + Filter
│           │   ├── Compare.jsx     # ตารางเปรียบเทียบสเปก
│           │   ├── Cart.jsx
│           │   ├── Checkout.jsx    # PromptPay QR + Card payment
│           │   ├── MyOrders.jsx    # ประวัติคำสั่งซื้อ
│           │   ├── Wishlist.jsx
│           │   ├── Login.jsx
│           │   ├── Register.jsx
│           │   └── AdminDashboard.jsx
│           ├── App.jsx
│           └── index.css
└── design-system/
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | สมัครสมาชิก (role บังคับเป็น `customer`) |
| POST | `/api/auth/login` | Public | เข้าสู่ระบบ รับ JWT Token |
| GET | `/api/auth/me` | Private | ดูข้อมูลตัวเอง |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | ดึงสินค้าทั้งหมด (รองรับ `?category=`, `?search=`, `?color=`) |
| GET | `/api/products/:id` | Public | ดูรายละเอียดสินค้า |
| POST | `/api/products` | Admin | เพิ่มสินค้า |
| PUT | `/api/products/:id` | Admin | แก้ไขสินค้า |
| DELETE | `/api/products/:id` | Admin | ลบสินค้า |
| POST | `/api/products/:id/reviews` | Private | เขียนรีวิวสินค้า |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | Private | สร้างคำสั่งซื้อ (ตรวจสอบ stock อัตโนมัติ) |
| GET | `/api/orders` | Private | ดูออเดอร์ตัวเอง (Admin เห็นทุกออเดอร์) |
| GET | `/api/orders/:id` | Private | ดูรายละเอียดออเดอร์ |
| PUT | `/api/orders/:id/pay` | Private | ยืนยันการชำระเงิน (PromptPay) |
| PUT | `/api/orders/:id/status` | Admin | อัพเดตสถานะออเดอร์ + เลข Tracking |

---

## ✅ Features

### Customer Features
- [x] **สมัครสมาชิก / เข้าสู่ระบบ** ด้วย JWT Authentication
- [x] **ค้นหาและกรองสินค้า** ตามหมวดหมู่ (Mouse, Keyboard, Headset, Microphone) และค้นหาจากชื่อ/tags
- [x] **Bento Grid Showcase** แสดงสินค้า featured แบบ dynamic บนหน้าแรก
- [x] **ตะกร้าสินค้า** พร้อม persistent ผ่าน localStorage
- [x] **เปรียบเทียบสินค้า** สูงสุด 3 ชิ้นพร้อม highlight สเปกที่ดีที่สุด (เบาสุด/ถูกสุด)
- [x] **Wishlist / รายการโปรด** บันทึกสินค้าสนใจ persistent ผ่าน localStorage
- [x] **Checkout** พร้อมระบบ PromptPay QR Code และบัตรเครดิต/เดบิต
- [x] **ประวัติคำสั่งซื้อ** (My Orders) พร้อม expand รายละเอียดและเลข Tracking
- [x] **เขียนรีวิวสินค้า** พร้อมคะแนนดาวสำหรับสมาชิก

### Admin Features
- [x] **Dashboard** สรุปยอดขาย, ออเดอร์, และสินค้าคงคลัง
- [x] **จัดการสินค้า** เพิ่ม/แก้ไข/ลบสินค้าพร้อมสเปกทุก category
- [x] **จัดการออเดอร์** อัพเดตสถานะ และบันทึกเลขพัสดุจัดส่ง

---

## 🗄️ Database Schemas

### Users Collection (`users`)
```json
{
  "username": "String (required)",
  "email": "String (required)",
  "password": "String (bcrypt hashed)",
  "role": "String: customer | admin",
  "profile": {
    "firstName": "String",
    "lastName": "String",
    "phoneNumber": "String"
  }
}
```

### Products Collection (`products`)
```json
{
  "name": "String (required)",
  "description": "String",
  "category": "String: Mouse | Keyboard | Headset | Microphone",
  "price": "Number (required)",
  "stock": "Number (required)",
  "images": ["String (image path)"],
  "specifications": {
    "color": "String",
    "connection": "String",
    "weight": "String",
    "sensor": "String (Mouse)",
    "pollingRate": "String (Mouse)",
    "switchType": "String (Keyboard)",
    "hotSwappable": "Boolean (Keyboard)",
    "batteryLife": "String (Headset)",
    "polarPattern": "String (Microphone)",
    "frequencyResponse": "String (Microphone)",
    "formFactor": "String (Microphone)"
  },
  "tags": ["String"],
  "reviews": [{
    "username": "String",
    "rating": "Number (1-5)",
    "comment": "String",
    "createdAt": "Date"
  }]
}
```

### Orders Collection (`orders`)
```json
{
  "userId": "ObjectId (ref: User)",
  "items": [{
    "productId": "ObjectId (ref: Product)",
    "name": "String (snapshot)",
    "price": "Number (snapshot)",
    "quantity": "Number"
  }],
  "shippingAddress": {
    "receiverName": "String",
    "phone": "String",
    "addressLine": "String",
    "subDistrict": "String",
    "district": "String",
    "province": "String",
    "postalCode": "String"
  },
  "paymentMethod": "String: CreditCard | DebitCard | PromptPay",
  "totalAmount": "Number",
  "status": "String: Pending | Paid | Processing | Shipped | Delivered | Cancelled",
  "trackingNumber": "String (optional)"
}
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | UI Framework |
| **Styling** | Vanilla CSS | Design System (dark theme, glassmorphism) |
| **Icons** | Lucide React | UI Icons |
| **Backend** | Node.js + Express.js | RESTful API Server |
| **Database** | MongoDB Atlas | Document Database |
| **ODM** | Mongoose | MongoDB Schema & Validation |
| **Auth** | JSON Web Token (JWT) | Stateless Authentication |
| **Password** | bcrypt | Password Hashing |
| **Env** | dotenv | Environment Variables |

---

## 📌 Product Backlog

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| 1 | ระบบ Authentication (Register/Login) | High | ✅ Done |
| 2 | แสดงรายการสินค้า + Filter/Search | High | ✅ Done |
| 3 | ตะกร้าสินค้า (Shopping Cart) | High | ✅ Done |
| 4 | Checkout + Payment (PromptPay/Card) | High | ✅ Done |
| 5 | Admin Dashboard | Medium | ✅ Done |
| 6 | ระบบเปรียบเทียบสินค้า (Compare) | Medium | ✅ Done |
| 7 | Wishlist (รายการโปรด) | Medium | ✅ Done |
| 8 | ประวัติคำสั่งซื้อ (My Orders) | Medium | ✅ Done |
| 9 | ระบบรีวิวสินค้า | Low | ✅ Done |
| 10 | Guest Checkout (ไม่ต้องสมัครสมาชิก) | Low | 🔲 Backlog |
| 11 | LINE OA Integration | Low | 🔲 Backlog |

---

## 👥 Target User Personas

### 4.1 พีท (Pete) - Esports Gamer
> *"อุปกรณ์ทุกชิ้นต้องมี Latency ต่ำที่สุด เมาส์ต้องเบา สวิตช์คีย์บอร์ดต้องตอบสนองทันที!"*
* **ความต้องการหลัก:** ตารางเปรียบเทียบขนาด น้ำหนัก สเปกเซนเซอร์ และ Polling Rate ไร้สายที่ลึกและละเอียด

### 4.2 ฟ้า (Fah) - Aesthetic & Casual Gamer
> *"อยากจัดโต๊ะคอมโทนสีพาสเทล คีย์บอร์ดต้องสวยงามและเสียงกดต้องนุ่มหู (Thocky)"*
* **ความต้องการหลัก:** ค้นหาสินค้าโทนสีพาสเทล ราคาเหมาะสม คำอธิบายภาษาไทยง่ายๆ

### 4.3 ก้อง (Kong) - PC & Tech Enthusiast
> *"ผมยินดีจ่ายแพงกว่าเพื่อวัสดุระดับพรีเมียม และระบบเชื่อมต่อที่เสถียรไร้ที่ติ"*
* **ความต้องการหลัก:** คีย์บอร์ดบอดี้ CNC อะลูมิเนียม เชื่อมต่อ 3 โหมด ข้อมูลวัสดุภายในที่ละเอียด

### 4.4 แม่วรรณ (Mae Wan) - Gift Buyer (Non-Gamer)
> *"แม่ไม่รู้เรื่องไอทีหรอก รู้แค่ลูกอยากได้หูฟังใส่สบาย ทนทาน ไม่แพงเกินไป"*
* **ความต้องการหลัก:** หน้าเว็บสั่งซื้อที่สะดวกรวดเร็ว ไม่ซับซ้อน มีป้ายสินค้าแนะนำ

---

## 🔒 Security Notes

- **Password**: bcrypt hash ด้วย saltRounds=10 (จัดการโดย Mongoose pre-save hook)
- **Role Protection**: การ register จะถูก force เป็น `customer` เสมอ — admin ต้องตั้งโดยตรงใน DB หรือผ่าน seed
- **JWT**: Token มีอายุ 30 วัน เก็บใน `localStorage`
- **Stock Guard**: Stock deduction ใช้ atomic operation (`findOneAndUpdate + $gte`) ป้องกัน race condition
- **Order Ownership**: ลูกค้าดูได้แค่ order ของตัวเอง admin ดูได้ทุก order