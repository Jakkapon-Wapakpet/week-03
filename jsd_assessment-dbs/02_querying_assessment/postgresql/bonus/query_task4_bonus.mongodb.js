// Task 4 Bonus: Supplier Dependency Check (โบนัสการตรวจสอบการพึ่งพาซัพพลายเออร์)
// The manager has just heard that 'Freshest Farm Produce' may be delayed on their next delivery.
// Before deciding whether to source from an alternative supplier, they need to know exactly
// which ingredients depend on that supplier, so they can assess the impact on the menu.
// (ผู้จัดการเพิ่งได้รับแจ้งว่าการจัดส่งครั้งถัดไปจาก 'Freshest Farm Produce' อาจล่าช้า ก่อนตัดสินใจว่าจะสรรหาวัตถิบจากซัพพลายเออร์ทางเลือกอื่นหรือไม่ พวกเขาจำเป็นต้องทราบให้แน่ชัดว่า มีวัตถุดิบใดบ้างที่ขึ้นอยู่กับซัพพลายเออร์รายดังกล่าว เพื่อนำมาประเมินผลกระทบต่อรายการเมนูอาหาร)
//
// The dataset is identical in MongoDB — the same business insight can be retrieved.
// (ชุดข้อมูลใน MongoDB มีความเหมือนกันทุกประการ — สามารถดึงข้อมูลเชิงธุรกิจแบบเดียวกันได้)
//
// Hint: In the ingredients collection, supplier references are stored as ObjectIds rather than names.
// Use an aggregation pipeline with $lookup to join the ingredients collection with the suppliers
// collection, then filter where the supplier name is 'Freshest Farm Produce' and return
// only the ingredient names.
// (คำใบ้: ในคอลเลกชัน ingredients การอ้างอิงถึงซัพพลายเออร์จะถูกจัดเก็บเป็น ObjectId แทนที่จะเป็นชื่อจริง ให้ใช้ท่อส่งข้อมูลการทำ aggregation (aggregation pipeline) ร่วมกับ $lookup เพื่อเชื่อมคอลเลกชัน ingredients เข้ากับคอลเลกชัน suppliers จากนั้นให้กรองเอกสารเฉพาะเมื่อชื่อซัพพลายเออร์เป็น 'Freshest Farm Produce' และแสดงผลลัพธ์เฉพาะรายชื่อของวัตถุดิบเท่านั้น)

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
