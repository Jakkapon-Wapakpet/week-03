// 1. Import necessary libraries using ES Module syntax
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose"; // Import mongoose

// Load environment variables from .env file
dotenv.config();

// 2. Initialize Express app and set port
const app = express();
const port = process.env.PORT || 3000;

// 3. Apply Middleware
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Add security headers

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Body parser middleware
app.use(express.json());

// 4. Database Connections
// PostgreSQL Connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.SUPABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.query("SELECT 1")
  .then(() => console.log("Connected to Supabase"))
  .catch((err) => console.error("Supabase connection error:", err.message));

// MongoDB Connection
// Make sure to add your MONGO_URI to the .env file
mongoose.connect(process.env.MONGO_URI);
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB");
});

// Mongoose Schema and Model for MenuItems
const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: mongoose.Schema.Types.Decimal128,
  category: String,
  recipe: Array,
});
const MongoMenuItem = mongoose.model("MenuItem", menuItemSchema, "menu_items");

// 5. API endpoints
// Endpoint for PostgreSQL menu items
app.get("/api/menu-items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menuitems");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint for MongoDB menu items
app.get("/api/mongodb-menu-items", async (req, res) => {
  try {
    const menuItems = await MongoMenuItem.find({});
    const transformedMenuItems = menuItems.map((item) => ({
      ...item.toObject(),
      price: item.price ? item.price.toString() : "0.00",
    }));
    res.json(transformedMenuItems);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 6. Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
