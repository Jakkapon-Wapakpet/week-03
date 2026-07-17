-- Task 3 Bonus: Stock Replenishment Check (โบนัสการตรวจสอบการเติมสินค้าคงคลัง)
-- Before placing the weekly supply order, the manager wants to avoid over-ordering ingredients
-- that are already well-stocked. They need a list of every ingredient with a stock level
-- of 100 or more so those can be deprioritised in this week's order.
-- (ก่อนสั่งซื้อวัตถุดิบรายสัปดาห์ ผู้จัดการต้องการหลีกเลี่ยงการสั่งวัตถุดิบที่มีอยู่ในคลังมากเกินไป พวกเขาต้องการรายชื่อวัตถุดิบทั้งหมดที่มีระดับสต็อก (stock level) ตั้งแต่ 100 ขึ้นไป เพื่อลดความสำคัญในการสั่งซื้อสัปดาห์นี้)
--
-- The dataset is identical in PostgreSQL — the same business insight can be retrieved.
-- (ชุดข้อมูลใน PostgreSQL มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
--
-- Hint: Write a query to find the name of all rows in the Ingredients table
-- where the stock_level is greater than or equal to 100.
-- (คำใบ้: เขียนคิวรีเพื่อค้นหาชื่อ (name) ของทุกแถวในตาราง Ingredients ที่มีระดับ stock_level ตั้งแต่ 100 ขึ้นไป)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.
--
-- Your thinking: หาชื่อวัตถุดิบทั้งหมดจากตาราง Ingredients ที่มีระดับ stock_level ตั้งแต่ 100 ขึ้นไป
-- เราจะใช้คำสั่ง SELECT เพื่อเลือกคอลัมน์ name จากตาราง Ingredients
-- และใช้ WHERE เพื่อกรองเอาเฉพาะแถวที่ stock_level >= 100.00
--

SELECT name
FROM Ingredients
WHERE stock_level >= 100.00;