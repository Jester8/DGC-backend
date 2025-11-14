import dotenv from "dotenv";
import mongoose from "mongoose";
import Manual from "../models/Manual.js";

dotenv.config();

const manualsData = [
  // JANUARY 2026
  {
    id: "jan_2026_01",
    title: "JESUS AS THE DOOR OF THE SHEEP",
    theme: "JESUS, THE GREAT SHEPHERD",
    week: 1,
    date: "January 4, 2026",
    imageUrl: "https://dgc-backend.onrender.com/public/images/january/king.png",
    memoryVerse: "I am the door: by me if any man enter in, he shall be saved and shall go in and out, and find pasture. (John 10:9)",
    text: "John 10:1-16, Psalm 23:1-6",
    introduction: "Unlike the earthly work of a shepherd that begins when there is a sheepfold, Jesus' shepherding exists even before the sheepfold. He is the Shepherd of the means by which we become part of the sheepfold; He is the very door to the sheepfold. He doesn't just take care of the sheep alone; He brings the sheep in.",
    mainPoints: [
      {
        title: "Jesus is the only way to the father",
        description: "Jesus is only way to God, and every other portal or means is a lie. We can go to God through Jesus alone.",
        references: ["John 14:6", "Ephesians 2:18", "Hebrews 7:25", "1 Tim 2:5", "John 3:16-18"]
      },
      {
        title: "Jesus is the only way to experience salvation",
        description: "The only way to be saved is by believing in Jesus and His finished work.",
        references: ["Acts 4:12", "John 10:7-9", "John 8:24", "Romans 5:1-2"]
      },
      {
        title: "Jesus is the only way to eternal life",
        description: "The sheep are inheritors of eternal life, so to experience it, one must belong to the sheepfold. The only way to belong to the sheepfold is by believing in Jesus.",
        references: ["1 John 5:11-12", "Romans 6:23", "John 3:16&36", "John 6:40", "John 5:24"]
      },
      {
        title: "Jesus is the only way by which anyone can go out of the sheepfold",
        description: "The sheepfold belongs to Jesus, and He decides what happens to His sheep. One of His decisions is that the sheep remain with Him forever.",
        references: ["John 10:27-28"]
      }
    ],
    classDiscussion: "If Jesus is the door to the sheepfold, can a man come out from the sheepfold without His permission? Will Jesus permit a man to leave the sheepfold, especially considering that He intends to bring in even those who are out (John 10:16)?",
    conclusion: "Our faith is anchored on a Shepherd who doesn't just tend to us. Our Shepherd also makes us His sheep. It is our association to the Shepherd that makes us a part of the sheepfold. It is a universal and everlasting truth – no one goes in or out of the sheepfold unless Jesus has allowed him. We are implicated because we have entered in by the Door.",
    month: "January",
    order: 1
  },
  {
    id: "jan_2026_02",
    title: "The Cost of our Salvation",
    theme: "Jesus, The Great Shepherd",
    week: 2,
    date: "January 11, 2026",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep. (John 10:11 KJV)",
    text: "John 10:11-18",
    introduction: "At the very core of our salvation is the ultimate price Jesus paid to save mankind. Jesus Christ as the Great Shepherd, is evident in how His shepherding over us began not in comfort but by laying down His life on the Cross. Through this act of devotion, He established an eternal ownership and an unbreakable security for all who are called by His Name.",
    mainPoints: [
      {
        title: "He Fulfilled Prophecy",
        description: "By sacrificing His life and dying on the Cross",
        references: ["Eze 34:23-24", "Isa 40:11", "Micah 5:4-5", "John 10:11,15"]
      },
      {
        title: "The Promise of Redemption and Salvation",
        description: "Through His death, our sins were forgiven, our souls restored and by faith, we were saved",
        references: ["1 Peter 2:25", "Rev 5:9"]
      },
      {
        title: "He Provides All We Ever Need",
        description: "Loving us unconditionally",
        references: ["Ps 23:1-3", "John 10:9", "Ps 23:4-6"]
      },
      {
        title: "Assurance of Eternal Life",
        description: "We have assurance of eternal life in God through Jesus Christ",
        references: ["John 10:28-30", "Titus 1:2", "Rom 5:21"]
      },
      {
        title: "Our Identity as Sons",
        description: "Our identity as sons is formed in Him",
        references: ["John 10:3-5", "John 1:12-13", "Rom 8:14", "1 John 3:1"]
      }
    ],
    classDiscussion: "The sheep know the Shepherd's voice (John 10:4). In what practical ways can you distinguish the voice of the Great Shepherd from the noise of the world?",
    conclusion: "The sacrifice of Jesus has widely opened us to His unconditional love, protection, salvation and eternal life. Understanding this makes us appreciate and make good use of our inheritance and identity in Christ.",
    month: "January",
    order: 2
  },
  {
    id: "jan_2026_03",
    title: "The Shepherd Who Cares",
    theme: "Jesus the Great Shepherd",
    week: 3,
    date: "January 18, 2026",
    memoryVerse: "I am the good shepherd: the good shepherd giveth his life for the sheep. (John 10:11 KJV)",
    text: "John 10:11–18",
    introduction: "In Scripture, Jesus is revealed as the Great Shepherd who loves, guides, and protects His sheep. A shepherd's duty is to lead and care for his flock, even at the cost of his own life. Unlike a hireling who runs away when danger comes, Jesus laid down His life for us. To know Him as our Shepherd is to walk in trust, peace, and total dependence on His voice.",
    mainPoints: [
      {
        title: "He Knows His Sheep",
        description: "Jesus has a personal relationship with His sheep. He knows each one by name and understands their needs.",
        references: ["John 10:14", "Psalm 139:1–3", "2 Timothy 2:19"]
      },
      {
        title: "He Leads His Sheep",
        description: "The Great Shepherd goes before His flock, showing them the right path and guiding them into truth.",
        references: ["Psalm 23:1–3", "Isaiah 48:17", "John 16:13"]
      },
      {
        title: "He Protects from Danger",
        description: "Jesus stands as a shield for His sheep. He watches over them and delivers them from the enemy's snare.",
        references: ["John 10:27–28", "Psalm 91:1–4", "Zechariah 2:5"]
      },
      {
        title: "He Provides for His Sheep",
        description: "The Great Shepherd ensures that His sheep do not lack. He satisfies both physical and spiritual needs.",
        references: ["Psalm 23:1–2", "Philippians 4:19", "Matthew 6:33"]
      },
      {
        title: "He Laid Down His Life",
        description: "Out of love, Jesus gave His life for the salvation of His sheep. His sacrifice is the ultimate proof of His care.",
        references: ["John 10:15", "Isaiah 53:6", "Hebrews 13:20–21"]
      }
    ],
    classDiscussion: "What makes Jesus different from other shepherds or leaders? How can we train our hearts to recognize and follow His voice daily?",
    conclusion: "Jesus, the Great Shepherd, never leaves His flock unattended. He knows us, leads us, provides for us, and protects us. As His sheep, we must remain close to Him, listening and obeying His voice. The safest and most peaceful place to be is under the care of the Shepherd.",
    month: "January",
    order: 3
  },

  // FEBRUARY 2026
  {
    id: "feb_2026_01",
    title: "Understanding Righteousness",
    theme: "Jesus as our Righteousness",
    week: 1,
    date: "February 5, 2026",
    memoryVerse: "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him. (2 Corinthians 5:21 KJV)",
    text: "Romans 3:25-26, 2 Corinthians 5:21, Romans 3:10",
    introduction: "As we consider this topic, our intention is to unravel what righteousness truly means. Righteousness is the character and quality of being right or just before God (being in right standing with God). The righteousness of God is unattainable by obedience to any law, or by any merit of man's effort, or any other condition than that of faith in Christ. The man who trusts in Christ becomes 'the righteousness of God in Him,' 2 Corinthians 5:21, i.e., becomes in Christ all that God requires a man to be, all that he could never be in himself.",
    mainPoints: [
      {
        title: "What Righteousness means to Man",
        description: "In Luke 18:10, we see a man reading out his CV (works) before God, thinking that all of his works will equate or earn him righteousness. This is what righteousness means to man, that you work to be righteous. Man always wants to earn his ways before God, they think work before acceptance. This type of righteousness cannot bring a man to right standing with God.",
        references: ["Luke 18:9-11", "Romans 10:1-4", "Galatians 2:16", "Philippians 3:9"]
      },
      {
        title: "What Righteousness means to God",
        description: "Righteousness to God is simply faith (in the sacrifice of Jesus). The righteousness of God is not work first but faith first. It puts you in a position, status, and nature that leads to a moral quality living (righteous living). You can safely replace your name with Abraham's name in Romans 4:3 (KJV), that's what makes you righteous, IT IS BY FAITH!",
        references: ["Romans 4:3-5", "Romans 3:22", "Romans 10:6", "Ephesians 2:8–10"]
      }
    ],
    classDiscussion: "Is the righteousness of God necessary, why?",
    conclusion: "What righteousness means to God is faith, not faith without works, but faith in the finished work of Christ that leads to the corresponding works (James 2:17, 22). However, what righteousness means to man is works in order to earn righteousness. But the righteousness of God is simply faith in the Sacrifice of Jesus. Join us next Sunday as we explore the correlation between the Sacrifice of Jesus and righteousness.",
    month: "February",
    order: 1
  },
  {
    id: "feb_2026_02",
    title: "The Sacrifice of Jesus",
    theme: "Jesus as our Righteousness",
    week: 2,
    date: "February 12, 2026",
    memoryVerse: "And they sung a new song, saying, Thou art worthy to take the book, and to open the seals thereof: for thou wast slain, and hast redeemed us to God by thy blood out of every kindred, and tongue, and people, and nation;. (Revelation 5:9 KJV)",
    text: "Revelation 5:9–12, Hebrews 10:16-26",
    introduction: "Our previous study established that righteousness is right standing before God, it is simply a state of being worthy to stand in the presence of God. Righteousness in this dispensation was achievable through the sacrifice of Jesus John 14:6. One of the intentions of God through the sacrifice of Christ was to tear the veil that separated us from him once and for all. Mark 15:38. We are going to consider the strengths of righteousness through the sacrifice of Jesus.",
    mainPoints: [
      {
        title: "The Laws written in our hearts",
        description: "Unlike the dispensation of the Law where the law was written on stone and in the books/scrolls, the law is now written in our hearts.",
        references: ["Jeremiah 31:33", "Hebrews 10:16", "Hebrews 8:10"]
      },
      {
        title: "Supplies Grace to do the work of righteousness",
        description: "Now that the law is internalized, the inner working of the covenant supplies grace to work in righteousness.",
        references: ["Philippians 2:13", "1 Corinthians 15:10", "Titus 2:11-12"]
      },
      {
        title: "Frequency of Fellowship/Access",
        description: "As Paul said, 'I laboured more than they all' through grace. We now have consistent access to fellowship with the father forever and ability to labour abundantly in his grace.",
        references: ["Hebrews 9:7", "John 14:16"]
      },
      {
        title: "Sonship and Ambassadorship",
        description: "As co-heirs with Christ, we're now sons of God and we ALL, not just a few, a lineage or a tribe have access to the Father as priest and kings unto Him and we are His representatives on earth.",
        references: ["2 Corinthians 3:18", "Revelation 5:10"]
      },
      {
        title: "Restoration when we err",
        description: "The blood of Jesus was offered once and for all. We now have an advocate in Heaven to plead our case when we err.",
        references: ["1 John 2:1", "Hebrews 4:15"]
      }
    ],
    classDiscussion: "What other strength can we identify from the righteousness we have in Christ Jesus and how does that affect the way we worship and relate with God?",
    conclusion: "The Sacrifice of Jesus came to give us better access to the Father and at the same time supplied grace to stand right in the covenant that the Lord has made with us.",
    month: "February",
    order: 2
  },
  {
    id: "feb_2026_03",
    title: "Works of Righteousness",
    theme: "Jesus as our Righteousness",
    week: 3,
    date: "February 19, 2026",
    memoryVerse: "In his days Judah shall be saved, and Israel shall dwell safely: and this is his name whereby he shall be called, THE LORD OUR RIGHTEOUSNESS. (Jeremiah 23:6 KJV)",
    text: "Jeremiah 23:5-6, 2 Corinthians 5:21",
    introduction: "Last week we saw that we have right standing with God through the sacrifice of Jesus and not of works. We are counted as 'the righteousness of God' in Christ (2 Cor 5:21). Christ did not just save us, but also sees us as individuals that have followed his commandments. For our sake 'God' made 'Christ' to be sin who knew no sin, so that in him we can become the righteousness of God. This also establishes that our righteousness comes from Christ himself, not from our actions or inactions. If then we came into right standing with God without any input from us, what then do we do now that we're standing rightly before Him?",
    mainPoints: [
      {
        title: "To live life as Christ",
        description: "In thoughts, in deed and in utterance, we ought to live our lives in place of who died for us as though He was still living.",
        references: ["Acts 1:2", "Colossians 4:6", "Galatians 2:20"]
      },
      {
        title: "To keep walking in Faith",
        description: "Since we receive the righteousness not by works but by faith, it is our responsibility to keep walking by faith, it is how we please Him.",
        references: ["Galatians 3:3", "Hebrews 11:6"]
      },
      {
        title: "Obey the Law of the Spirit",
        description: "Submission to God's will, obedience to the prompts of the Holy Spirit and sensitivity to the leadings of God.",
        references: ["Romans 8:2", "Galatians 5:16-18"]
      },
      {
        title: "We establish the Kingdom of God on Earth",
        description: "As believers, it's our responsibility to spread the values of the kingdom of God, and also work as ambassadors of his kingdom.",
        references: ["Matthew 6:10"]
      }
    ],
    classDiscussion: "What other responsibilities have been conferred on us as righteous men here on earth representing the Kingdom of God?",
    conclusion: "In this kingdom, even though we came in as we were, we do not remain as we were. We are conscripted into a new kingdom and we have responsibilities as members of the Kingdom of God.",
    month: "February",
    order: 3
  }
];

const createManuals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Check if manuals already exist
    const existingCount = await Manual.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing manuals`);
      console.log("Options:");
      console.log("1. Clear all and re-seed");
      console.log("2. Add new manuals (may create duplicates)");
      console.log("\nTo proceed with clearing, edit the script to set: clearExisting = true");
      
      // Uncomment the line below to clear and re-seed
      // await Manual.deleteMany({});
      // console.log("🗑️  Cleared existing manuals");
    } else {
      console.log("📝 No existing manuals found. Creating new ones...");
    }

    // Insert manuals
    const result = await Manual.insertMany(manualsData);
    console.log(`\n✅ Successfully created ${result.length} manuals\n`);

    // Display created manuals
    result.forEach((manual) => {
      console.log(`  📖 Week ${manual.week} (${manual.month}): ${manual.title}`);
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