// To run this script, make sure your database is selected in the VS Code extension.
use("chrome-burger-db");

// This command will delete all existing documents in the 'staff' collection.
// Comment it out if you want to append the data instead of replacing it.
db.getCollection("staff").deleteMany({});

// Insert the documents into the 'staff' collection.
db.getCollection("staff").insertMany([
  {
    _id: ObjectId("634d00000000000000000011"),
    first_name: "Jane",
    last_name: "Doe",
    role: "Cashier",
  },
  {
    _id: ObjectId("634d00000000000000000012"),
    first_name: "John",
    last_name: "Smith",
    role: "Cook",
  },
  {
    _id: ObjectId("634d00000000000000000013"),
    first_name: "Emily",
    last_name: "Jones",
    role: "Cashier",
  },
  {
    _id: ObjectId("634d00000000000000000014"),
    first_name: "Chris",
    last_name: "Williams",
    role: "Cook",
  },
]);
