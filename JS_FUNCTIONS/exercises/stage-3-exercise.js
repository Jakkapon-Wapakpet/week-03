import { menuItems, orders } from "../fakeData/foodTruckDB.js";

// Stage 3: Finding one object with find()
// ขั้นที่ 3: การหาอ็อบเจกต์ 1 ตัวด้วยฟังก์ชัน find()
//
// Run this file with:  node exercises/stage-3-exercise.js
// รันไฟล์นี้ด้วยคำสั่ง: node exercises/stage-3-exercise.js
//
// Each console.log below shows the expected output as a comment.
// console.log แต่ละบรรทัดด้านล่างแสดงผลลัพธ์ที่คาดหวังในรูปแบบคอมเมนต์
//
// Implement the functions until all outputs match.
// เขียนโค้ดในฟังก์ชันต่าง ๆ จนกว่าผลลัพธ์ทั้งหมดจะตรงตามที่คาดไว้
//
// Reminder:
//   array.find(callback) returns the first element where the callback returns true,
//   or undefined if no element matches.
// ย้ำเตือน:
//   array.find(callback) จะส่งคืนสมาชิกตัวแรกที่ callback ส่งกลับมาเป็น true
//   หรือคืนค่า undefined หากไม่มีสมาชิกตัวใดตรงเงื่อนไขเลย

// ---------------------------------------------------------------------------
// Exercise 1
// Write a function called findMenuItemById.
// เขียนฟังก์ชันชื่อ findMenuItemById
//
// It receives an items array and an itemId, and returns the matching item object.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู (items) และรหัสเมนู (itemId) จากนั้นส่งคืนอ็อบเจกต์เมนูที่ตรงกัน
//
// Use find() with an arrow function callback that checks item.id === itemId.
// ใช้เมธอด find() ร่วมกับ Callback ที่เขียนในรูปแบบ Arrow Function เพื่อตรวจสอบว่า item.id === itemId
//
// Expected output: { id: 2, name: "Double Engine", ... }
// ผลลัพธ์ที่คาดหวัง: { id: 2, name: "Double Engine", ... }

function findMenuItemById(items, itemId) {
  return items.find(item=>item.id === itemId);
}

console.log(findMenuItemById(menuItems, 2));
// { id: 2, name: 'Double Engine', category: 'burger', price: 250, isAvailable: true, stock: 6 }

// ---------------------------------------------------------------------------
// Exercise 2
// Write a function called findMenuItemByName.
// เขียนฟังก์ชันชื่อ findMenuItemByName
//
// It receives an items array and an itemName, and returns the matching item object.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู (items) และชื่อเมนู (itemName) จากนั้นส่งคืนอ็อบเจกต์เมนูที่ตรงกัน
//
// Expected output: { id: 5, name: "Spicy Gear Burger", ... }
// ผลลัพธ์ที่คาดหวัง: { id: 5, name: "Spicy Gear Burger", ... }

function findMenuItemByName(items, itemName) {
  return items.find(item=>item.name===itemName)
}

console.log(findMenuItemByName(menuItems, "Spicy Gear Burger"));
// { id: 5, name: 'Spicy Gear Burger', category: 'burger', price: 220, isAvailable: true, stock: 8 }

// ---------------------------------------------------------------------------
// Exercise 3
// Write a function called findOrderById.
// เขียนฟังก์ชันชื่อ findOrderById
//
// It receives an orderList array and an orderId string, and returns the matching order.
// ฟังก์ชันนี้รับอาร์เรย์ของออเดอร์ (orderList) และรหัสออเดอร์ (orderId) จากนั้นส่งคืนอ็อบเจกต์ออเดอร์ที่ตรงกัน
//
// Expected output: { id: "ORD-002", customerName: "Somchai", status: "pending" }
// ผลลัพธ์ที่คาดหวัง: { id: "ORD-002", customerName: "Somchai", status: "pending" }

function findOrderById(orderList, orderId) {
  return orderList.find(order=>order.id===orderId)
}

console.log(findOrderById(orders, "ORD-002"));
// { id: 'ORD-002', customerName: 'Somchai', items: [...], status: 'pending' }

// ---------------------------------------------------------------------------
// Exercise 4
// Write a function called getMenuItemNameById.
// เขียนฟังก์ชันชื่อ getMenuItemNameById
//
// It receives an items array and an itemId.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู (items) และรหัสเมนู (itemId)
//
// If a matching item is found, return its name.
// ถ้าหากเจอรหัสเมนูที่ตรงกัน ให้ส่งคืนชื่อของเมนูนั้น
//
// If no item is found (find() returns undefined), return "Menu item not found".
// ถ้าหากหาไม่เจอ (find() ส่งคืนค่า undefined) ให้ส่งข้อความคืนเป็น "Menu item not found"
//
// Expected outputs:
// ผลลัพธ์ที่คาดหวัง:
//   getMenuItemNameById(menuItems, 2)  → "Double Engine"
//   getMenuItemNameById(menuItems, 99) → "Menu item not found"

function getMenuItemNameById(items, itemId) {
  const item = items.find(item => item.id === itemId);
  return item ? item.name : "Menu item not found";
}

console.log(getMenuItemNameById(menuItems, 2));
// "Double Engine"

console.log(getMenuItemNameById(menuItems, 99));
// "Menu item not found"