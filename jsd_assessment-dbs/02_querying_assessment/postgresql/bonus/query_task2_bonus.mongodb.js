// Task 2 Bonus: Kitchen Staff Contact List (โบนัสรายชื่อติดต่อเจ้าหน้าที่ในครัว)
// The manager has a last-minute change to the kitchen prep schedule and needs to notify
// all cooks as soon as possible. They need the full names of every staff member
// whose role is 'Cook' so they can be contacted directly.
// (ผู้จัดการมีการเปลี่ยนแปลงตารางเตรียมงานในครัวอย่างกระทันหันและจำเป็นต้องแจ้งให้ผู้ปรุงอาหาร (Cook) ทุกคนทราบโดยเร็วที่สุด พวกเขาต้องการชื่อ-นามสกุลของเจ้าหน้าที่ทุกคนที่มีบทบาทหน้าที่เป็น 'Cook' เพื่อให้สามารถติดต่อได้โดยตรง)
//
// The dataset is identical in MongoDB — the same business insight can be retrieved.
// (ชุดข้อมูลใน MongoDB มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
//
// Hint: Write a query on the staff collection to find the first_name and last_name
// of all documents where the role is 'Cook'.
// (คำใบ้: เขียนคิวรีบนคอลเลกชัน staff เพื่อค้นหาชื่อจริง (first_name) และนามสกุล (last_name) ของเอกสาร (documents) ทั้งหมดที่มีบทบาทหน้าที่ (role) เป็น 'Cook')

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking:
//

use("chrome-burger-db-jsd13");

db.staff.find(
  { role: "Cook" }
);
