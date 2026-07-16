import { foodTruck } from "../fakeData/foodTruckDB.js";

// Stage 1: Reading object properties
// ขั้นที่ 1: การอ่าน Property ของ Object
//
// Run this file with:  node exercises/stage-1-exercise.js
// รันไฟล์นี้ด้วยคำสั่ง: node exercises/stage-1-exercise.js
//
// Each console.log below shows the expected output as a comment.
// console.log แต่ละอันด้านล่างแสดงผลลัพธ์ที่คาดหวังไว้ในรูปแบบคอมเมนต์
//
// Implement the functions until all outputs match.
// เขียนโค้ดในฟังก์ชันต่าง ๆ จนกว่าผลลัพธ์ทั้งหมดจะตรงตามที่คาดไว้

// ---------------------------------------------------------------------------
// Exercise 1
// Write a function called getTruckName.
// เขียนฟังก์ชันชื่อ getTruckName
//
// It receives a truck object and returns the value of its name property.
// ฟังก์ชันนี้จะรับอ็อบเจกต์ truck และส่งคืนค่า (return) ของ property ที่ชื่อ name
//
// Expected output: "Chrome and Burger"
// ผลลัพธ์ที่คาดหวัง: "Chrome and Burger"

function getTruckName(truck) {
  return truck.name;
}

console.log(getTruckName(foodTruck));

// "Chrome and Burger"

// ---------------------------------------------------------------------------
// Exercise 2
// Write a function called isTruckOpen.
// เขียนฟังก์ชันชื่อ isTruckOpen
//
// It receives a truck object and returns the value of its isOpen property.
// ฟังก์ชันนี้จะรับอ็อบเจกต์ truck และส่งคืนค่าของ property ที่ชื่อ isOpen
//
// Do not use an if statement — isOpen is already a Boolean.
// ห้ามใช้ if statement — เนื่องจาก isOpen เป็นข้อมูลประเภท Boolean (true/false) อยู่แล้ว
//
// Expected output: true
// ผลลัพธ์ที่คาดหวัง: true

function isTruckOpen(truck) {
  return truck.isOpen;
}

console.log(isTruckOpen(foodTruck));
// true

// ---------------------------------------------------------------------------
// Exercise 3
// Write a function called getDailySalesTarget.
// เขียนฟังก์ชันชื่อ getDailySalesTarget
//
// It receives a truck object and returns the value of its dailySalesTarget property.
// ฟังก์ชันนี้จะรับอ็อบเจกต์ truck และส่งคืนค่าของ property ที่ชื่อ dailySalesTarget
//
// Expected output: 10000
// ผลลัพธ์ที่คาดหวัง: 10000

function getDailySalesTarget(truck) {
  return truck.dailySalesTarget;
}

console.log(getDailySalesTarget(foodTruck));
// 10000

// ---------------------------------------------------------------------------
// Exercise 4
// Write a function called describeTruck.
// เขียนฟังก์ชันชื่อ describeTruck
//
// It receives a truck object and returns a sentence using a template literal:
// ฟังก์ชันนี้จะรับอ็อบเจกต์ truck และส่งคืนข้อความ/ประโยคโดยใช้ template literal:
// "<name> is located in <location>."
//
// Expected output: "Chrome and Burger is located in Bangkok."
// ผลลัพธ์ที่คาดหวัง: "Chrome and Burger is located in Bangkok."

function describeTruck(truck) {
  return `${truck.name} is located in ${truck.location}.`;
}

console.log(describeTruck(foodTruck));
// "Chrome and Burger is located in Bangkok."