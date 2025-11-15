import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Manual from "../models/Manual.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Debug: Check if MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file!");
  console.error("📝 Make sure your .env file exists in the DGC-backend folder");
  console.error("Looking in:", path.resolve(__dirname, "../.env"));
  process.exit(1);
}

console.log("✅ .env loaded successfully");

const manualsData = [
  // NOVEMBER 2026
  {
    id: "nov_2026_01",
    title: "Jesus' Personal Prayer Life",
    theme: "The Prayer lifestyle of Jesus (The High Priest)",
    week: 1,
    date: "November 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "With the crowd dispersed, he climbed the mountain so he could be by himself and pray. He stayed there alone, late into the night. (Matthew 14:23 MSB)",
    text: "Mark 1:35-37",
    introduction: "Since prayer is a vital component of the Christian life, believers must be taught how to pray effectively. Our ultimate teacher is Jesus, who both instructed us to pray and demonstrated prayer through His own life. This study will explore the prayer life of Jesus, examining how he prayed and the things we can learn from his prayer life to provide a model we can apply to our own prayer journeys.",
    mainPoints: [
      {
        title: "Solitude",
        description: "Jesus modelled prayer as a private practice that nurtures a personal relationship with the Father. He frequently prayed alone and in quiet places.",
        references: ["Mark 1:35", "Matthew 6:6", "Matthew 14:23"]
      },
      {
        title: "Fervency",
        description: "Jesus prayed with profound intensity, wholeheartedly pouring His mind and soul into communication with God.",
        references: ["Luke 22:44-46", "Hebrews 5:7"]
      },
      {
        title: "Confidence",
        description: "Jesus prayed with absolute certainty in the power of His prayers, never doubting that God heard and would answer Him.",
        references: ["John 11:41-42", "Mark 11:23", "Hebrews 11:6", "1 John 5:14-15"]
      },
      {
        title: "Intercession",
        description: "A central feature of Jesus' prayer life was intercession, demonstrating that His prayers extended beyond His own needs to the needs of others.",
        references: ["John 17:9-15", "Luke 22:31-32"]
      },
      {
        title: "Extended Time",
        description: "Jesus consistently dedicated long periods to prayer, underscoring the importance of lingering in God's presence.",
        references: ["Luke 4:1-2", "Luke 6:12-13", "Matthew 14:23-25"]
      }
    ],
    classDiscussion: "From all the points we have identified so far from Jesus' prayer life do you think there is any point that is more important than the rest? Why?",
    conclusion: "Jesus's powerful prayer life was no accident; it was the product of the very habits we have examined. If we desire similar outcomes, we must commit to following His example.",
    month: "November",
    order: 1
  },
  {
    id: "nov_2026_02",
    title: "Prayer as a Platform for Intimacy",
    theme: "The Prayer lifestyle of Jesus (The High Priest)",
    week: 2,
    date: "November 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not. (Jeremiah 33:3 KJV)",
    text: "Jeremiah 33:3, John 17:1-5",
    introduction: "Prayer is far more than a spiritual routine; it is the dedicated vehicle of intimacy that transforms belief into living experience. This practice serves as the discipline for cultivating a deep and abiding consciousness of God's presence. Such awareness is not automatic; it must be intentionally nurtured through consistent and open communion.",
    mainPoints: [
      {
        title: "Hunger",
        description: "A man that is hungry for God can only express it through desire.",
        references: ["Psalm 4:1-2", "Proverbs 18:1"]
      },
      {
        title: "Intentionality and sincerity",
        description: "We must approach prayer with genuine intention and a sincere heart.",
        references: ["Matthew 6:6"]
      },
      {
        title: "Through fellowship",
        description: "When we pray, we fellowship with the divine.",
        references: ["1 Corinthians 1:9", "1 John 1:3"]
      }
    ],
    classDiscussion: "In your opinion, do you think a believer can just be intimate through studying the word alone, and why?",
    conclusion: "There is no intimacy without prayer. As believers, we are called to the life of prayer and fellowship, which translates to intimacy.",
    month: "November",
    order: 2
  },
  {
    id: "nov_2026_03",
    title: "Prayer: Manifesting the Supernatural",
    theme: "The Prayer lifestyle of Jesus (The High Priest)",
    week: 3,
    date: "November 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "Then Jesus returned in the power of the Spirit to Galilee, and news of Him went out through all the surrounding region. (Luke 4:14 NKJV)",
    text: "Luke 4:1 & 14, Romans 8:19",
    introduction: "The Primary purpose of your destiny is to point humanity to Jesus, and you can't be successful in this righteous venture without the manifestation of the supernatural. Looking through scriptures exemplified by the life of Jesus, we can see that a believer cannot fully manifest the life of God without the culture of prayer. Jesus was a man whose life and ministry were full of the supernatural manifestation wherever he went.",
    mainPoints: [
      {
        title: "Prayer activates the supernatural",
        description: "Prayer is the mechanism through which God's supernatural power is released.",
        references: ["Luke 4:14", "Acts 4:31-33"]
      },
      {
        title: "Prayer builds consciousness of the Supernatural",
        description: "Prayer heightens our awareness of God's miraculous nature.",
        references: ["Matthew 14:23-25"]
      },
      {
        title: "Prayer strengthens Faith and conviction",
        description: "Through prayer, our faith is fortified and spiritual conviction is deepened.",
        references: ["Matthew 17:21", "Luke 22:31-32", "Acts 3:1-8"]
      },
      {
        title: "Prayer preserves from temptation",
        description: "Prayer is our defense against the enemy's schemes.",
        references: ["Matthew 26:41"]
      }
    ],
    classDiscussion: "Is it possible to demonstrate the supernatural without Prayers? Why?",
    conclusion: "If the Heavens do not see your Prayers, the earth will not see your manifestation. The manifestation of the sons of God is in strong affinity with volumes of prayer. Prayer is the place where you lay claim to what is available to you.",
    month: "November",
    order: 3
  },

  // DECEMBER 2026
  {
    id: "dec_2026_01",
    title: "Understanding Jesus as the Wisdom of God",
    theme: "Jesus, the Wisdom of God",
    week: 1,
    date: "December 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "In whom are hid all the treasures of wisdom and knowledge (Colossians 2:3 KJV)",
    text: "Proverbs 8:22-31, John 1:1-5, 1 Corinthians 1:24",
    introduction: "From the beginning of time, man has been in search for wisdom. Proverbs shows us wisdom as someone present at creation. In the New Testament, we see that this wisdom is Jesus Christ, the eternal Word through whom all things were made. He's not just wise; He is wisdom Himself. His life teaches us that true wisdom is found in humility, love, and obedience to God.",
    mainPoints: [
      {
        title: "As the Eternal Nature of God",
        description: "God's wisdom is not an idea, it's a Person, and that Person is Jesus.",
        references: ["Proverbs 8:22-31", "John 1:1-3"]
      },
      {
        title: "In His thoughts",
        description: "When Jesus became flesh, divine wisdom took on human form, revealing God's love, truth, and higher way of thinking.",
        references: ["Philippians 2:5", "Mark 1:36-38", "John 12:22-24"]
      },
      {
        title: "In His Words and Actions",
        description: "Every word Jesus spoke and every act He performed showed the heart and wisdom of God.",
        references: ["Matthew 7:24-29", "John 7:46", "Matthew 22:17-21"]
      },
      {
        title: "As God's power through the Cross",
        description: "Divine Wisdom often looks like foolishness to the world, but it is God's perfect plan in action.",
        references: ["1 Corinthians 1:24-30"]
      }
    ],
    classDiscussion: "In what other ways does Jesus' life show God's wisdom? Why do you think God's wisdom often looks foolish to the world? How can we walk daily in the wisdom that Christ gives?",
    conclusion: "Jesus is the Wisdom of God revealed in human form. He was with God from the beginning, became flesh to reveal divine truth, and through the cross, demonstrated the highest form of wisdom, redemptive love. True wisdom begins when we know and follow Him.",
    month: "December",
    order: 1
  },
  {
    id: "dec_2026_02",
    title: "The Wisdom in His Teachings and Parables",
    theme: "Jesus the Wisdom of God",
    week: 2,
    date: "December 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "And they were astonished at His doctrine: for He taught them as one having authority, and not as the scribes. (Mark 1:22 KJV)",
    text: "Mark 1:22",
    introduction: "Jesus Christ is the embodiment of divine wisdom. His words, actions, and decisions were not based on human understanding but on divine insight. One of the most profound ways Jesus expressed this wisdom was through His teachings and parables - simple stories carrying deep spiritual truths.",
    mainPoints: [
      {
        title: "The Sower",
        description: "Reveals God's truth and purpose for different types of hearts.",
        references: ["Matthew 13:3-9", "Mark 4:3-9", "Luke 8:4-8"]
      },
      {
        title: "The Mustard Seed",
        description: "Shows the miraculous growth of God's kingdom from small beginnings.",
        references: ["Matthew 13:31-32", "Mark 4:30-32", "Luke 13:18-19"]
      },
      {
        title: "The Ten Virgins",
        description: "Teaches spiritual preparedness and wisdom in awaiting Christ's return.",
        references: ["Matthew 25:1-13"]
      },
      {
        title: "The Growing Seed",
        description: "Demonstrates God's work in growth beyond our understanding.",
        references: ["Mark 4:26-29"]
      },
      {
        title: "The Talents",
        description: "Illustrates stewardship and accountability for our gifts.",
        references: ["Matthew 25:14-30"]
      }
    ],
    classDiscussion: "",
    conclusion: "The wisdom in Jesus' teachings and parables reveals God's truth and purpose for mankind. His words enlighten, correct, and lead us to righteous living. Through His wisdom, we understand God's love and the way to eternal life.",
    month: "December",
    order: 2
  },
  {
    id: "dec_2026_03",
    title: "Walking in the Wisdom of Christ",
    theme: "Jesus, The Wisdom of God",
    week: 3,
    date: "December 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him. (James 1:5 KJV)",
    text: "James 3:13-17, Matthew 7:24",
    introduction: "Wisdom is not merely knowledge or intelligence; it is the ability to apply God's truth rightly in everyday life. As believers, walking in the wisdom of Christ means letting His character, teachings, and Spirit guide our choices, relationships, and responses to life's challenges.",
    mainPoints: [
      {
        title: "Stay with the Word of God",
        description: "The Word reveals Christ's mind. When we meditate on and obey it, we align our thoughts and decisions with divine wisdom.",
        references: ["Colossians 3:16", "Matthew 7:24-25"]
      },
      {
        title: "Depend on the Holy Spirit",
        description: "The Spirit of wisdom guides, teaches, and reminds us of Christ's truth. To walk wisely, we must yield to His leading.",
        references: ["John 14:26", "1 Corinthians 2:10-12"]
      },
      {
        title: "Cultivate a lifestyle of Humility and Meekness",
        description: "Christ's wisdom is displayed through a humble and teachable heart. Pride resists divine instruction.",
        references: ["James 3:13", "Philippians 2:5-8"]
      },
      {
        title: "Walk in Love and Peace",
        description: "The wisdom of Christ is peace-loving and considerate.",
        references: ["James 3:17", "Ephesians 4:2-3"]
      },
      {
        title: "Seek God in Prayer Before Acting",
        description: "Christ often withdrew to pray before making decisions. Wisdom begins when we acknowledge our need for divine direction.",
        references: ["Luke 6:12-13", "James 1:5"]
      }
    ],
    classDiscussion: "What does it mean to 'walk' in wisdom rather than just 'have' wisdom? How can dependence on the Holy Spirit help us make wiser decisions? Share a situation where applying God's Word gave you clarity or peace.",
    conclusion: "Walking in the wisdom of Christ is a daily choice to follow His example, listen to His Spirit, and live by His Word. It's not theoretical but practical, shaping how we think, speak, and act. As we walk closely with Him, His wisdom flows through us, enabling us to live victoriously.",
    month: "December",
    order: 3
  }
];

const createManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Check if manuals already exist
    const existingCount = await Manual.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing manuals`);
      console.log("\nOptions:");
      console.log("1. Keep existing and add new ones (may create duplicates)");
      console.log("2. Clear all and re-seed (uncomment clearExisting = true below)\n");
      
      // Uncomment the line below to clear and re-seed
      // const clearExisting = true;
      // if (clearExisting) {
      //   await Manual.deleteMany({});
      //   console.log("🗑️  Cleared existing manuals\n");
      // }
    } else {
      console.log("📝 No existing manuals found. Creating new ones...\n");
    }

    // Insert manuals
    const result = await Manual.insertMany(manualsData);
    console.log(`✅ Successfully created ${result.length} manuals\n`);

    // Display created manuals
    result.forEach((manual) => {
      console.log(`  📖 ${manual.month} - Week ${manual.week}: ${manual.title}`);
    });

    console.log("\n✅ All manuals created successfully!");
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error creating manuals:", error.message);
    process.exit(1);
  }
};

createManuals();