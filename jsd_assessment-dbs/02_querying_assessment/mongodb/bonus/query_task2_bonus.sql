-- Task 2 Bonus: Shift Activity Report (โบนัสรายงานกิจกรรมการปฏิบัติงาน)
-- Jane Doe has an upcoming performance review and the manager wants to look at her order history
-- ahead of the meeting. They only need to see when each order was placed and what it was worth —
-- no other details are required for this particular review.
-- (Jane Doe กำลังจะรับการประเมินผลงาน และผู้จัดการต้องการดูประวัติการสั่งซื้อที่เธอรับผิดชอบก่อนการประชุม โดยพวกเขาต้องการดูเพียงแค่วันที่สั่งซื้อและมูลค่าการสั่งซื้อเท่านั้น ไม่จำเป็นต้องแสดงรายละเอียดอื่นๆ สำหรับการประเมินในครั้งนี้)
--
-- The dataset is identical in PostgreSQL — the same business insight can be retrieved.
-- (ชุดข้อมูลใน PostgreSQL มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
--
-- Hint: Write a query to find the order_date and total_price from the Orders table
-- for all orders handled by Jane Doe. You will need to join with the Staff table
-- to filter by the staff member's name.
-- (คำใบ้: เขียนคิวรีเพื่อค้นหา order_date และ total_price จากตาราง Orders ของคำสั่งซื้อทั้งหมดที่ดำเนินการโดย Jane Doe คุณจำเป็นต้องทำการเชื่อม (join) กับตาราง Staff เพื่อกรองข้อมูลด้วยชื่อของพนักงาน)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.
--
-- Your thinking: โจทก์ต้องการให้เราหา (order_date) และ (total_price) เป็น doc ในคอลเล็กชั่น ไม่ต้องแสดงอย่างอื่น
-- ในคอลเลกชัน (order_date) และ (total_price) ต้องหาแค่ "Jane Doe"
-- เราจะใช้คิวรี findOne() เพื่อหาที่ตรงกับเงื่อนไข มี 3 อย่าง

SELECT o.order_date, o.total_price
FROM Orders o
JOIN Staff s ON o.staff_id = s.staff_id
WHERE s.first_name = 'Jane' AND s.last_name = 'Doe';