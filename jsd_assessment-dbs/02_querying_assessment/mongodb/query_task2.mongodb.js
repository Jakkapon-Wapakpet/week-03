// Task 2: Shift Activity Report (รายงานกิจกรรมการปฏิบัติงาน)
// Jane Doe has an upcoming performance review and the manager wants to look at her order history
// ahead of the meeting. They only need to see when each order was placed and what it was worth —
// no other details are required for this particular review.
// (Jane Doe กำลังจะรับการประเมินผลงาน และผู้จัดการต้องการดูประวัติการสั่งซื้อที่เธอรับผิดชอบก่อนการประชุม โดยพวกเขาต้องการดูเพียงแค่วันที่สั่งซื้อ (order_date) และมูลค่าการสั่งซื้อ (total_price) เท่านั้น ไม่จำเป็นต้องแสดงรายละเอียดอื่นๆ สำหรับการประเมินในครั้งนี้)
//
// Hint: Write a query to find all orders handled by the staff member "Jane Doe".
// Your query should only return the order_date and total_price fields for these orders.
// (คำใบ้: เขียนคิวรีเพื่อค้นหารายการสั่งซื้อทั้งหมดที่ดำเนินการโดยพนักงานชื่อ "Jane Doe" โดยคิวรีของคุณควรส่งกลับเฉพาะฟิลด์ order_date และ total_price สำหรับรายการสั่งซื้อเหล่านี้เท่านั้น)

// Bonus: The dataset is identical in the PostgreSQL database, meaning the same business insight can be retrieved.
// Write the equivalent query for PostgreSQL. See query_task2_bonus.sql
// (โบนัส: ชุดข้อมูลในฐานข้อมูล PostgreSQL มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้ เขียนคิวรีที่เทียบเท่ากันสำหรับ PostgreSQL ดูที่ไฟล์ query_task2_bonus.sql)

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking: โจทก์ต้องการให้เราหา (order_date) และ (total_price) เป็น doc ในคอลเล็กชั่น ไม่ต้องแสดงอย่างอื่น
// ในคอลเลกชัน (order_date) และ (total_price) ต้องหาแค่ "Jane Doe"
// เราจะใช้คิวรี find() เพื่อหาที่ตรงกับเงื่อนไข มี 3 อย่าง

use("chrome-burger-db-jsd13");

db.orders.find(
    { "staff.first_name": "Jane", "staff.last_name": "Doe" },
    { order_date: 1, total_price: 1, _id: 0 }
);
