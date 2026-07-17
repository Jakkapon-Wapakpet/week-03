// To run this script, make sure your database is selected in the VS Code extension.
use("chrome-burger-db");

// This command will delete all existing documents in the 'ingredients' collection.
// Comment it out if you want to append the data instead of replacing it.
db.getCollection("ingredients").deleteMany({});

// Insert the documents into the 'ingredients' collection.
db.getCollection("ingredients").insertMany([
  {
    _id: ObjectId("634d00000000000000000021"),
    name: "Beef Patty",
    stock_level: Decimal128("200.00"),
    unit: "units",
    supplier_id: ObjectId("634d00000000000000000001"),
  },
  {
    _id: ObjectId("634d00000000000000000022"),
    name: "Veggie Patty",
    stock_level: Decimal128("100.00"),
    unit: "units",
    supplier_id: ObjectId("634d00000000000000000001"),
  },
  {
    _id: ObjectId("634d00000000000000000023"),
    name: "Burger Bun",
    stock_level: Decimal128("300.00"),
    unit: "units",
    supplier_id: ObjectId("634d00000000000000000002"),
  },
  {
    _id: ObjectId("634d00000000000000000024"),
    name: "Lettuce",
    stock_level: Decimal128("20.00"),
    unit: "heads",
    supplier_id: ObjectId("634d00000000000000000003"),
  },
  {
    _id: ObjectId("634d00000000000000000025"),
    name: "Tomato",
    stock_level: Decimal128("50.00"),
    unit: "units",
    supplier_id: ObjectId("634d00000000000000000003"),
  },
  {
    _id: ObjectId("634d00000000000000000026"),
    name: "Cheese Slice",
    stock_level: Decimal128("400.00"),
    unit: "slices",
    supplier_id: ObjectId("634d00000000000000000001"),
  },
  {
    _id: ObjectId("634d00000000000000000027"),
    name: "Bacon",
    stock_level: Decimal128("150.00"),
    unit: "strips",
    supplier_id: ObjectId("634d00000000000000000001"),
  },
  {
    _id: ObjectId("634d00000000000000000028"),
    name: "Special Sauce",
    stock_level: Decimal128("10.00"),
    unit: "liters",
    supplier_id: ObjectId("634d00000000000000000003"),
  },
  {
    _id: ObjectId("634d00000000000000000029"),
    name: "Potatoes",
    stock_level: Decimal128("100.00"),
    unit: "kg",
    supplier_id: ObjectId("634d00000000000000000003"),
  },
  {
    _id: ObjectId("634d0000000000000000002a"),
    name: "Onions",
    stock_level: Decimal128("25.00"),
    unit: "kg",
    supplier_id: ObjectId("634d00000000000000000003"),
  },
]);
