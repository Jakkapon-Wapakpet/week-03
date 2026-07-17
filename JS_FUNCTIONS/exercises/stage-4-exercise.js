import { menuItems, orders } from "../fakeData/foodTruckDB.js";

// Stage 4: Selecting multiple objects with filter()
// ขั้นที่ 4: การเลือกอ็อบเจกต์หลายตัวด้วยฟังก์ชัน filter()
//
// Run this file with:  node exercises/stage-4-exercise.js
// รันไฟล์นี้ด้วยคำสั่ง: node exercises/stage-4-exercise.js
//
// Each console.log below shows the expected output as a comment.
// console.log แต่ละบรรทัดด้านล่างแสดงผลลัพธ์ที่คาดหวังในรูปแบบคอมเมนต์
//
// Implement the functions until all outputs match.
// เขียนโค้ดในฟังก์ชันต่าง ๆ จนกว่าผลลัพธ์ทั้งหมดจะตรงตามที่คาดไว้
//
// Reminder:
//   array.filter(callback) returns a new array containing every element
//   where the callback returns true.
// ย้ำเตือน:
//   array.filter(callback) จะส่งคืนอาร์เรย์ใหม่ที่ประกอบด้วยสมาชิกทุกตัวที่ callback ส่งกลับมาเป็น true

// ---------------------------------------------------------------------------
// Exercise 1
// Write a function called getUnavailableItems.
// เขียนฟังก์ชันชื่อ getUnavailableItems
//
// It receives an items array and returns a new array of items where isAvailable is false.
// ฟังก์ชันนี้รับอาร์เรย์ items และส่งคืนอาร์เรย์ใหม่ที่มีเฉพาะรายการเมนูที่ isAvailable เป็น false
//
// Expected output: one item — Neon Cola
// ผลลัพธ์ที่คาดหวัง: 1 รายการ — Neon Cola

function getUnavailableItems(items) {
  return items.filter(item=>item.isAvailable===false);
}

console.log(getUnavailableItems(menuItems));
// [ { id: 4, name: 'Neon Cola', category: 'drink', price: 50, isAvailable: false, stock: 0 } ]

// ---------------------------------------------------------------------------
// Exercise 2
// Write a function called getAffordableItems.
// เขียนฟังก์ชันชื่อ getAffordableItems
//
// It receives an items array and returns items with a price strictly less than 200.
// ฟังก์ชันนี้รับอาร์เรย์ items และส่งคืนเฉพาะรายการที่มีราคาต่ำกว่า 200 (ไม่รวม 200)
//
// Expected output: Chrome Classic (180), Crispy Circuit Fries (90), Neon Cola (50)
// ผลลัพธ์ที่คาดหวัง: Chrome Classic (180), Crispy Circuit Fries (90), Neon Cola (50)

function getAffordableItems(items) {
  return items.filter(item=>item.price<200);
}

console.log(getAffordableItems(menuItems));
// [ { name: 'Chrome Classic', price: 180, ... }, { name: 'Crispy Circuit Fries', price: 90, ... }, { name: 'Neon Cola', price: 50, ... } ]

// ---------------------------------------------------------------------------
// Exercise 3
// Write a function called getLowStockItems.
// เขียนฟังก์ชันชื่อ getLowStockItems
//
// It receives an items array and returns items where stock is less than 10.
// ฟังก์ชันนี้รับอาร์เรย์ items และส่งคืนเฉพาะรายการที่มีจำนวนสินค้าในคลัง (stock) น้อยกว่า 10
//
// Expected output: Double Engine (6), Neon Cola (0), Spicy Gear Burger (8)
// ผลลัพธ์ที่คาดหวัง: Double Engine (6), Neon Cola (0), Spicy Gear Burger (8)

function getLowStockItems(items) {
  return items.filter(item=>item.stock<10);
}

console.log(getLowStockItems(menuItems));
// [ { name: 'Double Engine', stock: 6, ... }, { name: 'Neon Cola', stock: 0, ... }, { name: 'Spicy Gear Burger', stock: 8, ... } ]

// ---------------------------------------------------------------------------
// Exercise 4
// Write a function called getCompletedOrders.
// เขียนฟังก์ชันชื่อ getCompletedOrders
//
// It receives an orderList array and returns orders where status is "completed".
// ฟังก์ชันนี้รับอาร์เรย์ของออเดอร์ (orderList) และส่งคืนเฉพาะออเดอร์ที่มีสถานะ (status) เป็น "completed"
//
// Expected output: ORD-001 (Mali) and ORD-003 (Nina)
// ผลลัพธ์ที่คาดหวัง: ORD-001 (Mali) และ ORD-003 (Nina)

function getCompletedOrders(orderList) {
  return orderList.filter(order=>order.status==='completed')
}

console.log(getCompletedOrders(orders));
// [ { id: 'ORD-001', customerName: 'Mali', status: 'completed', ... }, { id: 'ORD-003', customerName: 'Nina', status: 'completed', ... } ]

// ---------------------------------------------------------------------------
// Exercise 5
// Write a function called getAvailableBurgers.
// เขียนฟังก์ชันชื่อ getAvailableBurgers
//
// It receives an items array and returns items where:
// ฟังก์ชันนี้รับอาร์เรย์ items และส่งคืนเฉพาะรายการที่ตรงเงื่อนไขดังนี้:
//   - category is "burger" (หมวดหมู่ category คือ "burger")
//   - isAvailable is true (และ isAvailable เป็น true)
//
// Both conditions must be true. Use the && operator.
// เงื่อนไขทั้งสองอย่างต้องเป็นจริง ให้ใช้ตัวดำเนินการ &&
//
// Expected output: Chrome Classic, Double Engine, Spicy Gear Burger
// ผลลัพธ์ที่คาดหวัง: Chrome Classic, Double Engine, Spicy Gear Burger

function getAvailableBurgers(items) {
  return items.filter(item=>item.category==='burger' && item.isAvailable===true);
}

console.log(getAvailableBurgers(menuItems));
// [ { name: 'Chrome Classic', category: 'burger', isAvailable: true, ... }, { name: 'Double Engine', ... }, { name: 'Spicy Gear Burger', ... } ]

// ---------------------------------------------------------------------------
// Exercise 6
// Write a function called getBurgersWithinBudget.
// เขียนฟังก์ชันชื่อ getBurgersWithinBudget
//
// It receives an items array and a maximumPrice number.
// ฟังก์ชันนี้รับอาร์เรย์ items และตัวเลขราคาสูงสุด (maximumPrice)
//
// It returns burgers where price is less than or equal to maximumPrice.
// ให้ส่งคืนเฉพาะรายการประเภทเบอร์เกอร์ที่ราคาต่ำกว่าหรือเท่ากับราคาสูงสุด (maximumPrice)
//
// Do not hard-code the price — use the maximumPrice parameter.
// ห้ามระบุราคาสูงสุดเป็นตัวเลขตรง ๆ (hard-code) — ให้ใช้พารามิเตอร์ maximumPrice ในการตรวจสอบ
//
// Expected output for maximumPrice 220: Chrome Classic (180) and Spicy Gear Burger (220)
// ผลลัพธ์ที่คาดหวังสำหรับราคาสูงสุด 220: Chrome Classic (180) และ Spicy Gear Burger (220)

function getBurgersWithinBudget(items, maximumPrice) {
  return items.filter(item=>item.category==='burger' && item.price<=maximumPrice);
}

console.log(getBurgersWithinBudget(menuItems, 220));
// [ { name: 'Chrome Classic', price: 180, ... }, { name: 'Spicy Gear Burger', price: 220, ... } ]