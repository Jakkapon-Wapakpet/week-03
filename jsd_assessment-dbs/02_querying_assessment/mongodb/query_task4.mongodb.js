// Task 4: Total Revenue Summary (สรุปรายได้รวม)
// At the end of the trading period, the owner wants a single figure that shows how much revenue
// the truck has generated across all recorded orders. This number will be used in their
// financial summary report, so the result should be returned as a single value named total_revenue.
// (เมื่อสิ้นสุดช่วงเวลาการขาย เจ้าของต้องการตัวเลขเดียวที่แสดงรายได้ทั้งหมดที่รถขายอาหาร (food truck) ทำได้จากรายการสั่งซื้อทั้งหมดที่บันทึกไว้ ตัวเลขนี้จะถูกนำไปใช้ในรายงานสรุปทางการเงิน ดังนั้นผลลัพธ์ควรส่งกลับมาเป็นค่าเดียวชื่อ total_revenue)
//
// Hint: Write an aggregation query on the orders collection to calculate the total revenue from all orders combined.
// The result should be a single document with a field named total_revenue.
// (คำใบ้: เขียนคิวรีแบบ aggregation บนคอลเลกชัน orders เพื่อคำนวณรายได้รวมจากคำสั่งซื้อทั้งหมดเข้าด้วยกัน ผลลัพธ์ที่ได้ควรเป็นเอกสาร (document) เดี่ยวที่มีฟิลด์ชื่อ total_revenue)

// Bonus: The dataset is identical in the PostgreSQL database, meaning the same business insight can be retrieved.
// Write the equivalent query for PostgreSQL. See query_task4_bonus.sql
// (โบนัส: ชุดข้อมูลในฐานข้อมูล PostgreSQL มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้ เขียนคิวรีที่เทียบเท่ากันสำหรับ PostgreSQL ดูที่ไฟล์ query_task4_bonus.sql)

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking: หา total_revenue 
// ในคอลเลกชัน orders ต้องคำนวณรายได้รวมจากคำสั่งซื้อทั้งหมดเข้าด้วยกัน
// 

use("chrome-burger-db-jsd13");


db.orders.aggregate([
  {
    $group: {
      _id: null, // ใช้ null เพื่อรวมทุก document เข้าด้วยกัน
      total_revenue: { $sum: "$total_price" } // รวมค่าจากฟิลด์ total_price
    }
  },
  {
    $project: {
      _id: 0, // ไม่แสดงค่า _id
      total_revenue: 1
    }
  }
]);




