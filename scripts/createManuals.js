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
    '1Peter': '1 Peter',         
    '2Peter': '2 Peter',          
    'Ps': 'Psalm',
    'Psalms': 'Psalm'
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

// Function to format scriptures in text for clickability
const formatScripturesInText = (text) => {
  if (!text) return text;
  
  // For January 4th manual only, format the notable examples section
  if (text.includes("Some notable examples include:")) {
    console.log("📖 Formatting scriptures for notable examples...");
    
    // Split into lines for easier processing
    const lines = text.split('\n');
    const formattedLines = lines.map(line => {
      // Check if line contains bullet points with scriptures
      if (line.includes('•') && (line.includes('Old Testament:') || line.includes('New Testament:'))) {
        console.log("📖 Processing line:", line);
        
        // Process each scripture reference in the line
        let formattedLine = line;
        
        // List of scripture patterns to look for
        const scripturePatterns = [
          // Genesis 48:15
          /(Genesis\s+\d+:\d+)/g,
          // Psalm 78:52, Psalm 80:1
          /(Psalm\s+\d+:\d+)/g,
          // Isaiah 40:11
          /(Isaiah\s+\d+:\d+)/g,
          // Jeremiah 23:1–4 (with en-dash)
          /(Jeremiah\s+\d+:\d+[–-]\d+)/g,
          // Ezekiel 34:11–16 (with en-dash)
          /(Ezekiel\s+\d+:\d+[–-]\d+)/g,
          // Matthew 9:36
          /(Matthew\s+\d+:\d+)/g,
          // Matthew 18:12–14 (with en-dash)
          /(Matthew\s+\d+:\d+[–-]\d+)/g,
          // Luke 15:3–7 (with en-dash)
          /(Luke\s+\d+:\d+[–-]\d+)/g,
          // John 21:15–17 (with en-dash)
          /(John\s+\d+:\d+[–-]\d+)/g,
          // Hebrews 13:20
          /(Hebrews\s+\d+:\d+)/g,
          // 1 Peter 2:25
          /(1 Peter\s+\d+:\d+)/g,
          // 1 Peter 5:2–4 (with en-dash)
          /(1 Peter\s+\d+:\d+[–-]\d+)/g,
          // Revelation 7:17
          /(Revelation\s+\d+:\d+)/g,
        ];
        
        // Apply all patterns
        scripturePatterns.forEach(pattern => {
          formattedLine = formattedLine.replace(pattern, (match) => {
            console.log(`📖 Found scripture: ${match}`);
            return match; // Keep as-is, the frontend will detect it
          });
        });
        
        return formattedLine;
      }
      return line;
    });
    
    return formattedLines.join('\n');
  }
  
  return text;
};

// ---------------------------
// ALL MANUALS DATA HERE - EXACT FORMAT FROM YOUR MANUAL
// ---------------------------
const manualsData = [
  {
    id: "jan_2026_01",
    title: "JESUS, The Great Shepherd",
    theme: "JESUS, The Great Shepherd",
    week: 1,
    date: "4th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/4th.png",
    memoryVerse: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly. — John 10:10 (KJV)",
    text: "John 10:1-30",
    introduction: `Have you ever wondered why Jesus chose the relationship between a shepherd and a flock to explain His ministry in John 10? Why not a goldsmith? Why not a farmer or even a fisherman? This choice invites us to pay close attention to who a shepherd is and how a shepherd operates. If Jesus calls Himself the Good Shepherd, then an important question naturally follows: what makes Him a good shepherd?

When we examine Scripture carefully, we see that the symbolism of sheep and shepherd is not unique to John 10. It appears repeatedly across the Bible, again calling our attention to the importance of this topic.

Some notable examples include:
• Old Testament: Genesis 48:15, Psalm 78:52, Psalm 80:1, Isaiah 40:11, Jeremiah 23:1–4, Ezekiel 34:11–16.
• New Testament: Matthew 9:36, Matthew 18:12–14,  Luke 15:3–7,   1 Peter 2:25, John 21:15–17, Hebrews 13:20, , 1 Peter 5:2–4, Revelation 7:17.`,
    mainPoints: [
      {
        title: "Who is a Shepherd?",
        description: "A shepherd is a person who tends, feeds, and guards flocks of sheep. The function of a shepherd is a 24/7 commitment to the safety and health of his flocks. His duties cut across leading, protecting, restoring, and providing for his flock."
      },
      {
        title: "What makes Jesus the Great Shepherd?",
        description: "• His ability to lay down His life for the sheep (John 10:11, Hebrews 13:20).\n• His compassion for the sheep (Matthew 9:36).\n• His ability to give life (John 10:10, 28).\n• His ability to keep and restore (John 10:29, Luke 15:3–7).",
        references: ["John 10:11", "Hebrews 13:20", "Matthew 9:36", "John 10:10", "John 10:28", "John 10:29", "Luke 15:3-7"]
      }
    ],
    classDiscussion: "From our Bible text, what other things can you say make Jesus the Great Shepherd?",
    conclusion: "Since we have this Great Shepherd, we can confidently embrace Psalm 23 as we walk through 2026. The word 'shepherd' here comes from the Hebrew râ‛âh, meaning to keep, to feed, to tend, and to associate with. This reveals that Christ's shepherding is not distant or occasional; it is personal, consistent, and ever-present. Resting in the assurance that 'The Lord is my shepherd,' let us pledge our allegiance to Him alone, following His voice and refusing the voice of a stranger.",
    declaration: `The LORD is my shepherd; I shall not want.
He maketh me to lie down in green pastures: he leadeth me beside the still waters.
He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.
Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.
Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.
Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.`,
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 1
  },
  {
    id: "jan_2026_02",
    title: "Jesus as the Door of the Sheep",
    subTopic: "Jesus as the Door of the Sheep",
    theme: "JESUS, The Great Shepherd",
    week: 2,
    date: "11th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/11th.png",
    memoryVerse: "I am the door: by me if any man enters in, he shall be saved and shall go in and out, and find pasture. (John 10:9)",
    text: "John 10:1-16, Psalm 23:1-6",
    introduction: "Unlike the earthly work of a shepherd that begins when there is a sheepfold, Jesus' shepherding exists even before the sheepfold. He is the Shepherd of the means by which we become part of the sheepfold; He is the very door to the sheepfold. He doesn't just take care of the sheep alone; He brings the sheep in.",
    mainPoints: [
      {
        title: "Jesus is the only way to the father",
        description: "Jesus is only way to God, and every other portal or means is a lie. We can go to God through Jesus alone.",
        references: ["John 14:6", "Ephesians 2:18", "Hebrews 7:25", "1 Timothy 2:5", "John 3:16-18"]
      },
      {
        title: "Jesus is the only way to experience salvation",
        description: "The only way to be saved is by believing in Jesus and His finished work.",
        references: ["Acts 4:12", "John 10:7-9", "John 8:24", "Romans 5:1-2"]
      },
      {
        title: "Jesus is the only way to eternal life",
        description: "The sheep are inheritors of eternal life, so to experience it, one must belong to the sheepfold. The only way to belong to the sheepfold is by believing in Jesus.",
        references: ["1 John 5:11-12", "Romans 6:23", "John 3:16", "John 3:36", "John 6:40", "John 5:24"]
      },
      {
        title: "Jesus is the only way by which anyone can go out of the sheepfold",
        description: "The sheepfold belongs to Jesus, and He decides what happens to His sheep. One of His decisions is that the sheep remain with Him forever.",
        references: ["John 10:27-28"]
      }
    ],
    classDiscussion: "If Jesus is the door to the sheepfold, can a man come out from the sheepfold without His permission? Will Jesus permit a man to leave the sheepfold, especially considering that He intends to bring in even those who are out (John 10:16)?",
    conclusion: "Our faith is anchored on a Shepherd who doesn't just tend to us. Our Shepherd also makes us His sheep. It is our association to the Shepherd that makes us a part of the sheepfold. It is a universal and everlasting truth, no one goes in or out of the sheepfold unless Jesus has allowed him. We are implicated because we have entered in by the Door.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 2
  },
  {
    id: "jan_2026_03",
    title: "The Cost of our Salvation",
    subTopic: "The Cost of our Salvation",
    theme: "JESUS, The Great Shepherd",
    week: 3,
    date: "18th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/18th.png",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep. (John 10:11 KJV)",
    text: "John 10:11-18",
    introduction: "At the very core of our salvation is the ultimate price Jesus paid to save mankind. Jesus Christ as the Great Shepherd, is evident in how His shepherding over us began not in comfort but by laying down His life on the Cross. Through this act of devotion, He established an eternal ownership and an unbreakable security for all who are called by His Name.",
    mainPoints: [
      {
        title: "He Fulfilled Prophecy",
        description: "By sacrificing His life and dying on the Cross.",
        references: ["Ezekiel 34:23-24", "Isaiah 40:11", "Micah 5:4-5", "John 10:11", "John 10:15"]
      },
      {
        title: "The Promise of Redemption and Salvation",
        description: "Through His death, our sins were forgiven, our souls restored and by faith, we were saved.",
        references: ["1 Peter 2:25", "Revelation 5:9"]
      },
      {
        title: "He Provides all we ever need, loving us unconditionally",
        description: "The Great Shepherd meets all our needs out of His abundant love.",
        references: ["Psalm 23:1-3", "John 10:9", "Psalm 23:4-6"]
      },
      {
        title: "Assurance of Eternal Life",
        description: "We have eternal life in God through Jesus Christ.",
        references: ["John 10:28-30", "Titus 1:2", "Romans 5:21"]
      },
      {
        title: "Our Identity as Sons is Formed in Him",
        description: "We are formed into sons of God through our relationship with Christ.",
        references: ["John 10:3-5", "John 1:12-13", "Romans 8:14", "1 John 3:1"]
      }
    ],
    classDiscussion: "The sheep know the Shepherd's voice (John 10:4). In what practical ways can you distinguish the voice of the Great Shepherd from the noise of the world?",
    conclusion: "The sacrifice of Jesus has widely opened us to His unconditional love, protection, salvation and eternal life. Understanding this makes us appreciate and make good use of our inheritance and identity in Christ.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 3
  },
  {
    id: "jan_2026_04",
    title: "The Shepherd Who Cares",
    subTopic: "The Shepherd Who Cares",
    theme: "JESUS, The Great Shepherd",
    week: 4,
    date: "25th January, 2026",
    coverBannerImg: "https://dgc-backend.onrender.com/public/images/january/jan.png",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/25th.png",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep. (John 10:11 KJV)",
    text: "John 10:11-18",
    introduction: "In Scripture, Jesus is revealed as the Great Shepherd who loves, guides, and protects His sheep. A shepherd's duty is to lead and care for his flock, even at the cost of his own life. Unlike a hireling who runs away when danger comes, Jesus laid down His life for us. To know Him as our Shepherd is to walk in trust, peace, and total dependence on His voice.",
    mainPoints: [
      {
        title: "He Knows His Sheep",
        description: "Jesus has a personal relationship with His sheep. He knows each one by name and understands their needs.",
        references: ["John 10:14", "Psalm 139:1-3", "2 Timothy 2:19"]
      },
      {
        title: "He Leads His Sheep",
        description: "The Great Shepherd goes before His flock, showing them the right path and guiding them into truth.",
        references: ["Psalm 23:1-3", "Isaiah 48:17", "John 16:13"]
      },
      {
        title: "He Protects from Danger",
        description: "Jesus stands as a shield for His sheep. He watches over them and delivers them from the enemy's snare.",
        references: ["John 10:27-28", "Psalm 91:1-4", "Zechariah 2:5"]
      },
      {
        title: "He Provides for His Sheep",
        description: "The Great Shepherd ensures that His sheep do not lack. He satisfies both physical and spiritual needs.",
        references: ["Psalm 23:1-2", "Philippians 4:19", "Matthew 6:33"]
      },
      {
        title: "He Laid Down His Life",
        description: "Out of love, Jesus gave His life for the salvation of His sheep. His sacrifice is the ultimate proof of His care.",
        references: ["John 10:15", "Isaiah 53:6", "Hebrews 13:20-21"]
      }
    ],
    classDiscussion: "1. What makes Jesus different from other shepherds or leaders?\n2. How can we train our hearts to recognize and follow His voice daily?",
    conclusion: "Jesus, the Great Shepherd, never leaves His flock unattended. He knows us, leads us, provides for us, and protects us. As His sheep, we must remain close to Him, listening and obeying His voice. The safest and most peaceful place to be is under the care of the Shepherd.",
    recommendedBooks: ["The Present Day – Ministry of Jesus Christ by Kenneth E. Hagin"],
    feedbackLink: "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    month: "January",
    order: 4
  },
  // ================= FEBRUARY 1ST MANUAL =================
 [
  {
    "id": "feb_2026_01",
    "title": "The Parables of Jesus on Sin and Repentance",
    "subTopic": "The Parables of Jesus on Sin and Repentance",
    "theme": "The Parables of Jesus",
    "week": 1,
    "date": "1st February, 2026",
    "coverBannerImg": "https://dgc-backend.onrender.com/public/images/january/jan.png",
    "imageUrl": "https://dgc-backend.onrender.com/public/images/feb/feb1.png",
    "memoryVerse": "Likewise, I say unto you, there is joy in the presence of the angels of God over one sinner that repenteth. (Luke 15:10)",
    "text": "Luke 5:32",
    "introduction": "A biblical parable is a short, simple story used to illustrate a religious or moral lesson. Jesus told parables on sin and forgiveness to show that God wasn't just a God of judgement and justice as the law revealed, but also a God of mercy and forgiveness.",
    "mainPoints": [
      {
        "title": "The Lost Sheep (Luke 15:3–7)",
        "description": "The premium value of a soul in God's sight",
        "references": ["Luke 15:3-7"]
      },
      {
        "title": "The Lost Coin (Luke 15:8–10)",
        "description": "God can go any length to save or restore.",
        "references": ["Luke 15:8-10"]
      },
      {
        "title": "The Lost Son (Luke 15:11–32)",
        "description": "God's unconditional love for repentant sinners.",
        "references": ["Luke 15:11-32"]
      },
      {
        "title": "The Unforgiving Servant (Matthew 18:21–35)",
        "description": "Extend forgiveness just like God forgave you.",
        "references": ["Matthew 18:21-35"]
      }
    ],
    "classDiscussion": "Taking cues from point 4, is it possible for man to forgive and forget?",
    "conclusion": "There is no sin God cannot forgive, and he's more willing to forgive than we are willing to be forgiven. However, forgiveness cannot be received without repentance.",
    "recommendedBooks": ["The Jesus I never knew by Philip Yancey"],
    "feedbackLink": "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    "month": "February",
    "order": 5
  },
  {
    "id": "feb_2026_02",
    "title": "The Kingdom Parables of Jesus",
    "subTopic": "The Kingdom Parables of Jesus",
    "theme": "The Parables of Jesus",
    "week": 2,
    "date": "8th February, 2026",
    "coverBannerImg": "https://dgc-backend.onrender.com/public/images/january/jan.png",
    "imageUrl": "https://dgc-backend.onrender.com/public/images/feb/feb2.png",
    "memoryVerse": "But blessed are your eyes for they see, and your ears for they hear; (Matthew 13:16)",
    "text": "Matthew 13:10-17",
    "introduction": "Jesus' parables were spoken and written for man's whole redemption - as in bodily, soulful, and spiritual health. Yet, our Lord felt it out-of-place to share the treasures of the kingdom with people with blinded eyes and dulled ears. These treasures, which the prophets of old desired to look into, though unavailable to outsiders, are available to us as we approach His eternal Word with unveiled hearts.",
    "mainPoints": [
      {
        "title": "The Sower (Matthew 13:3-9)",
        "description": "Attitudes towards God's Kingdom",
        "references": ["Matthew 13:3-9"]
      },
      {
        "title": "Tares and Wheat (Matthew 13:24-30)",
        "description": "The present and future reality of evil amidst God's earthly Kingdom",
        "references": ["Matthew 13:24-30"]
      },
      {
        "title": "The Mustard Seed (Matthew 13:31-32)",
        "description": "The growth potential of the Kingdom",
        "references": ["Matthew 13:31-32"]
      },
      {
        "title": "A Leaven (Matthew 13:33)",
        "description": "The influence of the Kingdom",
        "references": ["Matthew 13:33"]
      },
      {
        "title": "The Hidden Treasure (Matthew 13:44)",
        "description": "The prize of the Kingdom; Seeking and apprehending the prize of the Kingdom",
        "references": ["Matthew 13:44"]
      }
    ],
    "classDiscussion": "By the Spirit's help, what else do you find from these parables: about God or His Kingdom, worth sharing?",
    "assignment": "What do these parables talk about God’s attitudes on the Kingdom? A Dragnet (Matthew 13:47-50); Vineyard Labourers (Matthew 20:1-16); Two Sons (Matthew 21:28-32); Wicked Vinedressers (Matthew 21:33-43); A Growing Seed (Mark 4:26-29) – Growth in the Kingdom; The Great Supper (Luke 14:15-24); and A Pearl of Great Price (Matthew 13:45-46).",
    "conclusion": "The Kingdom of God is available to everyone who would accept the responsibility of receiving, seeking, and/or knocking on its gates, via the Way created by Jesus’ salvific work. (Hebrews 10:19-25.)",
    "recommendedBooks": ["The Jesus I never knew by Philip Yancey"],
    "feedbackLink": "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    "month": "February",
    "order": 6
  },
  {
    "id": "feb_2026_03",
    "title": "The Parables of Stewardship, Service, and Preparedness",
    "subTopic": "The Parables of Stewardship, Service, and Preparedness",
    "theme": "The Parables of Jesus",
    "week": 3,
    "date": "15th February, 2026",
    "coverBannerImg": "https://dgc-backend.onrender.com/public/images/january/jan.png",
    "imageUrl": "https://dgc-backend.onrender.com/public/images/feb/feb3.png",
    "memoryVerse": "Who then is that faithful and wise steward, whom his lord shall make ruler over his household, to give them their portion of meat in due season? (Luke 12:42, KJV)",
    "text": "Matthew 25:14–30; Luke 19:11–27; Luke 12:16–21",
    "introduction": "Jesus’ parables on stewardship, service, and preparedness reveal God’s expectation for faithfulness, compassion, and readiness in the believer’s walk. We are managers of God’s resources, called to serve with love and to live with eternity in view. Each story underscores accountability, diligence, and spiritual alertness as we await our Lord’s return.",
    "mainPoints": [
      {
        "title": "Stewardship Parables",
        "description": "Talents (Matt. 25:14-30, Luke 19:11-27) - Faithful use of God’s gifts brings reward; negligence leads to loss. Rich Fool (Luke 12:16-21) - Wealth without purpose toward God is emptiness.",
        "references": ["Matthew 25:14-30", "Luke 19:11-27", "Luke 12:16-21"]
      },
      {
        "title": "Service Parable",
        "description": "Good Samaritan (Luke 10:30–37) - True service is love in action beyond religion or race.",
        "references": ["Luke 10:30-37"]
      },
      {
        "title": "Preparedness Parables",
        "description": "Barren Fig Tree (Luke 13:6–9) – God expects fruitfulness before judgment. Ten Virgins (Matt. 25:1–13) – Spiritual vigilance ensures readiness for the Bridegroom’s coming.",
        "references": ["Luke 13:6-9", "Matthew 25:1-13"]
      }
    ],
    "classDiscussion": "How do these parables challenge your personal approach to responsibility, compassion, and spiritual readiness?",
    "assignment": "What do these Jesus’ parables tell you? Unjust Steward (Luke 16:1–13); Marriage of the King’s Son (Matt. 22:1–14)?",
    "conclusion": "God calls every believer to stewardship, service, and preparedness. Faithful servants invest their gifts, love others selflessly, and remain spiritually awake until Christ returns.",
    "confession": "I am a faithful steward, a joyful servant, and a prepared bride for my Lord’s coming!",
    "recommendedBooks": ["The Jesus I never knew by Philip Yancey"],
    "feedbackLink": "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    "month": "February",
    "order": 7
  },
  {
    "id": "feb_2026_04",
    "title": "Sunday School Outline",
    "subTopic": "Sunday School Outline",
    "theme": "The Parables of Jesus",
    "week": 4,
    "date": "22nd February, 2026",
    "coverBannerImg": "https://dgc-backend.onrender.com/public/images/january/jan.png",
    "imageUrl": "https://dgc-backend.onrender.com/public/images/feb/feb4.png",
    "memoryVerse": "",
    "text": "",
    "introduction": "",
    "mainPoints": [],
    "classDiscussion": "",
    "conclusion": "",
    "recommendedBooks": ["The Jesus I never knew by Philip Yancey"],
    "feedbackLink": "bit.ly/DGCSUNDAYSCHOOLATTENDANCE",
    "month": "February",
    "order": 8,
    "note": "Outline provided but content details not fully specified in the input. This entry serves as a placeholder for the 22nd February lesson."
  }
]
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
      // Format scriptures in introduction for January 4th manual
      let formattedIntroduction = manual.introduction;
      if (manual.id === "jan_2026_01") {
        console.log(`📖 Formatting scriptures for January 4th introduction...`);
        formattedIntroduction = formatScripturesInText(manual.introduction);
      }
      
      const normalized = {
        ...manual,
        memoryVerse: normalizeScripture(manual.memoryVerse),
        text: normalizeScripture(manual.text),
        introduction: formattedIntroduction,
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
      if (manual.recommendedBooks) {
        console.log(`   📚 Recommended Books: ${manual.recommendedBooks.length}`);
      } else {
        console.log(`   📚 No recommended books`);
      }
    });

    // Show January 4th scripture examples
    const jan4Manual = inserted.find(m => m.id === "jan_2026_01");
    if (jan4Manual) {
      console.log(`\n📖 January 4th Notable Examples Scriptures:`);
      const introLines = jan4Manual.introduction.split('\n');
      introLines.forEach((line, index) => {
        if (line.includes('Genesis') || line.includes('Psalm') || line.includes('Matthew') || 
            line.includes('Luke') || line.includes('John') || line.includes('Hebrews') || 
            line.includes('1 Peter') || line.includes('Revelation')) {
          console.log(`   Line ${index + 1}: ${line.trim()}`);
        }
      });
    }

    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error creating manuals:", error);
    process.exit(1);
  }
};

createManuals();