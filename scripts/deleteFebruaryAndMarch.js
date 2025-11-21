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

const deleteFebruaryAndMarchManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Delete all February manuals
    const februaryResult = await Manual.deleteMany({ month: "February" });
    console.log(`\n🗑️  Deleted ${februaryResult.deletedCount} February manuals`);
    
    if (februaryResult.deletedCount > 0) {
      console.log("✅ February manuals removed successfully!");
    } else {
      console.log("⚠️  No February manuals found to delete");
    }

    // Delete all March manuals
    const marchResult = await Manual.deleteMany({ month: "March" });
    console.log(`\n🗑️  Deleted ${marchResult.deletedCount} March manuals`);
    
    if (marchResult.deletedCount > 0) {
      console.log("✅ March manuals removed successfully!");
    } else {
      console.log("⚠️  No March manuals found to delete");
    }

    // Summary
    const totalDeleted = februaryResult.deletedCount + marchResult.deletedCount;
    console.log(`\n📊 Total deleted: ${totalDeleted} manuals`);

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

deleteFebruaryAndMarchManuals();