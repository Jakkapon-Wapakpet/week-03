// Task 1: Budget Meal Deal (โปรโมชั่นชุดอาหารประหยัด)
// The owner wants to introduce a budget-friendly meal deal promotion and needs to identify
// which menu items could be included. To qualify, an item must be priced under $10.00,
// so they can offer good value without cutting too deep into margins.
// (เจ้าของร้านต้องการจัดโปรโมชั่นชุดอาหารราคาประหยัด และจำเป็นต้องระบุว่ามีรายการอาหารใดบ้างที่สามารถเข้าร่วมได้
// โดยรายการอาหารที่เข้าเกณฑ์จะต้องมีราคาต่ำกว่า $10.00 เพื่อเสนอความคุ้มค่าให้ลูกค้าโดยไม่ส่งผลกระทบต่อกำไรมากเกินไป)
//
// Hint: Write a query to find all menu items in the menu_items collection that have a price less than 10.00.
// (คำใบ้: เขียนคิวรีเพื่อค้นหารายการอาหารทั้งหมดในคอลเลกชัน menu_items ที่มีราคาต่ำกว่า 10.00)

// Bonus: The dataset is identical in the PostgreSQL database, meaning the same business insight can be retrieved.
// Write the equivalent query for PostgreSQL. See query_task1_bonus.sql
// (โบนัส: ชุดข้อมูลในฐานข้อมูล PostgreSQL มีความเหมือนกันทุกประการ ซึ่งหมายความว่าสามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันออกมาได้
// เขียนคิวรีที่เทียบเท่ากันสำหรับ PostgreSQL ดูที่ไฟล์ query_task1_bonus.sql)

// ---------------------------------------------------------------
// Your thinking process (required)
// ---------------------------------------------------------------
// Before writing your query, explain in your own words how you
// interpreted the task, what data you need, which collection(s)
// are involved, and what MongoDB concepts you plan to use.
// Write in English or Thai. Do not skip this step.
//
// Your thinking: โจทก์ต้องการให้เราหาว่ามีอาหาร ที่มีราคาต่ำกว่า 10 ดอลลาห์
// ในคอลเลกชัน menu_items
// เราจะใช้คิวรี find() เพื่อหาที่ตรงกับเงื่อนไข
// และใช้ $lt เพื่อหาราคาต่ำกว่า 10 ดอลลาห์
//
use("chrome-burger-db-jsd13");

db.menu_items.find({ price: { $lt: 10.00 } });

