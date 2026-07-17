-- Task 4 Bonus: Total Revenue Summary (โบนัสสรุปรายได้รวม)
-- At the end of the trading period, the owner wants a single figure that shows how much revenue
-- the truck has generated across all recorded orders. This number will be used in their
-- financial summary report, so the result should be returned as a single value named total_revenue.
-- (เมื่อสิ้นสุดช่วงเวลาการขาย เจ้าของต้องการตัวเลขเดียวที่แสดงรายได้ทั้งหมดที่รถขายอาหาร (food truck) ทำได้จากคำสั่งซื้อทั้งหมดที่บันทึกไว้ ตัวเลขนี้จะถูกนำไปใช้ในรายงานสรุปทางการเงิน ดังนั้นผลลัพธ์ควรส่งกลับมาเป็นค่าเดียวชื่อ total_revenue)
--
-- The dataset is identical in PostgreSQL — the same business insight can be retrieved.
-- (ชุดข้อมูลใน PostgreSQL มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
--
-- Hint: Write a query that uses an aggregate function on the Orders table
-- to sum the total_price across all orders, returning the result as total_revenue.
-- (คำใบ้: เขียนคิวรีที่ใช้ฟังก์ชันการหาผลรวมรวมกลุ่ม (aggregate function) บนตาราง Orders เพื่อรวม total_price จากคำสั่งซื้อทั้งหมดเข้าด้วยกัน และส่งคืนผลลัพธ์เป็น total_revenue)

-- ---------------------------------------------------------------
-- Your thinking process (required)
-- ---------------------------------------------------------------
-- Before writing your query, explain in your own words how you
-- interpreted the task, what data you need, which table(s) are
-- involved, and what SQL concepts you plan to use.
-- Write in English or Thai. Do not skip this step.
--
-- Your thinking: คำนวณรายได้ทั้งหมดจากตาราง Orders โดยการหาผลรวมของ total_price
-- เราจะใช้ฟังก์ชัน aggregate SUM(total_price) และใช้คำว่า AS เพื่อตั้งชื่อเป็น total_revenue
--
 
SELECT SUM(total_price) AS total_revenue
FROM orders;