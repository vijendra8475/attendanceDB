const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.CONNECTION_URL);

async function main() {
  try {
    // Connect to server
    await client.connect();
    console.log("✅ Connected to MongoDB Server!");

    // Choose database
    const db = client.db("attendanceDB");

    // Test insert example
    const result = await db.collection("test").insertOne({ message: "Hello MongoDB" });
    console.log("Inserted:", result.insertedId);

  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
}

module.exports = main