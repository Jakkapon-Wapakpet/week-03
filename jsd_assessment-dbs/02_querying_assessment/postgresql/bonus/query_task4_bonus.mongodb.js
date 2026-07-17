// Task 4 Bonus: Supplier Dependency Check
// The manager has just heard that 'Freshest Farm Produce' may be delayed on their next delivery.
// Before deciding whether to source from an alternative supplier, they need to know exactly
// which ingredients depend on that supplier, so they can assess the impact on the menu.
//
// The dataset is identical in MongoDB — the same business insight can be retrieved.
//
// Hint: In the ingredients collection, supplier references are stored as ObjectIds rather than names.
// Use an aggregation pipeline with $lookup to join the ingredients collection with the suppliers
// collection, then filter where the supplier name is 'Freshest Farm Produce' and return
// only the ingredient names.

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
