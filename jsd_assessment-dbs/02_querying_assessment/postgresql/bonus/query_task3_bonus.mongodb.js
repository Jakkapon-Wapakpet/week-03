// Task 3 Bonus: Staff Performance Review (โบนัสการประเมินผลการปฏิบัติงานของพนักงาน)
// At the end of the month, the owner wants to reward the hardest-working cashiers.
// To decide fairly, they want to see how many orders each staff member has processed,
// with the busiest staff member appearing at the top of the list.
// (เมื่อสิ้นเดือน เจ้าของต้องการมอบรางวัลให้แก่พนักงานแคชเชียร์ที่ทำงานหนักที่สุด เพื่อให้ตัดสินใจได้อย่างยุติธรรม พวกเขาต้องการดูว่าพนักงานแต่ละคนประมวลผลคำสั่งซื้อไปเป็นจำนวนเท่าใด โดยให้พนักงานที่ทำงานยุ่งที่สุด (มีจำนวนคำสั่งซื้อมากที่สุด) แสดงอยู่ที่ด้านบนสุดของรายการ)
//
// The dataset is identical in MongoDB — the same business insight can be retrieved.
// (ชุดข้อมูลใน MongoDB มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
//
// Hint: Write an aggregation query on the orders collection to count the number of orders
// per staff member. Each order embeds the staff member's first and last name directly.
// The result should show each staff member's full name and their total order count,
// ordered by the count in descending order.
// (คำใบ้: เขียนคิวรีแบบ aggregation บนคอลเลกชัน orders เพื่อนับจำนวนคำสั่งซื้อของพนักงานแต่ละคน โดยในแต่ละคำสั่งซื้อจะระบุชื่อและนามสกุลของพนักงานฝังไว้โดยตรง ผลลัพธ์ที่ได้ควรแสดงชื่อเต็มของพนักงานแต่ละคนและจำนวนคำสั่งซื้อรวมของพวกเขา เรียงลำดับตามจำนวนคำสั่งจากมากไปน้อย)

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking:
//
