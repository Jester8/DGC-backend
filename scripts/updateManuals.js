import dotenv from "dotenv";
import mongoose from "mongoose";
import Manual from "../models/Manual.js";

dotenv.config();

const updateAprilManuals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Update April manuals with image URLs
    const imageUpdates = [
      { order: 13, imageUrl: "https://dgc-backend.onrender.com/public/images/april/april5.png" },   // April 5th
      { order: 14, imageUrl: "https://dgc-backend.onrender.com/public/images/april/april12th.png" },  // April 12th
      { order: 15, imageUrl: "https://dgc-backend.onrender.com/public/images/april/april19th.png" },  // April 19th
     
    ];

    for (const update of imageUpdates) {
      const result = await Manual.findOneAndUpdate(
        { month: "April", order: update.order },
        { imageUrl: update.imageUrl },
        { new: true }
      );
      
      if (result) {
        console.log(`✅ Updated April Week ${update.order - 12} (order ${update.order}): ${result.title}`);
      } else {
        console.log(`⚠️ No manual found for April order ${update.order}`);
      }
    }

    console.log("✅ All April manuals updated with images!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

updateAprilManuals();