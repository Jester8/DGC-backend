import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Manual from "../models/Manual.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file!");
  process.exit(1);
}

// ---------------------------
// ALL MANUALS DATA HERE
// ---------------------------
const manualsData = [
  // JANUARY 2026
  {
    id: "jan_2026_01",
    title: "Jesus as the Door of the Sheep",
    subTopic: "Jesus, The Great Shepherd",
    theme: "JESUS, The Great Shepherd",
    week: 1,
    date: "4th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/janban.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/jan4.png",
    memoryVerse: "I am the door: by me if any man enters in, he shall be saved ...",
    text: "John 10:1-16, Psalm 23:1-6",
    introduction: "Unlike the earthly work of a shepherd...",
    mainPoints: [
      {
        title: "Jesus is the only way to the father",
        description: "Jesus is only way to God...",
        references: ["John 14:6", "Ephesians 2:18", "Hebrews 7:25"]
      }
    ],
    classDiscussion: "If Jesus is the door...",
    conclusion: "Our faith is anchored on a Shepherd...",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    month: "January",
    order: 1
  },
  {
    id: "jan_2026_02",
    title: "The Cost of our Salvation",
    subTopic: "Jesus, The Great Shepherd",
    theme: "JESUS, The Great Shepherd",
    week: 2,
    date: "11th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/janban.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/jan4.png",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep.",
    text: "John 10:11-18",
    introduction: "At the very core of our salvation is the ultimate price Jesus paid...",
    mainPoints: [
      {
        title: "He Fulfilled Prophecy",
        description: "By sacrificing His life and dying on the Cross.",
        references: ["Ezekiel 34:23-24", "Isaiah 40:11"]
      }
    ],
    classDiscussion: "The sheep know the Shepherd's voice...",
    conclusion: "The sacrifice of Jesus has widely opened us...",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    month: "January",
    order: 2
  },
  {
    id: "jan_2026_03",
    title: "The Shepherd Who Cares",
    subTopic: "Jesus, The Great Shepherd",
    theme: "JESUS, The Great Shepherd",
    week: 3,
    date: "18th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/janban.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/jan4.png",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep.",
    text: "John 10:11–18",
    introduction: "In Scripture, Jesus is revealed as the Great Shepherd...",
    mainPoints: [
      {
        title: "He Knows His Sheep",
        description: "Jesus has a personal relationship with His sheep...",
        references: ["John 10:14", "Psalm 139:1–3"]
      }
    ],
    classDiscussion: "What makes Jesus different from other shepherds?",
    conclusion: "Jesus, the Great Shepherd, never leaves His flock unattended...",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    month: "January",
    order: 3
  },

  
 
];

// ---------------------------
// CREATE MANUALS FUNCTION
// ---------------------------
const createManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Clear all manuals first
    const deleted = await Manual.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing manuals`);

    // Insert all manuals
    const inserted = await Manual.insertMany(manualsData);
    console.log(`✅ Successfully created ${inserted.length} manuals`);

    inserted.forEach((manual) => {
      console.log(`📖 ${manual.month} - Week ${manual.week}: ${manual.title}`);
    });

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error creating manuals:", error);
    process.exit(1);
  }
};

createManuals();
