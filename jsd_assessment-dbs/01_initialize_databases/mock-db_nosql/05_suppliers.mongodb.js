// To run this script, make sure your database is selected in the VS Code extension.
use("chrome-burger-db");

// This command will delete all existing documents in the 'suppliers' collection.
// Comment it out if you want to append the data instead of replacing it.
db.getCollection("suppliers").deleteMany({});

// Insert the documents into the 'suppliers' collection.
db.getCollection("suppliers").insertMany([
  {
    _id: ObjectId("634d00000000000000000001"),
    name: "Patty's Premium Meats",
    contact_person: "Patty Smith",
    phone_number: "555-0101",
  },
  {
    _id: ObjectId("634d00000000000000000002"),
    name: "The Bun Barn",
    contact_person: "Brad Breadson",
    phone_number: "555-0102",
  },
  {
    _id: ObjectId("634d00000000000000000003"),
    name: "Freshest Farm Produce",
    contact_person: "Frank Farmer",
    phone_number: "555-0103",
  },
]);
