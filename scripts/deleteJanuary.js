import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Manual from "../models/Manual.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file!");
  process.exit(1);
}

const deleteJanuaryManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Delete all January manuals
    const result = await Manual.deleteMany({ month: "January" });
    
    console.log(`\n🗑️  Deleted ${result.deletedCount} January manuals`);
    
    if (result.deletedCount > 0) {
      console.log("✅ January manuals removed successfully!");
    } else {
      console.log("⚠️  No January manuals found to delete");
    }

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

deleteJanuaryManuals();