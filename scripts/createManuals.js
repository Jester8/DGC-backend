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

// Function to normalize scripture references
const normalizeScripture = (scripture) => {
  if (!scripture) return scripture;
  
  const abbrevMap = {
    '1 Tim': '1 Timothy',
    '2 Tim': '2 Timothy',
    '1 Cor': '1 Corinthians',
    '2 Cor': '2 Corinthians',
    '1 Thess': '1 Thessalonians',
    '2 Thess': '2 Thessalonians',
    '1 Pet': '1 Peter',
    '2 Pet': '2 Peter',
    '1 Jn': '1 John',
    '2 Jn': '2 John',
    '3 Jn': '3 John',
    '1John': '1 John',
    '2John': '2 John',
    '3John': '3 John',
    'Ps': 'Psalm',
  };
  
  let normalized = scripture;
  
  for (const [abbrev, fullName] of Object.entries(abbrevMap)) {
    const regex = new RegExp(`\\b${abbrev}\\b`, 'gi');
    normalized = normalized.replace(regex, fullName);
  }
  
  normalized = normalized.replace(/\s+\(?\s*(?:KJV|NKJV|NIV|NLT|MSG|AMP|ESV|NASB|CSB|HCSB|NRSV|TLB|TPT|ISV|NCV|NLV|ERV|MKJV|YLT|WE|ASV|DARBY|DRB|GNV|JUB|KJ2000|AKJV|VW|WBT|WEB|DBT|WBS)\)?.*$/gi, '');
  
  return normalized;
};

const normalizeMainPoints = (mainPoints) => {
  return mainPoints.map(point => ({
    ...point,
    references: point.references ? point.references.map(normalizeScripture) : []
  }));
};

// ---------------------------
// ALL MANUALS DATA HERE
// ---------------------------
const manualsData = [
  {
    id: "jan_2026_01",
    title: "Jesus, The Great Shepherd",
  
    week: 1,
    date: "4th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/4th.png",
    memoryVerse: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly. (John 10:10 KJV)",
    text: "John 10:1-30",
    introduction: "Have you ever wondered why Jesus chose the relationship between a shepherd and a flock to explain His ministry in John 10? Why not a goldsmith? Why not a farmer or even a fisherman? This choice invites us to pay close attention to who a shepherd is and how a shepherd operates. If Jesus calls Himself the Good Shepherd, then an important question naturally follows: what makes Him a good shepherd? When we examine Scripture carefully, we see that the symbolism of sheep and shepherd is not unique to John 10. It appears repeatedly across the Bible, again calling our attention to the importance of this topic.",
    mainPoints: [
      {
        title: "Who is a Shepherd?",
        description: "A shepherd is a person who tends, feeds, and guards flocks of sheep. The function of a shepherd is a 24/7 commitment to the safety and health of his flocks. His duties cut across leading, protecting, restoring, and providing for his flock.",
        references: ["Genesis 48:15", "Psalm 78:52", "Psalm 80:1", "Isaiah 40:11", "Jeremiah 23:1-4", "Ezekiel 34:11-16"]
      },
      {
        title: "The Shepherd in the Old Testament",
        description: "The symbolism of sheep and shepherd appears throughout the Old Testament, showing God's consistent care for His people.",
        references: ["Genesis 48:15", "Psalm 78:52", "Psalm 80:1", "Isaiah 40:11", "Jeremiah 23:1-4", "Ezekiel 34:11-16"]
      },
      {
        title: "The Shepherd in the New Testament",
        description: "Jesus is revealed as the fulfillment of the shepherd prophecies, demonstrating His care and compassion for His flock.",
        references: ["Matthew 9:36", "Matthew 18:12-14", "Luke 15:3-7", "John 21:15-17", "Hebrews 13:20", "1 Peter 2:25", "1 Peter 5:2-4", "Revelation 7:17"]
      },
      {
        title: "What Makes Jesus the Great Shepherd?",
        description: "Jesus demonstrates His greatness as a shepherd through His ability to lay down His life, His compassion, His power to give life, and His ability to keep and restore His sheep.",
        references: ["John 10:11", "John 10:10", "John 10:28-29", "Matthew 9:36", "Hebrews 13:20", "Luke 15:3-7"]
      }
    ],
    classDiscussion: "From our Bible text (John 10:1-30), what other things can you say make Jesus the Great Shepherd?",
    conclusion: "Since we have this Great Shepherd, we can confidently embrace Psalm 23 as we walk through 2026. The word 'shepherd' here comes from the Hebrew râ‛âh, meaning to keep, to feed, to tend, and to associate with. This reveals that Christ's shepherding is not distant or occasional; it is personal, consistent, and ever-present. Resting in the assurance that 'The Lord is my shepherd,' let us pledge our allegiance to Him alone, following His voice and refusing the voice of a stranger.",
    declaration: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me. Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over. Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 1
  },
  {
    id: "jan_2026_02",
    title: "Jesus Lays Down His Life for the Sheep",
    subTopic: "His Ability to Lay Down His Life",
    theme: "JESUS, The Great Shepherd",
    week: 2,
    date: "11th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/11th.png",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep. (John 10:11 KJV)",
    text: "John 10:1-30",
    introduction: "What makes Jesus the Great Shepherd? His ability to lay down His life for the sheep stands as the ultimate demonstration of His love and commitment to His flock. This sacrificial love is at the heart of understanding Jesus' shepherding ministry. Unlike a hireling who abandons the sheep in danger, Jesus willingly gave His life for our salvation.",
    mainPoints: [
      {
        title: "His Ability to Lay Down His Life for the Sheep",
        description: "Jesus demonstrated ultimate sacrifice by laying down His life for the redemption of all who believe in Him.",
        references: ["John 10:11", "John 10:15", "Hebrews 13:20"]
      },
      {
        title: "His Compassion for the Sheep",
        description: "Jesus was moved with compassion for the people, seeing them as sheep without a shepherd, and He responded with care and healing.",
        references: ["Matthew 9:36", "Mark 6:34"]
      },
      {
        title: "His Ability to Give Life",
        description: "Jesus came that we might have life and have it more abundantly. He is the source of eternal and abundant life.",
        references: ["John 10:10", "John 10:28", "John 11:25-26"]
      },
      {
        title: "His Ability to Keep and Restore",
        description: "Jesus keeps His sheep and restores those who have gone astray, just as a shepherd searches for lost sheep.",
        references: ["John 10:29", "Luke 15:3-7", "John 21:15-17"]
      }
    ],
    classDiscussion: "How does understanding Jesus as a shepherd who laid down His life change your perspective on His love and care for you?",
    conclusion: "The sacrifice of Jesus has opened the way for us to experience His unconditional love, protection, salvation, and eternal life. As His sheep, we must recognize the cost of our redemption and respond with gratitude, trust, and devoted following.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 2
  },
  {
    id: "jan_2026_03",
    title: "The Shepherd Knows and Leads His Sheep",
    subTopic: "His Personal Relationship with the Sheep",
    theme: "JESUS, The Great Shepherd",
    week: 3,
    date: "18th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/18th.png",
    memoryVerse: "I am the good shepherd: and know my sheep, and am known of mine. (John 10:14 KJV)",
    text: "John 10:1-30",
    introduction: "One of the most comforting aspects of Jesus as our Great Shepherd is His intimate knowledge of us. He knows His sheep by name, understands their needs, and leads them with personal care. This knowledge is not detached or superficial but deeply personal and caring.",
    mainPoints: [
      {
        title: "He Knows His Sheep Personally",
        description: "Jesus has a personal relationship with each of His sheep. He knows each one by name and understands their individual needs, struggles, and hopes.",
        references: ["John 10:14", "Psalm 139:1-3", "2 Timothy 2:19"]
      },
      {
        title: "He Leads His Sheep with Guidance",
        description: "The Great Shepherd goes before His flock, showing them the right path and guiding them into all truth.",
        references: ["Psalm 23:1-3", "Isaiah 48:17", "John 16:13"]
      },
      {
        title: "The Sheep Know and Recognize His Voice",
        description: "Jesus' sheep hear His voice and follow Him, recognizing His guidance among all other voices and influences.",
        references: ["John 10:3-5", "John 10:27", "Isaiah 30:21"]
      },
      {
        title: "He Provides Everything His Sheep Need",
        description: "The Great Shepherd ensures that His sheep lack nothing, satisfying both their physical and spiritual needs.",
        references: ["Psalm 23:1-2", "Philippians 4:19", "Matthew 6:33"]
      }
    ],
    classDiscussion: "In what practical ways can you distinguish the voice of the Great Shepherd from the noise of the world? How can you develop a stronger sensitivity to His guidance?",
    conclusion: "Jesus, the Great Shepherd, never leaves His flock unattended. He knows us intimately, leads us faithfully, provides generously, and protects us completely. As His sheep, we must remain close to Him, listening to His voice, and following His direction daily.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 3
  },
  {
    id: "jan_2026_04",
    title: "The Shepherd Protects and Provides for His Sheep",
    subTopic: "His Protection and Provision",
    theme: "JESUS, The Great Shepherd",
    week: 4,
    date: "25th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/25th.png",
    memoryVerse: "My sheep hear my voice, and I know them, and they follow me: And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand. (John 10:27-28 KJV)",
    text: "John 10:1-30",
    introduction: "A true shepherd's primary responsibility is to protect his flock from danger and provide for their needs. Jesus, as our Great Shepherd, provides complete security and abundant provision for His sheep. In a world full of threats and uncertainties, we can find perfect peace and security in His hands.",
    mainPoints: [
      {
        title: "He Protects His Sheep from Danger",
        description: "Jesus stands as a shield for His sheep, watching over them and delivering them from the enemy's snare and all harm.",
        references: ["John 10:27-28", "Psalm 91:1-4", "Zechariah 2:5", "Psalm 23:4"]
      },
      {
        title: "No One Can Snatch His Sheep from His Hand",
        description: "The security of the believer is guaranteed. Jesus' grip on His sheep is secure, and nothing can separate them from His care.",
        references: ["John 10:28-29", "Romans 8:38-39", "John 6:39"]
      },
      {
        title: "He Provides for All Physical and Spiritual Needs",
        description: "The Great Shepherd ensures provision in every area of life, from daily bread to spiritual nourishment and growth.",
        references: ["Psalm 23:1-6", "Matthew 6:25-34", "Philippians 4:19"]
      },
      {
        title: "He Restores and Heals the Wounded",
        description: "Jesus brings healing, restoration, and comfort to those who are broken, weary, or lost.",
        references: ["Isaiah 40:11", "Luke 15:3-7", "Psalm 23:3"]
      }
    ],
    classDiscussion: "What does it mean that nothing can pluck you out of Jesus' hand? How should this assurance change the way you face your daily challenges and fears?",
    conclusion: "Because Jesus is our Great Shepherd who protects and provides, we can live in confidence and peace. As we continue to trust in His shepherding, we experience the fullness of His protection, provision, and care. Let us commit to following Him faithfully, knowing that we are secure in His hands and lack nothing under His care.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 4
  }
];

// ---------------------------
// CREATE MANUALS FUNCTION
// ---------------------------
const createManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    const normalizedData = manualsData.map(manual => {
      const normalized = {
        ...manual,
        memoryVerse: normalizeScripture(manual.memoryVerse),
        text: normalizeScripture(manual.text),
        mainPoints: normalizeMainPoints(manual.mainPoints)
      };
      
      console.log(`\n📝 Processing: ${manual.title}`);
      console.log(`   Memory Verse: ${manual.memoryVerse.substring(0, 50)}...`);
      console.log(`   ✓ Normalized: ${normalized.memoryVerse.substring(0, 50)}...`);
      
      return normalized;
    });

    const deleted = await Manual.deleteMany({});
    console.log(`\n🗑️  Deleted ${deleted.deletedCount} existing manuals`);

    const inserted = await Manual.insertMany(normalizedData);
    console.log(`\n✅ Successfully created ${inserted.length} manuals\n`);

    inserted.forEach((manual) => {
      console.log(`📖 ${manual.month} - Week ${manual.week}: ${manual.title}`);
    });

    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error creating manuals:", error);
    process.exit(1);
  }
};

createManuals();