-- Task 1: Sides Menu Board (รายการอาหารประเภทเคียง)
-- The owner wants to update the printed menu board that displays only the side dishes.
-- They need a list of every item in the 'Side' category along with its current price,
-- so the designer can produce an accurate board without having to check each item manually.
-- (เจ้าของร้านต้องการปรับปรุงป้ายเมนูพิมพ์ลายที่แสดงเฉพาะรายการอาหารประเภทเคียง (Side Dishes) พวกเขาต้องการรายชื่อของทุกเมนูในหมวดหมู่ 'Side' พร้อมกับราคาปัจจุบัน เพื่อให้นักออกแบบจัดทำป้ายที่ถูกต้องโดยไม่ต้องตรวจสอบแต่ละเมนูด้วยตนเอง)
--
-- Hint: Write a query to find the name and price of all menu items that are in the 'Side' category.
-- (คำใบ้: เขียนคิวรีเพื่อค้นหาชื่อ (name) และราคา (price) ของรายการเมนูอาหารทั้งหมดที่อยู่ในหมวดหมู่ 'Side')

-- Bonus: The dataset is identical in the MongoDB database, meaning the same business insight can be retrieved.
-- Write the equivalent query for MongoDB. See query_task1_bonus.mongodb.js
-- (โบนัส: ชุดข้อมูลในฐานข้อมูล MongoDB มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้ เขียนคิวรีที่เทียบเท่ากันสำหรับ MongoDB ดูที่ไฟล์ query_task1_bonus.mongodb.js)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.
--
-- Your thinking: หาชื่อ (name) และราคา (price) ของเมนูอาหารทั้งหมดที่อยู่ในหมวดหมู่ 'Side'
-- จากตาราง MenuItems
-- เราจะใช้คำสั่ง SELECT เพื่อเลือกฟิลด์ name, price และใช้ WHERE คัดกรอง category = 'Side'
--

SELECT name, price
FROM MenuItems
WHERE category = 'Side';