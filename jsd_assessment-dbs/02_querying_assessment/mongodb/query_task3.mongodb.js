// Task 3: Stock Replenishment Check (การตรวจสอบการเติมสินค้าคงคลัง)
// Before placing the weekly supply order, the manager wants to avoid over-ordering ingredients
// that are already well-stocked. They need a list of every ingredient with a stock level
// of 100 or more so those can be deprioritised in this week's order.
// (ก่อนสั่งซื้อวัตถุดิบรายสัปดาห์ ผู้จัดการต้องการหลีกเลี่ยงการสั่งวัตถุดิบที่มีอยู่ในคลังมากเกินไป พวกเขาต้องการรายชื่อวัตถุดิบทั้งหมดที่มีระดับสต็อก (stock level) ตั้งแต่ 100 ขึ้นไป เพื่อลดความสำคัญในการสั่งซื้อสัปดาห์นี้)
//
// Hint: Write a query to find all ingredients in the ingredients collection that have a stock_level of 100.00 or more.
// (คำใบ้: เขียนคิวรีเพื่อค้นหาวัตถุดิบทั้งหมดในคอลเลกชัน ingredients ที่มีระดับ stock_level ตั้งแต่ 100.00 ขึ้นไป)

// Bonus: The dataset is identical in the PostgreSQL database, meaning the same business insight can be retrieved.
// Write the equivalent query for PostgreSQL. See query_task3_bonus.sql
// (โบนัส: ชุดข้อมูลในฐานข้อมูล PostgreSQL มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้ เขียนคิวรีที่เทียบเท่ากันสำหรับ PostgreSQL ดูที่ไฟล์ query_task3_bonus.sql)

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking: หารายการวัตถุดิบที่มี stoke เกิน 100 ขึ้นไป
// ในคอลเลกชัน ingredients ต้องหาแค่ stock_level
// เราจะใช้คิวรี find() เพื่อหาที่ตรงกับเงื่อนไข 

use("chrome-burger-db-jsd13");

db.ingredients.find({ stock_level: { $gte: 100.00 } });