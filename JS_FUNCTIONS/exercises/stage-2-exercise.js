import { menuItems } from "../fakeData/foodTruckDB.js";

// Stage 2: Reading arrays with indexes and length
// ขั้นที่ 2: การอ่านข้อมูลใน Array ด้วย Index และ Length
//
// Run this file with:  node exercises/stage-2-exercise.js
// รันไฟล์นี้ด้วยคำสั่ง: node exercises/stage-2-exercise.js
//
// Each console.log below shows the expected output as a comment.
// console.log แต่ละบรรทัดด้านล่างแสดงผลลัพธ์ที่คาดหวังในรูปแบบคอมเมนต์
//
// Implement the functions until all outputs match.
// เขียนโค้ดในฟังก์ชันต่าง ๆ จนกว่าผลลัพธ์ทั้งหมดจะตรงตามที่คาดไว้

// ---------------------------------------------------------------------------
// Exercise 1
// Write a function called countMenuItems.
// เขียนฟังก์ชันชื่อ countMenuItems
//
// It receives an array of menu items and returns how many items are in the array.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู (items) และส่งคืนค่าจำนวนรายการทั้งหมดที่มีอยู่ในอาร์เรย์นั้น
//
// Expected output: 5
// ผลลัพธ์ที่คาดหวัง: 5

function countMenuItems(items) {
  return items.length;
}

console.log(countMenuItems(menuItems));
// 5

// ---------------------------------------------------------------------------
// Exercise 2
// Write a function called getFirstMenuItem.
// เขียนฟังก์ชันชื่อ getFirstMenuItem
//
// It receives an array of menu items and returns the first item object.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู และส่งคืนอ็อบเจกต์ของรายการแรกสุดในอาร์เรย์
//
// Expected output: { id: 1, name: "Chrome Classic", category: "burger", price: 180, isAvailable: true, stock: 12 }
// ผลลัพธ์ที่คาดหวัง: { id: 1, name: "Chrome Classic", category: "burger", price: 180, isAvailable: true, stock: 12 }

function getFirstMenuItem(items) {
 return items[0];
}

console.log(getFirstMenuItem(menuItems));
// { id: 1, name: 'Chrome Classic', category: 'burger', price: 180, isAvailable: true, stock: 12 }

// ---------------------------------------------------------------------------
// Exercise 3
// Write a function called getFirstItemName.
// เขียนฟังก์ชันชื่อ getFirstItemName
//
// It receives an array of menu items and returns the name of the first item.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู และส่งคืนชื่อ (name) ของรายการแรกสุดในอาร์เรย์
//
// Expected output: "Chrome Classic"
// ผลลัพธ์ที่คาดหวัง: "Chrome Classic"

function getFirstItemName(items) {
  return items[0].name;
}

console.log(getFirstItemName(menuItems));
// "Chrome Classic"

// ---------------------------------------------------------------------------
// Exercise 4
// Write a function called getLastMenuItem.
// เขียนฟังก์ชันชื่อ getLastMenuItem
//
// It receives an array of menu items and returns the last item object.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู และส่งคืนอ็อบเจกต์ของรายการสุดท้ายในอาร์เรย์
//
// Do not hard-code the index — use items.length to calculate it.
// ห้ามระบุค่าดัชนี (index) เป็นตัวเลขตรง ๆ (hard-code) — ให้คำนวณตำแหน่งจาก items.length
//
// Expected output: { id: 5, name: "Spicy Gear Burger", ... }
// ผลลัพธ์ที่คาดหวัง: { id: 5, name: "Spicy Gear Burger", ... }

function getLastMenuItem(items) {
  return items[items.length 3];
}

console.log(getLastMenuItem(menuItems));
// { id: 5, name: 'Spicy Gear Burger', category: 'burger', price: 220, isAvailable: true, stock: 8 }

// ---------------------------------------------------------------------------
// Exercise 5
// Write a function called getLastItemPrice.
// เขียนฟังก์ชันชื่อ getLastItemPrice
//
// It receives an array of menu items and returns the price of the last item.
// ฟังก์ชันนี้รับอาร์เรย์ของเมนู และส่งคืนราคา (price) ของรายการสุดท้ายในอาร์เรย์
//
// Expected output: 220
// ผลลัพธ์ที่คาดหวัง: 220

function getLastItemPrice(items) {
  return items[items.length-1].price;
}

console.log(getLastItemPrice(menuItems));
// 220