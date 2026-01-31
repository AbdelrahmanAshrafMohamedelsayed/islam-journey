/**
 * Character Definitions for Narrative-Style Learning
 *
 * Characters are rendered as silhouettes with geometric Islamic patterns
 * to maintain a respectful, beautiful aesthetic while adding personality.
 */

export type CharacterEmotion =
  | "neutral"
  | "happy"
  | "thinking"
  | "excited"
  | "peaceful"
  | "encouraging"
  | "welcoming"
  | "proud";

export type CharacterRole =
  | "guide"
  | "companion"
  | "elder"
  | "historical"
  | "champion";

export interface Character {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  role: CharacterRole;
  description: {
    en: string;
    ar: string;
  };
  personality: string[];
  defaultEmotion: CharacterEmotion;
  patternStyle: "geometric" | "arabesque" | "calligraphy" | "stars";
  primaryColor: string;
  secondaryColor: string;
  unlockCondition: CharacterUnlockCondition;
  greetings: {
    en: string[];
    ar: string[];
  };
  encouragements: {
    en: string[];
    ar: string[];
  };
  farewells: {
    en: string[];
    ar: string[];
  };
}

export interface CharacterUnlockCondition {
  type:
    | "default"
    | "chapter_complete"
    | "lessons_complete"
    | "streak"
    | "level";
  value?: string | number; // chapterId, lesson count, streak days, or level number
}

export interface CharacterDialogue {
  characterId: string;
  emotion: CharacterEmotion;
  text: {
    en: string;
    ar: string;
  };
  context?:
    | "intro"
    | "explanation"
    | "question"
    | "encouragement"
    | "celebration"
    | "farewell";
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN GUIDE CHARACTERS (Always Available)
// ═══════════════════════════════════════════════════════════════════════════════

export const CHARACTERS: Record<string, Character> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // Yusuf - The Friendly Guide (Default Character)
  // ─────────────────────────────────────────────────────────────────────────────
  yusuf: {
    id: "yusuf",
    name: {
      en: "Yusuf",
      ar: "يوسف",
    },
    title: {
      en: "The Friendly Guide",
      ar: "المرشد الودود",
    },
    role: "guide",
    description: {
      en: "A warm and patient guide who remembers his own journey of learning. He explains concepts simply and celebrates every small victory with you.",
      ar: "مرشد دافئ وصبور يتذكر رحلته في التعلم. يشرح المفاهيم ببساطة ويحتفل بكل انتصار صغير معك.",
    },
    personality: ["patient", "encouraging", "humble", "joyful"],
    defaultEmotion: "welcoming",
    patternStyle: "geometric",
    primaryColor: "#10B981", // Emerald
    secondaryColor: "#34D399",
    unlockCondition: { type: "default" },
    greetings: {
      en: [
        "Assalamu Alaikum! Ready to continue our journey?",
        "Welcome back, friend! I'm excited to learn together.",
        "Peace be upon you! Let's explore something beautiful today.",
        "Ah, there you are! I was just thinking about our next adventure.",
      ],
      ar: [
        "السلام عليكم! هل أنت مستعد لمواصلة رحلتنا؟",
        "مرحباً بعودتك يا صديقي! أنا متحمس للتعلم معاً.",
        "السلام عليكم! دعنا نستكشف شيئاً جميلاً اليوم.",
        "ها أنت ذا! كنت أفكر للتو في مغامرتنا القادمة.",
      ],
    },
    encouragements: {
      en: [
        "You're doing wonderfully! Keep going.",
        "MashaAllah! Your progress is inspiring.",
        "Don't worry, everyone learns at their own pace.",
        "That's a great question! Let me explain...",
        "You've come so far already. I'm proud of you!",
      ],
      ar: [
        "أنت تبلي بلاءً حسناً! واصل.",
        "ما شاء الله! تقدمك ملهم.",
        "لا تقلق، كل شخص يتعلم بسرعته الخاصة.",
        "هذا سؤال رائع! دعني أشرح...",
        "لقد قطعت شوطاً طويلاً بالفعل. أنا فخور بك!",
      ],
    },
    farewells: {
      en: [
        "Until next time, may peace be with you!",
        "Go with Allah's blessings. See you soon!",
        "Rest well, and come back when you're ready.",
        "JazakAllahu Khairan for your time today!",
      ],
      ar: [
        "إلى اللقاء، والسلام عليكم!",
        "اذهب مع بركات الله. أراك قريباً!",
        "ارتح جيداً، وعد عندما تكون مستعداً.",
        "جزاك الله خيراً على وقتك اليوم!",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Fatima - The Wise Elder
  // ─────────────────────────────────────────────────────────────────────────────
  fatima: {
    id: "fatima",
    name: {
      en: "Fatima",
      ar: "فاطمة",
    },
    title: {
      en: "The Wise Elder",
      ar: "الحكيمة",
    },
    role: "elder",
    description: {
      en: "A wise grandmother figure who shares deep insights and stories passed down through generations. She speaks with gentle wisdom and heartfelt warmth.",
      ar: "شخصية جدة حكيمة تشارك رؤى عميقة وقصصاً متوارثة عبر الأجيال. تتحدث بحكمة لطيفة ودفء صادق.",
    },
    personality: ["wise", "gentle", "storyteller", "nurturing"],
    defaultEmotion: "peaceful",
    patternStyle: "arabesque",
    primaryColor: "#8B5CF6", // Purple
    secondaryColor: "#A78BFA",
    unlockCondition: { type: "level", value: 3 },
    greetings: {
      en: [
        "Ah, my child, come sit with me. I have stories to share.",
        "Bismillah, let us begin. There is much wisdom to uncover.",
        "Welcome, dear one. The knowledge of generations awaits you.",
        "SubhanAllah, you've returned! Let me tell you something beautiful.",
      ],
      ar: [
        "آه، يا بني، تعال واجلس معي. لدي قصص لأشاركها.",
        "بسم الله، لنبدأ. هناك الكثير من الحكمة لنكتشفها.",
        "مرحباً عزيزي. حكمة الأجيال بانتظارك.",
        "سبحان الله، لقد عدت! دعني أخبرك بشيء جميل.",
      ],
    },
    encouragements: {
      en: [
        "This is exactly how the scholars before us learned.",
        "Your grandmother would be so proud to see you learning this.",
        "In my years, I've seen many seekers. You have a special light.",
        "The Prophet ﷺ said: 'Seek knowledge from the cradle to the grave.'",
        "Patience, dear one. The sweetest fruits take time to ripen.",
      ],
      ar: [
        "هكذا تماماً تعلم العلماء قبلنا.",
        "جدتك ستكون فخورة جداً برؤيتك تتعلم هذا.",
        "في سنواتي، رأيت كثيراً من الباحثين. لديك نور خاص.",
        "قال النبي ﷺ: 'اطلبوا العلم من المهد إلى اللحد.'",
        "صبراً، يا عزيزي. أحلى الثمار تأخذ وقتاً لتنضج.",
      ],
    },
    farewells: {
      en: [
        "Go with the wisdom of the ages, my child.",
        "May Allah illuminate your path always.",
        "Remember what we discussed. It will serve you well.",
        "Until we meet again, keep this knowledge close to your heart.",
      ],
      ar: [
        "اذهب مع حكمة الأجيال، يا بني.",
        "جعل الله نورك دائماً.",
        "تذكر ما ناقشناه. سيفيدك كثيراً.",
        "حتى نلتقي مرة أخرى، احفظ هذه المعرفة قريبة من قلبك.",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Tariq - The Fellow Traveler
  // ─────────────────────────────────────────────────────────────────────────────
  tariq: {
    id: "tariq",
    name: {
      en: "Tariq",
      ar: "طارق",
    },
    title: {
      en: "The Fellow Traveler",
      ar: "رفيق الدرب",
    },
    role: "companion",
    description: {
      en: "A friendly peer who is also on his learning journey. He makes mistakes, asks questions, and learns alongside you—making the journey feel less lonely.",
      ar: "صديق ودود هو أيضاً في رحلة التعلم. يخطئ ويسأل أسئلة ويتعلم معك—مما يجعل الرحلة أقل وحدة.",
    },
    personality: ["curious", "relatable", "enthusiastic", "humble"],
    defaultEmotion: "excited",
    patternStyle: "stars",
    primaryColor: "#F59E0B", // Amber
    secondaryColor: "#FBBF24",
    unlockCondition: { type: "lessons_complete", value: 5 },
    greetings: {
      en: [
        "Hey! I was just about to start this lesson too!",
        "Perfect timing! Want to learn this together?",
        "Oh cool, you're here! I have so many questions about this topic.",
        "Assalamu Alaikum! Ready to figure this out together?",
      ],
      ar: [
        "مرحباً! كنت على وشك بدء هذا الدرس أيضاً!",
        "توقيت مثالي! هل تريد أن نتعلم هذا معاً؟",
        "رائع، أنت هنا! لدي الكثير من الأسئلة حول هذا الموضوع.",
        "السلام عليكم! هل أنت مستعد لنكتشف هذا معاً؟",
      ],
    },
    encouragements: {
      en: [
        "Wait, I think I understand this now! Do you get it too?",
        "I made this same mistake before. Here's what helped me...",
        "This is actually pretty cool when you think about it!",
        "Don't feel bad, this part confused me too at first.",
        "We're making progress! High five! ✋",
      ],
      ar: [
        "انتظر، أظن أنني فهمت هذا الآن! هل فهمت أيضاً؟",
        "ارتكبت نفس الخطأ من قبل. إليك ما ساعدني...",
        "هذا رائع حقاً عندما تفكر فيه!",
        "لا تشعر بالسوء، هذا الجزء أربكني أيضاً في البداية.",
        "نحن نحرز تقدماً! هاي فايف! ✋",
      ],
    },
    farewells: {
      en: [
        "Great session! See you next time!",
        "I learned so much today. Thanks for studying with me!",
        "Can't wait to continue tomorrow. Take care!",
        "That was fun! Let's do this again soon.",
      ],
      ar: [
        "جلسة رائعة! أراك في المرة القادمة!",
        "تعلمت الكثير اليوم. شكراً للدراسة معي!",
        "لا أستطيع الانتظار للمتابعة غداً. اعتنِ بنفسك!",
        "كان هذا ممتعاً! لنفعل هذا مرة أخرى قريباً.",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Khabib Nurmagomedov - The Champion of Faith
  // ─────────────────────────────────────────────────────────────────────────────
  khabib: {
    id: "khabib",
    name: {
      en: "Khabib",
      ar: "حبيب",
    },
    title: {
      en: "The Eagle",
      ar: "النسر",
    },
    role: "champion" as CharacterRole,
    description: {
      en: "Khabib Nurmagomedov, the undefeated UFC champion from Dagestan. A devout Muslim who shows that faith, discipline, and excellence go hand in hand. Known for his humility, respect for parents, and dedication to Islam.",
      ar: "حبيب نورمحمدوف، بطل UFC غير المهزوم من داغستان. مسلم متدين يُظهر أن الإيمان والانضباط والتميز يسيرون جنباً إلى جنب. معروف بتواضعه واحترامه لوالديه وتفانيه في الإسلام.",
    },
    personality: [
      "disciplined",
      "humble",
      "determined",
      "faithful",
      "respectful",
    ],
    defaultEmotion: "encouraging" as CharacterEmotion,
    patternStyle: "geometric" as const,
    primaryColor: "#DC2626",
    secondaryColor: "#991B1B",
    unlockCondition: { type: "default" as const },
    greetings: {
      en: [
        "Assalamu Alaikum, brother! Alhamdulillah, you're here. Let's learn together!",
        "Hey, welcome! You know, this is number one - learning about Islam.",
        "Brother, sister, Bismillah! Let's go on this journey together.",
        "Assalamu Alaikum! My father always said: 'Knowledge before action.' Let's learn.",
        "Welcome, my friend! In Dagestan, we say: 'A man without knowledge is like an eagle without wings.'",
      ],
      ar: [
        "السلام عليكم يا أخي! الحمد لله أنك هنا. لنتعلم معاً!",
        "مرحباً! هذا هو رقم واحد - التعلم عن الإسلام.",
        "أخي، أختي، بسم الله! لننطلق في هذه الرحلة معاً.",
        "السلام عليكم! أبي كان يقول دائماً: 'العلم قبل العمل.' لنتعلم.",
        "مرحباً يا صديقي! في داغستان نقول: 'الرجل بلا علم كالنسر بلا أجنحة.'",
      ],
    },
    encouragements: {
      en: [
        "Brother, this is very important. Focus, be patient, you will understand.",
        "You know, my father taught me everything. Respect your parents, respect your teachers.",
        "In fighting, in life, in faith - discipline is everything. Keep going!",
        "Alhamdulillah! You're making progress. This is what champions do.",
        "Don't give up, brother. I never gave up in 29 fights, don't give up in learning!",
        "My mother's prayers carried me through everything. Never underestimate dua.",
        "You know what? Islam is perfect. We are not perfect, but Islam is perfect.",
        "Brother, be humble. The Prophet ﷺ was the most humble. This is the way.",
        "Stay focused! In the cage, in salah, focus is everything.",
        "MashaAllah! You're doing great. My father would be proud of you.",
      ],
      ar: [
        "أخي، هذا مهم جداً. ركز، كن صبوراً، ستفهم.",
        "أبي علمني كل شيء. احترم والديك، احترم معلميك.",
        "في القتال، في الحياة، في الإيمان - الانضباط هو كل شيء. واصل!",
        "الحمد لله! أنت تحرز تقدماً. هذا ما يفعله الأبطال.",
        "لا تستسلم يا أخي. لم أستسلم في 29 قتالاً، لا تستسلم في التعلم!",
        "دعاء أمي حملني خلال كل شيء. لا تستهن أبداً بالدعاء.",
        "تعرف ماذا؟ الإسلام كامل. نحن لسنا كاملين، لكن الإسلام كامل.",
        "أخي، كن متواضعاً. النبي ﷺ كان الأكثر تواضعاً. هذا هو الطريق.",
        "ابقَ مركزاً! في القفص، في الصلاة، التركيز هو كل شيء.",
        "ما شاء الله! أنت تبلي حسناً. أبي سيكون فخوراً بك.",
      ],
    },
    farewells: {
      en: [
        "Alhamdulillah, brother! Good session. See you next time, InshaAllah!",
        "Go rest, come back strong. This is the way of the champion.",
        "May Allah bless you and your family. Until next time!",
        "Remember what we learned today. Knowledge is power, brother.",
        "JazakAllahu Khairan! My father would say: 'Always end with gratitude.'",
      ],
      ar: [
        "الحمد لله يا أخي! جلسة جيدة. أراك المرة القادمة إن شاء الله!",
        "اذهب واسترح، عُد قوياً. هذا طريق البطل.",
        "بارك الله فيك وفي عائلتك. إلى اللقاء!",
        "تذكر ما تعلمناه اليوم. العلم قوة يا أخي.",
        "جزاك الله خيراً! أبي كان يقول: 'دائماً اختم بالشكر.'",
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HISTORICAL CHARACTERS (Unlocked by completing relevant chapters)
// ═══════════════════════════════════════════════════════════════════════════════

export const HISTORICAL_CHARACTERS: Record<string, Character> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // Bilal ibn Rabah - Unlocked after Salah chapter
  // ─────────────────────────────────────────────────────────────────────────────
  bilal: {
    id: "bilal",
    name: {
      en: "Bilal",
      ar: "بلال",
    },
    title: {
      en: "The First Muezzin",
      ar: "المؤذن الأول",
    },
    role: "historical",
    description: {
      en: "Bilal ibn Rabah (RA), the beloved companion who endured persecution for his faith and became the first person to call the Adhan in Islam.",
      ar: "بلال بن رباح رضي الله عنه، الصحابي الحبيب الذي صبر على الاضطهاد من أجل إيمانه وأصبح أول من أذن في الإسلام.",
    },
    personality: ["steadfast", "devoted", "resilient", "humble"],
    defaultEmotion: "peaceful",
    patternStyle: "calligraphy",
    primaryColor: "#0EA5E9", // Sky blue
    secondaryColor: "#38BDF8",
    unlockCondition: { type: "chapter_complete", value: "salah" },
    greetings: {
      en: [
        "Assalamu Alaikum. Let me share with you the beauty of the call to prayer.",
        "Welcome, seeker. Do you hear it? The call that echoes through the ages.",
        "Peace be upon you. Stand with me, as I once stood on the Kaaba.",
      ],
      ar: [
        "السلام عليكم. دعني أشاركك جمال النداء إلى الصلاة.",
        "مرحباً أيها الباحث. هل تسمعه؟ النداء الذي يتردد عبر العصور.",
        "السلام عليكم. قف معي، كما وقفت ذات يوم على الكعبة.",
      ],
    },
    encouragements: {
      en: [
        "I was once a slave, but faith made me free. Never underestimate the power of belief.",
        "When they placed rocks upon my chest, I said only: 'Ahad, Ahad' - One, One.",
        "The Prophet ﷺ told me my footsteps in Paradise precede his. Imagine the mercy of Allah!",
        "Every Adhan you hear carries the spirit of that first call from Madinah.",
      ],
      ar: [
        "كنت عبداً ذات يوم، لكن الإيمان جعلني حراً. لا تستهن أبداً بقوة الإيمان.",
        "عندما وضعوا الصخور على صدري، قلت فقط: 'أحد، أحد'.",
        "أخبرني النبي ﷺ أن خطواتي في الجنة تسبق خطواته. تخيل رحمة الله!",
        "كل أذان تسمعه يحمل روح ذلك النداء الأول من المدينة.",
      ],
    },
    farewells: {
      en: [
        "May your prayers rise like the Adhan - pure and reaching the heavens.",
        "Go in peace, and remember: steadfastness is the key to victory.",
        "Until we meet in the gardens of Paradise, InshaAllah.",
      ],
      ar: [
        "لتصعد صلواتك كالأذان - نقية وواصلة إلى السماء.",
        "اذهب بسلام، وتذكر: الثبات هو مفتاح النصر.",
        "حتى نلتقي في جنات الفردوس، إن شاء الله.",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Khadijah bint Khuwaylid - Unlocked after Introduction chapter
  // ─────────────────────────────────────────────────────────────────────────────
  khadijah: {
    id: "khadijah",
    name: {
      en: "Khadijah",
      ar: "خديجة",
    },
    title: {
      en: "Mother of the Believers",
      ar: "أم المؤمنين",
    },
    role: "historical",
    description: {
      en: "Khadijah bint Khuwaylid (RA), the first wife of the Prophet ﷺ and the first person to embrace Islam. A successful businesswoman and pillar of support.",
      ar: "خديجة بنت خويلد رضي الله عنها، الزوجة الأولى للنبي ﷺ وأول من أسلم. سيدة أعمال ناجحة ودعامة دعم.",
    },
    personality: ["supportive", "wise", "courageous", "loving"],
    defaultEmotion: "encouraging",
    patternStyle: "arabesque",
    primaryColor: "#EC4899", // Pink
    secondaryColor: "#F472B6",
    unlockCondition: { type: "chapter_complete", value: "introduction" },
    greetings: {
      en: [
        "Welcome, dear seeker. Faith begins with a single step.",
        "Assalamu Alaikum. Let me tell you about the dawn of Islam.",
        "Come, sit with me. I was there when the first revelation came.",
      ],
      ar: [
        "مرحباً أيها الباحث العزيز. الإيمان يبدأ بخطوة واحدة.",
        "السلام عليكم. دعني أخبرك عن فجر الإسلام.",
        "تعال، اجلس معي. كنت هناك عندما نزل الوحي الأول.",
      ],
    },
    encouragements: {
      en: [
        "When the Prophet ﷺ came trembling from the cave, I wrapped him in my cloak and said: 'Allah will never disgrace you.'",
        "I gave everything I had for this faith - my wealth, my comfort, my life. And I would do it again.",
        "Never doubt yourself. The greatest journeys begin with uncertainty.",
        "Support those around you, as I supported him. Together, we can move mountains.",
      ],
      ar: [
        "عندما جاء النبي ﷺ مرتجفاً من الغار، لففته بعباءتي وقلت: 'والله لا يخزيك الله أبداً.'",
        "أعطيت كل ما أملك لهذا الدين - مالي، راحتي، حياتي. وسأفعلها مرة أخرى.",
        "لا تشك في نفسك أبداً. أعظم الرحلات تبدأ بعدم اليقين.",
        "ادعم من حولك، كما دعمته. معاً، يمكننا تحريك الجبال.",
      ],
    },
    farewells: {
      en: [
        "Go with courage in your heart, as the early Muslims did.",
        "May Allah bless your journey as He blessed mine.",
        "Remember: the first believer was a woman. Never underestimate your potential.",
      ],
      ar: [
        "اذهب بالشجاعة في قلبك، كما فعل المسلمون الأوائل.",
        "بارك الله رحلتك كما بارك رحلتي.",
        "تذكر: أول مؤمنة كانت امرأة. لا تستهن أبداً بإمكانياتك.",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Salman Al-Farisi - Unlocked after completing 15 lessons
  // ─────────────────────────────────────────────────────────────────────────────
  salman: {
    id: "salman",
    name: {
      en: "Salman",
      ar: "سلمان",
    },
    title: {
      en: "The Seeker of Truth",
      ar: "الباحث عن الحق",
    },
    role: "historical",
    description: {
      en: "Salman Al-Farisi (RA), who traveled from Persia seeking the truth, passing through Christianity before finding Islam. A symbol of the universal message.",
      ar: "سلمان الفارسي رضي الله عنه، الذي سافر من بلاد فارس باحثاً عن الحق، مروراً بالمسيحية قبل أن يجد الإسلام. رمز للرسالة العالمية.",
    },
    personality: ["determined", "sincere", "patient", "wise"],
    defaultEmotion: "thinking",
    patternStyle: "geometric",
    primaryColor: "#14B8A6", // Teal
    secondaryColor: "#2DD4BF",
    unlockCondition: { type: "lessons_complete", value: 15 },
    greetings: {
      en: [
        "Assalamu Alaikum, fellow seeker. I too once searched as you do now.",
        "Welcome. My journey spanned continents before I found the truth.",
        "Peace be upon you. Let me share the story of a Persian who found his home.",
      ],
      ar: [
        "السلام عليكم أيها الباحث. أنا أيضاً بحثت كما تبحث الآن.",
        "مرحباً. رحلتي امتدت عبر القارات قبل أن أجد الحق.",
        "السلام عليكم. دعني أشارك قصة فارسي وجد وطنه.",
      ],
    },
    encouragements: {
      en: [
        "I left the luxuries of Persia, was sold into slavery, yet never stopped seeking. Neither should you.",
        "The Prophet ﷺ said: 'Salman is one of us, the People of the House.' Truth has no borders.",
        "When I suggested the trench at Khandaq, the Prophet ﷺ listened. Your ideas matter.",
        "Every hardship I faced was a step closer to truth. Trust your journey.",
      ],
      ar: [
        "تركت ترف بلاد فارس، وبُعت كعبد، لكنني لم أتوقف عن البحث. ولا يجب أن تتوقف أنت.",
        "قال النبي ﷺ: 'سلمان منا أهل البيت.' الحق لا حدود له.",
        "عندما اقترحت الخندق، استمع النبي ﷺ. أفكارك مهمة.",
        "كل مشقة واجهتها كانت خطوة أقرب إلى الحق. ثق برحلتك.",
      ],
    },
    farewells: {
      en: [
        "Continue seeking, and you will find. This is Allah's promise.",
        "May your search be blessed as mine was.",
        "Remember: the truth is worth every sacrifice.",
      ],
      ar: [
        "واصل البحث، وستجد. هذا وعد الله.",
        "لتكن رحلتك مباركة كما كانت رحلتي.",
        "تذكر: الحق يستحق كل تضحية.",
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Abu Bakr As-Siddiq - Unlocked after reaching level 5
  // ─────────────────────────────────────────────────────────────────────────────
  abuBakr: {
    id: "abuBakr",
    name: {
      en: "Abu Bakr",
      ar: "أبو بكر",
    },
    title: {
      en: "The Truthful",
      ar: "الصديق",
    },
    role: "historical",
    description: {
      en: "Abu Bakr As-Siddiq (RA), the closest companion of the Prophet ﷺ, first adult male to embrace Islam, and the first Caliph. Known for his unwavering loyalty and generosity.",
      ar: "أبو بكر الصديق رضي الله عنه، أقرب صحابي للنبي ﷺ، أول رجل بالغ يعتنق الإسلام، والخليفة الأول. معروف بولائه الثابت وكرمه.",
    },
    personality: ["loyal", "generous", "humble", "decisive"],
    defaultEmotion: "encouraging",
    patternStyle: "calligraphy",
    primaryColor: "#6366F1", // Indigo
    secondaryColor: "#818CF8",
    unlockCondition: { type: "level", value: 5 },
    greetings: {
      en: [
        "Assalamu Alaikum. When the Prophet ﷺ spoke, I never doubted. Let me share that certainty with you.",
        "Welcome, friend. Shall I tell you about the cave of Thawr?",
        "Peace be upon you. I was called As-Siddiq because I believed without hesitation.",
      ],
      ar: [
        "السلام عليكم. عندما تحدث النبي ﷺ، لم أشك أبداً. دعني أشارك تلك الثقة معك.",
        "مرحباً يا صديقي. هل أخبرك عن غار ثور؟",
        "السلام عليكم. سُميت الصديق لأنني آمنت بلا تردد.",
      ],
    },
    encouragements: {
      en: [
        "In the cave, when enemies stood at the entrance, I feared. The Prophet ﷺ said: 'Do not grieve, Allah is with us.'",
        "I freed Bilal and many slaves with my wealth. What we give for Allah's sake is never lost.",
        "When they asked 'How can you believe in the night journey?' I said: 'If he said it, it is true.'",
        "Leadership is service. The best of you are those who serve others.",
      ],
      ar: [
        "في الغار، عندما وقف الأعداء عند المدخل، خفت. قال النبي ﷺ: 'لا تحزن إن الله معنا.'",
        "أعتقت بلالاً وكثيراً من العبيد بمالي. ما نعطيه في سبيل الله لا يضيع أبداً.",
        "عندما سألوا 'كيف تؤمن برحلة الإسراء؟' قلت: 'إن قالها، فهي حق.'",
        "القيادة خدمة. خيركم من يخدم الآخرين.",
      ],
    },
    farewells: {
      en: [
        "Go with the certainty of faith in your heart.",
        "May Allah make you steadfast as the companions were.",
        "Remember: true friendship is built on truth and faith.",
      ],
      ar: [
        "اذهب مع يقين الإيمان في قلبك.",
        "جعلك الله ثابتاً كما كان الصحابة.",
        "تذكر: الصداقة الحقيقية تُبنى على الحق والإيمان.",
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get all characters (main + historical)
 */
export function getAllCharacters(): Character[] {
  return [
    ...Object.values(CHARACTERS),
    ...Object.values(HISTORICAL_CHARACTERS),
  ];
}

/**
 * Get a character by ID
 */
export function getCharacter(id: string): Character | undefined {
  return CHARACTERS[id] || HISTORICAL_CHARACTERS[id];
}

/**
 * Get a random phrase from a character
 */
export function getRandomPhrase(
  character: Character,
  type: "greetings" | "encouragements" | "farewells",
  language: "en" | "ar" = "en",
): string {
  const phrases = character[type][language];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Get default character (Yusuf)
 */
export function getDefaultCharacter(): Character {
  return CHARACTERS.yusuf;
}

/**
 * Check if a character should be unlocked based on user progress
 */
export function checkCharacterUnlock(
  character: Character,
  userProgress: {
    completedChapters: string[];
    completedLessons: number;
    currentStreak: number;
    level: number;
  },
): boolean {
  const { unlockCondition } = character;

  switch (unlockCondition.type) {
    case "default":
      return true;
    case "chapter_complete":
      return userProgress.completedChapters.includes(
        unlockCondition.value as string,
      );
    case "lessons_complete":
      return userProgress.completedLessons >= (unlockCondition.value as number);
    case "streak":
      return userProgress.currentStreak >= (unlockCondition.value as number);
    case "level":
      return userProgress.level >= (unlockCondition.value as number);
    default:
      return false;
  }
}

/**
 * Get characters recommended for a specific chapter
 */
export function getCharactersForChapter(chapterId: string): Character[] {
  const recommendations: Record<string, string[]> = {
    introduction: ["yusuf", "khadijah", "khabib"],
    shahada: ["yusuf", "khabib", "khadijah"],
    salah: ["yusuf", "bilal", "khabib"],
    sawm: ["yusuf", "fatima", "khabib"],
    zakat: ["yusuf", "abuBakr", "khabib"],
    hajj: ["yusuf", "salman", "khabib"],
    quran: ["yusuf", "fatima", "khabib"],
    akhlaq: ["fatima", "abuBakr", "khabib"],
    history: ["salman", "bilal", "khadijah", "abuBakr", "khabib"],
  };

  const ids = recommendations[chapterId] || ["yusuf", "khabib"];
  return ids.map((id) => getCharacter(id)).filter(Boolean) as Character[];
}
