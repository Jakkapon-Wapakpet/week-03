// To run this script, make sure your database is selected in the VS Code extension.
use("chrome-burger-db");

// This command will delete all existing documents in the 'orders' collection.
// Comment it out if you want to append the data instead of replacing it.
db.getCollection("orders").deleteMany({});

// Insert the documents into the 'orders' collection.
db.getCollection("orders").insertMany([
  {
    _id: ObjectId("634d00000000000000000041"),
    order_date: ISODate("2025-10-26T12:05:00Z"),
    total_price: Decimal128("34.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000042"),
    order_date: ISODate("2025-10-26T12:10:00Z"),
    total_price: Decimal128("19.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000033"),
        name: "The Aloha Burger",
        price: Decimal128("13.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000036"),
        name: "Onion Rings",
        price: Decimal128("6.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000043"),
    order_date: ISODate("2025-10-26T12:15:00Z"),
    total_price: Decimal128("25.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 2,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000044"),
    order_date: ISODate("2025-10-26T12:20:00Z"),
    total_price: Decimal128("9.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000038"),
        name: "Bottled Water",
        price: Decimal128("2.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000045"),
    order_date: ISODate("2025-10-26T12:30:00Z"),
    total_price: Decimal128("13.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000034"),
        name: "Veggie Burger",
        price: Decimal128("11.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000038"),
        name: "Bottled Water",
        price: Decimal128("2.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000046"),
    order_date: ISODate("2025-10-26T12:35:00Z"),
    total_price: Decimal128("38.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 2,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 2,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000047"),
    order_date: ISODate("2025-10-27T12:05:00Z"),
    total_price: Decimal128("19.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000033"),
        name: "The Aloha Burger",
        price: Decimal128("13.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000036"),
        name: "Onion Rings",
        price: Decimal128("6.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000048"),
    order_date: ISODate("2025-10-27T12:10:00Z"),
    total_price: Decimal128("80.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000012"),
      first_name: "John",
      last_name: "Smith",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 4,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 4,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 4,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000049"),
    order_date: ISODate("2025-10-27T12:15:00Z"),
    total_price: Decimal128("14.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004a"),
    order_date: ISODate("2025-10-28T12:00:00Z"),
    total_price: Decimal128("17.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000034"),
        name: "Veggie Burger",
        price: Decimal128("11.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000036"),
        name: "Onion Rings",
        price: Decimal128("6.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004b"),
    order_date: ISODate("2025-10-28T12:05:00Z"),
    total_price: Decimal128("25.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 2,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004c"),
    order_date: ISODate("2025-10-28T12:10:00Z"),
    total_price: Decimal128("21.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000012"),
      first_name: "John",
      last_name: "Smith",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000033"),
        name: "The Aloha Burger",
        price: Decimal128("13.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004d"),
    order_date: ISODate("2025-10-29T12:00:00Z"),
    total_price: Decimal128("57.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 3,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 3,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004e"),
    order_date: ISODate("2025-10-29T12:05:00Z"),
    total_price: Decimal128("14.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000038"),
        name: "Bottled Water",
        price: Decimal128("2.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d0000000000000000004f"),
    order_date: ISODate("2025-10-29T12:10:00Z"),
    total_price: Decimal128("40.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000012"),
      first_name: "John",
      last_name: "Smith",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000034"),
        name: "Veggie Burger",
        price: Decimal128("11.50"),
        quantity: 2,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000036"),
        name: "Onion Rings",
        price: Decimal128("6.00"),
        quantity: 2,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 2,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000050"),
    order_date: ISODate("2025-10-29T12:15:00Z"),
    total_price: Decimal128("19.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000051"),
    order_date: ISODate("2025-10-30T12:00:00Z"),
    total_price: Decimal128("12.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000052"),
    order_date: ISODate("2025-10-30T12:05:00Z"),
    total_price: Decimal128("16.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000012"),
      first_name: "John",
      last_name: "Smith",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000033"),
        name: "The Aloha Burger",
        price: Decimal128("13.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000053"),
    order_date: ISODate("2025-10-30T12:10:00Z"),
    total_price: Decimal128("10.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 2,
      },
    ],
  },
]);
