// Task 1 Bonus: Sides Menu Board (โบนัสรายการอาหารประเภทเคียง)
// The owner wants to update the printed menu board that displays only the side dishes.
// They need a list of every item in the 'Side' category along with its current price,
// so the designer can produce an accurate board without having to check each item manually.
// (เจ้าของร้านต้องการปรับปรุงป้ายเมนูพิมพ์ลายที่แสดงเฉพาะรายการอาหารประเภทเคียง (Side Dishes) พวกเขาต้องการรายชื่อของทุกเมนูในหมวดหมู่ 'Side' พร้อมกับราคาปัจจุบัน เพื่อให้นักออกแบบจัดทำป้ายที่ถูกต้องโดยไม่ต้องตรวจสอบแต่ละเมนูด้วยตนเอง)
//
// The dataset is identical in MongoDB — the same business insight can be retrieved.
// (ชุดข้อมูลใน MongoDB มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
//
// Hint: Write a query on the menu_items collection to find the name and price
// of all documents where the category is 'Side'.
// (คำใบ้: เขียนคิวรีบนคอลเลกชัน menu_items เพื่อค้นหาชื่อ (name) และราคา (price) ของเอกสาร (documents) ทั้งหมดที่มีหมวดหมู่ (category) เป็น 'Side')

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking: หาชื่อ (name) และราคา (price) ของเมนูอาหารทั้งหมดที่อยู่ในหมวดหมู่ 'Side'
// ใช้ find() โดยระบุเงื่อนไขเป็น { category: "Side" }
// และระบุ projection เป็น { name: 1, price: 1, _id: 0 } เพื่อดึงมาเฉพาะฟิลด์ที่ต้องการ
//

use("chrome-burger-db-jsd13");

db.menu_items.find(
  { category: "Side" },
  { name: 1, price: 1, _id: 0 }
);
