-- Task 1 Bonus: Budget Meal Deal (โบนัสโปรโมชั่นชุดอาหารประหยัด)
-- The owner wants to introduce a budget-friendly meal deal promotion and needs to identify
-- which menu items could be included. To qualify, an item must be priced under $10.00,
-- so they can offer good value without cutting too deep into margins.
-- (เจ้าของร้านต้องการจัดโปรโมชั่นชุดอาหารราคาประหยัด และจำเป็นต้องระบุว่ามีรายการอาหารใดบ้างที่สามารถเข้าร่วมได้ โดยรายการอาหารที่เข้าเกณฑ์จะต้องมีราคาต่ำกว่า $10.00 เพื่อเสนอความคุ้มค่าให้ลูกค้าโดยไม่ส่งผลกระทบต่อกำไรมากเกินไป)
--
-- The dataset is identical in PostgreSQL — the same business insight can be retrieved.
-- (ชุดข้อมูลใน PostgreSQL มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
--
-- Hint: Write a query to find the name and price of all rows in the MenuItems table
-- where the price is less than 10.
-- (คำใบ้: เขียนคิวรีเพื่อค้นหาชื่อ (name) และราคา (price) ของแถวทั้งหมดในตาราง MenuItems ที่มีราคาต่ำกว่า 10)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.
--
-- Your thinking: โจทย์ต้องการให้หาชื่อ (name) และราคา (price) ของเมนูอาหารทั้งหมดในตาราง MenuItems ที่มีราคาต่ำกว่า 10.00
-- เราจะใช้คำสั่ง SELECT เพื่อเลือกเฉพาะฟิลด์ name และ price
-- และใช้ WHERE ในการคัดกรองแถวข้อมูลที่มี price < 10.00
--

SELECT name, price
FROM MenuItems
WHERE price < 10.00;