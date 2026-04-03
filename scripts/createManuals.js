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

const normalizeScripture = (scripture) => {
  if (!scripture) return scripture;

  const abbrevMap = {
    "1 Tim": "1 Timothy",
    "2 Tim": "2 Timothy",
    "1 Cor": "1 Corinthians",
    "2 Cor": "2 Corinthians",
    "1 Thess": "1 Thessalonians",
    "2 Thess": "2 Thessalonians",
    "1 Pet": "1 Peter",
    "2 Pet": "2 Peter",
    "1 Jn": "1 John",
    "2 Jn": "2 John",
    "3 Jn": "3 John",
    "1John": "1 John",
    "2John": "2 John",
    "3John": "3 John",
    "1Peter": "1 Peter",
    "2Peter": "2 Peter",
    Ps: "Psalm",
    Psalms: "Psalm",
  };

  let normalized = scripture;

  for (const [abbrev, fullName] of Object.entries(abbrevMap)) {
    const regex = new RegExp(`\\b${abbrev}\\b`, "gi");
    normalized = normalized.replace(regex, fullName);
  }

  normalized = normalized.replace(
    /\s+\(?\s*(?:KJV|NKJV|NIV|NLT|MSG|AMP|ESV|NASB|CSB|HCSB|NRSV|TLB|TPT|ISV|NCV|NLV|ERV|MKJV|YLT|WE|ASV|DARBY|DRB|GNV|JUB|KJ2000|AKJV|VW|WBT|WEB|DBT|WBS)\)?.*$/gi,
    ""
  );

  return normalized;
};

const normalizeMainPoints = (mainPoints) => {
  if (!mainPoints || !Array.isArray(mainPoints)) return [];
  return mainPoints.map((point) => ({
    ...point,
    references: point.references ? point.references.map(normalizeScripture) : [],
  }));
};

const formatScripturesInText = (text) => {
  if (!text) return text;
  // Keep your existing formatScripturesInText function here
  return text;
};

// ================= APRIL 2026 ONLY =================
const aprilManuals = [
  {
    id: "apr_2026_01",
    title: "JESUS; our perfect example",
    subTopic: "JESUS; our perfect example",
    theme: "The mind of Jesus (Service)",
    week: 1,
    date: "5th April, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/april/april.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/april/april5th.png",
    memoryVerse: "For I have given you an example, that ye should do as I have done to you (John 13:15 NKJV).",
    text: "Philippians 2:5-8, John 13:15, Matt 11:29",
    introduction: `The natural man is wired to be selfish in desires and actions, but for a new man in Christ, there is a life we are expected to live; a mind we are expected to have, one renewed in knowledge after the image of the man that created him. While on earth, He lived an exemplary life of service. 

In this class, we will be examining the life of Jesus as pertaining to service.`,
    mainPoints: [
      {
        title: "Biblical Examples of Jesus's Demonstration of Service",
        description: "",
        references: []
      },
      {
        title: "His Incarnation",
        description: "His coming in human form to save man means he needed to conceal his glory which he shared with the Father from the beginning; the greek term 'kenoo' is used in Philp 2:7 which means 'to empty'",
        references: ["Daniel 7:13-14", "Mark 14:62", "Philippians 2:5-8"]
      },
      {
        title: "Service to his earthly parents",
        description: "Even though he was God himself, yet, he yielded himself in Service to his earthly parents (till he was probably 30yrs) when he started his ministry.",
        references: ["Luke 2:51", "Matthew 13:55"]
      },
      {
        title: "Washed the feet of the disciples",
        description: "Jesus demonstrated that service is leadership; as they have seen him done, so they must do",
        references: ["John 13:13-15", "Galatians 6:2", "Romans 15:1"]
      },
      {
        title: "His Crucifixion",
        description: "Despite having no sin and been able to save himself from dying, he yielded his life to be beaten and crucified on the cross, the height of Service shown to mankind.",
        references: ["Philippians 2:8", "Romans 5:6-8", "John 10:15"]
      }
    ],
    classDiscussion: "What other biblical examples showed how Jesus demonstrated service?",
    conclusion: `Jesus, despite being fully God, humbled himself in Service to His heavenly father, earthly parents and the whole humanity. We are expected as believers to follow His pattern for acceptable kingdom service.`,
    recommendedBooks: ["The man God uses by Oswald J. Smith"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "April",
    order: 13,
  },
  {
    id: "apr_2026_02",
    title: "The Posture of a True Servant",
    subTopic: "The Posture of a True Servant",
    theme: "The Mind of Jesus; Service",
    week: 2,
    date: "12th April, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/april/april.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/april/april12th.png",
    memoryVerse: "For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many (Mark 10:45 KJV).",
    text: "Philippians 2:5-8; John 13:3–15; Matthew 20:26–28",
    introduction: `The mind of Jesus is the foundation of true service. His posture was that of humility, obedience, and selflessness. In a world driven by ambition and recognition, Jesus modeled servant-leadership, He served, not for applause, but out of love and submission to the Father's will. To develop the posture of a true servant, believers must embrace His mindset, letting go of pride, entitlement, and the desire for position.`,
    mainPoints: [
      {
        title: "What Defines the Posture of a True Servant?",
        description: "",
        references: []
      },
      {
        title: "Humility Before God and Men",
        description: "A true servant does not serve from a pedestal but from a posture of surrender and meekness.",
        references: ["Philippians 2:6-7", "James 4:6", "John 13:3-5"]
      },
      {
        title: "Obedience to the Father's Will",
        description: "Service without obedience is self-driven. A servant's first duty is submission to God's will and His divine instruction(s).",
        references: ["John 6:38", "Luke 22:42", "1 Samuel 15:22"]
      },
      {
        title: "Love as the Motivation for Service",
        description: "Jesus' acts of service flowed from love, not obligation. Genuine service seeks the good of others above self",
        references: ["John 13:34-35", "1 Corinthians 13:1-3", "Galatians 5:13"]
      },
      {
        title: "Sacrifice and Self-Denial",
        description: "True servants embrace the cost of service; time, comfort, and personal ambition are often laid aside for God's purpose.",
        references: ["Mark 10:43-45", "Luke 9:23-24", "Romans 12:1"]
      },
      {
        title: "Faithfulness and Consistency",
        description: "The posture of a true servant is steady and dependable, even when unseen or uncelebrated.",
        references: ["Matthew 25:21", "1 Corinthians 4:2", "Colossians 3:23-24"]
      }
    ],
    classDiscussion: "• In practical terms, how can we serve others without expecting recognition or reward? \n• What daily habits can help us keep a humble heart and the mind of Christ in our service?",
    conclusion: `To take the posture of a true servant is to take the posture of Jesus. It is a life of humility, obedience, love, and faithfulness. Service is not what we do for God to notice us; it is what we do because He has changed us. When we serve with the mind of Christ, every act becomes worship, and every task becomes ministry.`,
    recommendedBooks: ["The man God uses by Oswald J. Smith"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "April",
    order: 14,
  },
  {
    id: "apr_2026_03",
    title: "How to cultivate a true heart of service (Kingdom Service)",
    subTopic: "How to cultivate a true heart of service (Kingdom Service)",
    theme: "The Mind of Christ",
    week: 3,
    date: "19th April, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/april/april.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/april/april19th.png",
    memoryVerse: "Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves (Philippians 2:3 KJV).",
    text: "Philippians 2:5-8, Matt 20:27-28",
    introduction: `As believers, we're expected to model Christ in everything we do. This involves being humble the way He was humble, embracing the heart of kingdom service the way He did, and loving others the way He loved. True service is not a duty we perform but a nature we reveal; the very expression of Christ alive in us.`,
    mainPoints: [
      {
        title: "How to cultivate a true heart of service?",
        description: "",
        references: []
      },
      {
        title: "Desire to do the things that please God, not the things that please men",
        description: "",
        references: ["1 Samuel 13:8-12"]
      },
      {
        title: "Anyone who desires a true heart of service must embrace the culture of sacrifice: your body being the chief sacrifice",
        description: "",
        references: ["Romans 12:1-2", "John 15:12-13"]
      },
      {
        title: "Humility must be the foundation; Jesus could not have served the purposes of God better if He were not humble",
        description: "",
        references: ["Philippians 2:5-8", "Luke 22:41-42", "1 Peter 5:5-6"]
      },
      {
        title: "Sustaining the mindset that every opportunity to serve others is an opportunity to be great: greatness is found in serving others",
        description: "",
        references: ["Matthew 20:25-28"]
      },
      {
        title: "Be identity-conscious, not image-conscious",
        description: "",
        references: ["John 13:3-5"]
      }
    ],
    classDiscussion: "What are the benefits of Cultivating a true heart of service?",
    conclusion: `Cultivating a true heart of service is to live a life modelled after Christ; it is to live a fulfilled life, with the joy that follows such acts.`,
    recommendedBooks: ["The man God uses by Oswald J. Smith"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "April",
    order: 15,
  },
  
];

// ---------------------------
// UPDATE OR CREATE APRIL MANUALS ONLY
// ---------------------------
const updateOrCreateAprilManuals = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    let created = 0;
    let updated = 0;

    for (const manual of aprilManuals) {
      const normalizedManual = {
        ...manual,
        memoryVerse: normalizeScripture(manual.memoryVerse),
        text: normalizeScripture(manual.text),
        introduction: manual.introduction,
        mainPoints: normalizeMainPoints(manual.mainPoints),
      };

      // Check if manual exists
      const existing = await Manual.findOne({ id: manual.id });
      
      if (existing) {
        // Update existing
        await Manual.updateOne(
          { id: manual.id },
          { $set: normalizedManual }
        );
        console.log(`✏️  Updated: ${manual.month} Week ${manual.week} - ${manual.title}`);
        updated++;
      } else {
        // Create new
        await Manual.create(normalizedManual);
        console.log(`✨ Created: ${manual.month} Week ${manual.week} - ${manual.title}`);
        created++;
      }
    }

    console.log(`\n✅ Done! Created: ${created}, Updated: ${updated}`);
    console.log(`📊 Total April manuals: ${aprilManuals.length}`);
    
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

updateOrCreateAprilManuals();