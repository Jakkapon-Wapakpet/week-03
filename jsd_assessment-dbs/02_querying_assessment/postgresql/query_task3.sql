-- Task 3: Staff Performance Review (การประเมินผลการปฏิบัติงานของพนักงาน)
-- At the end of the month, the owner wants to reward the hardest-working cashiers.
-- To decide fairly, they want to see how many orders each staff member has processed,
-- with the busiest staff member appearing at the top of the list.
-- (เมื่อสิ้นเดือน เจ้าของต้องการมอบรางวัลให้แก่พนักงานแคชเชียร์ที่ทำงานหนักที่สุด เพื่อให้ตัดสินใจได้อย่างยุติธรรม พวกเขาต้องการดูว่าพนักงานแต่ละคนประมวลผลคำสั่งซื้อไปเป็นจำนวนเท่าใด โดยให้พนักงานที่ทำงานยุ่งที่สุด (มีจำนวนคำสั่งซื้อมากที่สุด) แสดงอยู่ที่ด้านบนสุดของรายการ)
--
-- Hint: Write a query to find the total number of orders processed by each staff member.
-- The result should show the staff member's full name (concatenated) and their total order count,
-- ordered by the count in descending order.
-- (คำใบ้: เขียนคิวรีเพื่อค้นหาจำนวนคำสั่งซื้อทั้งหมดที่ดำเนินการโดยพนักงานแต่ละคน ผลลัพธ์ควรแสดงชื่อเต็มของพนักงาน (ที่เกิดจากการนำชื่อและนามสกุลมาเชื่อมต่อกัน) และจำนวนคำสั่งซื้อรวมของพวกเขา โดยเรียงลำดับตามจำนวนคำสั่งซื้อจากมากไปหาน้อย)

-- Bonus: The dataset is identical in the MongoDB database, meaning the same business insight can be retrieved.
-- Write the equivalent query for MongoDB. See query_task3_bonus.mongodb.js
-- (โบนัส: ชุดข้อมูลในฐานข้อมูล MongoDB มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้ เขียนคิวรีที่เทียบเท่ากันสำหรับ MongoDB ดูที่ไฟล์ query_task3_bonus.mongodb.js)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.

-- Your thinking: หาจำนวนออเดอร์ทั้งหมดที่ประมวลผลโดยพนักงานแต่ละคน และรวมชื่อจริงและนามสกุลเข้าด้วยกัน เรียงจากจำนวนออเดอร์มากไปน้อย
-- เราจะใช้การ JOIN ระหว่างตาราง staff และ orders โดยใช้ staff_id
-- ใช้ฟังก์ชัน CONCAT เพื่อรวมชื่อ-นามสกุล และใช้ COUNT เพื่อหาจำนวนออเดอร์ทั้งหมดของแต่ละคน
-- ใช้ GROUP BY กับข้อมูลพนักงานเพื่อจัดกลุ่มในการนับยอด และ ORDER BY DESC เพื่อเรียงจากมากไปน้อย
--

SELECT 
    CONCAT(first_name, ' ', last_name) AS full_name,
    COUNT(order_id) AS total_orders
FROM staff
JOIN orders ON staff.staff_id = orders.staff_id
GROUP BY staff.staff_id, first_name, last_name
ORDER BY total_orders DESC;