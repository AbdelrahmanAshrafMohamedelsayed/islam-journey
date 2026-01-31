// Lesson content system for New Muslim Journey
// Designed for beginners with no prior Islamic knowledge

export interface LessonContent {
  id: string;
  chapterId: string;
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  description?: { en: string; ar: string };
  duration: number; // minutes
  type?: "lesson" | "quiz" | "simulation";
  simulationType?: "wudu" | "salah";
  xpReward: number;
  isQuiz?: boolean; // Alternative way to mark quizzes

  // Content can be either sections array OR simple markdown content
  sections?: LessonSection[];
  content?: { en: string; ar: string };

  // Key takeaways for review
  keyPoints?: { en: string; ar: string }[];

  // Glossary terms used in this lesson
  glossaryTerms?: string[];

  // Quiz questions for this lesson
  quiz?: QuizQuestion[];
}

export interface LessonSection {
  id?: string; // Optional - can be auto-generated
  type:
    | "text"
    | "image"
    | "video"
    | "audio"
    | "animation" // Lottie animations
    | "interactive" // Tap-to-reveal, clickable elements
    | "tip"
    | "warning"
    | "quote"
    | "hadith"
    | "quran";
  content: {
    en: string;
    ar: string;
  };
  // For media sections (video, image, animation, audio)
  mediaUrl?: string;
  mediaAlt?: string;
  posterUrl?: string; // For video thumbnails
  loop?: boolean; // For animations - default true
  // For Quran/Hadith - can be string or bilingual object
  reference?: string | { en: string; ar: string };
  transliteration?: string;
  // For Hadith
  source?: { en: string; ar: string };
  // For interactive sections - array of tap-to-reveal items
  items?: {
    label: { en: string; ar: string };
    detail: { en: string; ar: string };
    icon?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: { en: string; ar: string };
  options: { en: string; ar: string }[];
  correctAnswer: number; // index
  explanation: { en: string; ar: string };
}

// Glossary terms for new Muslims
export const glossaryTerms: Record<
  string,
  { en: string; ar: string; arabicWord: string; pronunciation: string }
> = {
  allah: {
    en: "The Arabic word for God. Muslims believe in one God, the same God worshipped by Jews and Christians.",
    ar: "الكلمة العربية للإله. يؤمن المسلمون بإله واحد، نفس الإله الذي يعبده اليهود والمسيحيون.",
    arabicWord: "الله",
    pronunciation: "Al-lah",
  },
  islam: {
    en: "Means 'submission to God' or 'peace'. It's the name of the religion followed by Muslims.",
    ar: "تعني 'الخضوع لله' أو 'السلام'. وهو اسم الدين الذي يتبعه المسلمون.",
    arabicWord: "الإسلام",
    pronunciation: "Is-lam",
  },
  muslim: {
    en: "A person who follows Islam. It means 'one who submits to God'.",
    ar: "الشخص الذي يتبع الإسلام. تعني 'من يخضع لله'.",
    arabicWord: "مسلم",
    pronunciation: "Mus-lim",
  },
  shahada: {
    en: "The Islamic declaration of faith. It's the first pillar of Islam and what you say to become Muslim.",
    ar: "شهادة الإيمان الإسلامية. هي الركن الأول من أركان الإسلام وما تقوله لتصبح مسلماً.",
    arabicWord: "الشهادة",
    pronunciation: "Sha-ha-da",
  },
  tawheed: {
    en: "The belief in the oneness of God. It's the most fundamental concept in Islam.",
    ar: "الإيمان بوحدانية الله. هو أهم مفهوم في الإسلام.",
    arabicWord: "التوحيد",
    pronunciation: "Taw-heed",
  },
  salah: {
    en: "The ritual prayer performed 5 times daily. It's the second pillar of Islam.",
    ar: "الصلاة التي تُؤدى 5 مرات يومياً. هي الركن الثاني من أركان الإسلام.",
    arabicWord: "الصلاة",
    pronunciation: "Sa-lah",
  },
  wudu: {
    en: "The ritual washing/ablution performed before prayer. It purifies the body and mind.",
    ar: "الوضوء الذي يُؤدى قبل الصلاة. يُطهر الجسم والعقل.",
    arabicWord: "الوضوء",
    pronunciation: "Wu-doo",
  },
  quran: {
    en: "The holy book of Islam, believed to be the literal word of God revealed to Prophet Muhammad ﷺ.",
    ar: "الكتاب المقدس للإسلام، يُعتقد أنه كلام الله الحرفي الذي أُنزل على النبي محمد ﷺ.",
    arabicWord: "القرآن",
    pronunciation: "Qur-an",
  },
  sunnah: {
    en: "The teachings and practices of Prophet Muhammad ﷺ. Muslims follow his example.",
    ar: "تعاليم وممارسات النبي محمد ﷺ. يتبع المسلمون مثاله.",
    arabicWord: "السنة",
    pronunciation: "Sun-nah",
  },
  hadith: {
    en: "A recorded saying or action of Prophet Muhammad ﷺ. Collections of hadith guide Muslim life.",
    ar: "قول أو فعل مسجل للنبي محمد ﷺ. مجموعات الأحاديث توجه حياة المسلم.",
    arabicWord: "الحديث",
    pronunciation: "Ha-deeth",
  },
  zakat: {
    en: "Obligatory charity - giving 2.5% of savings to those in need. It's the third pillar of Islam.",
    ar: "الزكاة الواجبة - إعطاء 2.5% من المدخرات للمحتاجين. هي الركن الثالث من أركان الإسلام.",
    arabicWord: "الزكاة",
    pronunciation: "Za-kat",
  },
  sawm: {
    en: "Fasting during Ramadan from dawn to sunset. It's the fourth pillar of Islam.",
    ar: "الصيام في رمضان من الفجر حتى الغروب. هو الركن الرابع من أركان الإسلام.",
    arabicWord: "الصوم",
    pronunciation: "Sawm",
  },
  hajj: {
    en: "The pilgrimage to Mecca that every able Muslim should make once in their lifetime. It's the fifth pillar.",
    ar: "الحج إلى مكة الذي يجب على كل مسلم قادر أن يؤديه مرة في حياته. هو الركن الخامس.",
    arabicWord: "الحج",
    pronunciation: "Hajj",
  },
  prophet: {
    en: "A messenger chosen by God to guide humanity. Muslims believe in all prophets including Adam, Noah, Abraham, Moses, Jesus, and Muhammad ﷺ.",
    ar: "رسول اختاره الله لهداية البشرية. يؤمن المسلمون بجميع الأنبياء بما فيهم آدم ونوح وإبراهيم وموسى وعيسى ومحمد ﷺ.",
    arabicWord: "نبي",
    pronunciation: "Na-bi",
  },
  pbuh: {
    en: "'Peace be upon him' (ﷺ) - a phrase of respect said after mentioning Prophet Muhammad's name.",
    ar: "'صلى الله عليه وسلم' (ﷺ) - عبارة احترام تُقال بعد ذكر اسم النبي محمد.",
    arabicWord: "ﷺ",
    pronunciation: "Sal-lal-la-hu alay-hi wa-sal-lam",
  },
  dua: {
    en: "Personal prayer or supplication to God. You can make dua anytime, in any language.",
    ar: "دعاء شخصي إلى الله. يمكنك الدعاء في أي وقت وبأي لغة.",
    arabicWord: "الدعاء",
    pronunciation: "Du-aa",
  },
  masjid: {
    en: "A mosque - the place where Muslims gather to pray. Also called a 'house of God'.",
    ar: "المسجد - المكان الذي يجتمع فيه المسلمون للصلاة. يُسمى أيضاً 'بيت الله'.",
    arabicWord: "المسجد",
    pronunciation: "Mas-jid",
  },
  ramadan: {
    en: "The ninth month of the Islamic calendar when Muslims fast from dawn to sunset.",
    ar: "الشهر التاسع من التقويم الإسلامي الذي يصوم فيه المسلمون من الفجر حتى الغروب.",
    arabicWord: "رمضان",
    pronunciation: "Ra-ma-dan",
  },
  mecca: {
    en: "The holiest city in Islam, located in Saudi Arabia. Muslims face Mecca when praying.",
    ar: "أقدس مدينة في الإسلام، تقع في المملكة العربية السعودية. يتجه المسلمون نحو مكة عند الصلاة.",
    arabicWord: "مكة",
    pronunciation: "Mak-ka",
  },
  kaaba: {
    en: "The cube-shaped building in Mecca that Muslims face when praying. It was built by Prophet Abraham.",
    ar: "المبنى المكعب في مكة الذي يتجه إليه المسلمون عند الصلاة. بناه النبي إبراهيم.",
    arabicWord: "الكعبة",
    pronunciation: "Ka-ba",
  },
  halal: {
    en: "Permissible according to Islamic law. Usually refers to food that Muslims can eat.",
    ar: "مباح وفقاً للشريعة الإسلامية. عادة يشير إلى الطعام الذي يمكن للمسلمين تناوله.",
    arabicWord: "حلال",
    pronunciation: "Ha-lal",
  },
  haram: {
    en: "Forbidden according to Islamic law. Things Muslims should avoid.",
    ar: "محرم وفقاً للشريعة الإسلامية. أشياء يجب على المسلمين تجنبها.",
    arabicWord: "حرام",
    pronunciation: "Ha-ram",
  },
  ummah: {
    en: "The global Muslim community. All Muslims are considered brothers and sisters.",
    ar: "المجتمع الإسلامي العالمي. يُعتبر جميع المسلمين إخوة وأخوات.",
    arabicWord: "الأمة",
    pronunciation: "Um-mah",
  },
  iman: {
    en: "Faith or belief. It includes belief in God, angels, books, prophets, the Day of Judgment, and divine decree.",
    ar: "الإيمان أو العقيدة. يشمل الإيمان بالله والملائكة والكتب والرسل واليوم الآخر والقدر.",
    arabicWord: "الإيمان",
    pronunciation: "Ee-man",
  },
  taqwa: {
    en: "God-consciousness or piety. Being aware of God in all your actions.",
    ar: "التقوى أو الورع. أن تكون واعياً بالله في جميع أفعالك.",
    arabicWord: "التقوى",
    pronunciation: "Taq-wa",
  },
};

// Chapter 1: Shahada - Declaration of Faith
export const shahadaLessons: LessonContent[] = [
  {
    id: "shahada-meaning",
    chapterId: "shahada",
    title: { en: "The Meaning of Shahada", ar: "معنى الشهادة" },
    subtitle: {
      en: "Your first step into Islam",
      ar: "خطوتك الأولى في الإسلام",
    },
    duration: 10,
    type: "lesson",
    xpReward: 50,
    glossaryTerms: ["shahada", "allah", "islam", "muslim", "prophet", "pbuh"],
    sections: [
      {
        id: "intro",
        type: "text",
        content: {
          en: "Welcome to the most important lesson in your Islamic journey! The Shahada (شَهَادَة) is the Islamic declaration of faith. It's a simple but powerful statement that opens the door to Islam.",
          ar: "مرحباً بك في أهم درس في رحلتك الإسلامية! الشهادة هي إعلان الإيمان الإسلامي. إنها عبارة بسيطة ولكنها قوية تفتح باب الإسلام.",
        },
      },
      {
        id: "what-is",
        type: "text",
        content: {
          en: "The Shahada is just one sentence, but it carries the entire foundation of Islamic belief. By saying it with sincere belief, you become a Muslim.",
          ar: "الشهادة هي جملة واحدة فقط، لكنها تحمل أساس العقيدة الإسلامية بالكامل. بقولها بإيمان صادق، تصبح مسلماً.",
        },
      },
      {
        id: "arabic-text",
        type: "quote",
        content: {
          en: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ",
          ar: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ",
        },
        transliteration:
          "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah",
      },
      {
        id: "translation",
        type: "text",
        content: {
          en: 'This means: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah."',
          ar: "وهذا يعني: 'أشهد أن لا إله إلا الله، وأشهد أن محمداً رسول الله.'",
        },
      },
      {
        id: "two-parts",
        type: "text",
        content: {
          en: 'The Shahada has two parts:\n\n**Part 1:** "There is no god but Allah" - This means you believe in only ONE God. Not multiple gods, not idols, just the One true Creator of everything.\n\n**Part 2:** "Muhammad is the messenger of Allah" - This means you accept Prophet Muhammad ﷺ as God\'s final messenger who brought the Quran.',
          ar: "الشهادة تتكون من جزأين:\n\n**الجزء الأول:** 'لا إله إلا الله' - هذا يعني أنك تؤمن بإله واحد فقط. ليس آلهة متعددة، ليس أصناماً، فقط الخالق الحقيقي الواحد لكل شيء.\n\n**الجزء الثاني:** 'محمد رسول الله' - هذا يعني أنك تقبل النبي محمد ﷺ كرسول الله الأخير الذي جاء بالقرآن.",
        },
      },
      {
        id: "tip-sincerity",
        type: "tip",
        content: {
          en: "The most important thing is sincerity. You don't need to be perfect or know everything about Islam. Just say the Shahada with genuine belief in your heart, and you're Muslim!",
          ar: "أهم شيء هو الإخلاص. لا تحتاج أن تكون كاملاً أو تعرف كل شيء عن الإسلام. فقط قل الشهادة بإيمان صادق في قلبك، وأنت مسلم!",
        },
      },
      {
        id: "hadith-shahada",
        type: "hadith",
        content: {
          en: '"Islam is built upon five pillars: the testimony that there is no god but Allah and that Muhammad is the Messenger of Allah..."',
          ar: '"بُني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمداً رسول الله..."',
        },
        reference: "Sahih al-Bukhari 8, Sahih Muslim 16",
      },
      {
        id: "why-important",
        type: "text",
        content: {
          en: "The Shahada is the FIRST of the five pillars of Islam. Everything else in Islam builds on this foundation. When you truly understand and believe in the Shahada, the rest of Islam makes sense.",
          ar: "الشهادة هي الركن الأول من أركان الإسلام الخمسة. كل شيء آخر في الإسلام يُبنى على هذا الأساس. عندما تفهم وتؤمن حقاً بالشهادة، يصبح بقية الإسلام منطقياً.",
        },
      },
    ],
    keyPoints: [
      {
        en: "The Shahada is the declaration of faith that makes someone a Muslim",
        ar: "الشهادة هي إعلان الإيمان الذي يجعل شخصاً ما مسلماً",
      },
      {
        en: "It has two parts: belief in One God, and accepting Muhammad ﷺ as His messenger",
        ar: "تتكون من جزأين: الإيمان بإله واحد، وقبول محمد ﷺ كرسوله",
      },
      {
        en: "Sincerity is the most important requirement",
        ar: "الإخلاص هو أهم شرط",
      },
      {
        en: "It's the first and most important pillar of Islam",
        ar: "هي الركن الأول والأهم في الإسلام",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: {
          en: "What does 'Shahada' mean?",
          ar: "ماذا تعني 'الشهادة'؟",
        },
        options: [
          { en: "Prayer", ar: "الصلاة" },
          { en: "Testimony/Declaration of Faith", ar: "الشهادة/إعلان الإيمان" },
          { en: "Fasting", ar: "الصيام" },
          { en: "Charity", ar: "الصدقة" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Shahada means testimony or declaration of faith. It's what you say to declare your belief in Islam.",
          ar: "الشهادة تعني الإقرار أو إعلان الإيمان. هي ما تقوله لإعلان إيمانك بالإسلام.",
        },
      },
      {
        id: "q2",
        question: {
          en: "How many parts does the Shahada have?",
          ar: "كم جزء في الشهادة؟",
        },
        options: [
          { en: "One", ar: "واحد" },
          { en: "Two", ar: "اثنان" },
          { en: "Three", ar: "ثلاثة" },
          { en: "Five", ar: "خمسة" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "The Shahada has two parts: belief in One God (Allah), and acceptance of Muhammad ﷺ as His messenger.",
          ar: "الشهادة تتكون من جزأين: الإيمان بإله واحد (الله)، وقبول محمد ﷺ كرسوله.",
        },
      },
    ],
  },
  {
    id: "shahada-tawheed",
    chapterId: "shahada",
    title: { en: "Understanding Tawheed", ar: "فهم التوحيد" },
    subtitle: { en: "The oneness of God", ar: "وحدانية الله" },
    duration: 15,
    type: "lesson",
    xpReward: 75,
    glossaryTerms: ["tawheed", "allah", "iman", "taqwa"],
    sections: [
      {
        id: "intro",
        type: "text",
        content: {
          en: "Tawheed (توحيد) is the most fundamental concept in Islam. It means the absolute oneness of God. Understanding Tawheed is understanding the heart of Islam.",
          ar: "التوحيد هو المفهوم الأساسي في الإسلام. يعني وحدانية الله المطلقة. فهم التوحيد هو فهم قلب الإسلام.",
        },
      },
      {
        id: "quran-verse",
        type: "quran",
        content: {
          en: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
          ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        },
        reference: "Surah Al-Ikhlas (112:1-4)",
      },
      {
        id: "explanation",
        type: "text",
        content: {
          en: "This short chapter (Surah Al-Ikhlas) is so important that Prophet Muhammad ﷺ said it equals one-third of the Quran! It perfectly summarizes who Allah is:\n\n• **Allah is ONE** - Not two, not three, just one\n• **Allah is Eternal** - He was always there, will always be there\n• **Allah has no family** - No sons, daughters, or parents\n• **Nothing is like Allah** - He is unique, beyond our imagination",
          ar: "هذه السورة القصيرة (سورة الإخلاص) مهمة جداً حتى أن النبي محمد ﷺ قال إنها تعادل ثلث القرآن! تلخص تماماً من هو الله:\n\n• **الله واحد** - ليس اثنين، ليس ثلاثة، فقط واحد\n• **الله أزلي** - كان دائماً هناك، سيكون دائماً هناك\n• **الله ليس له عائلة** - لا أبناء، لا بنات، لا آباء\n• **لا شيء مثل الله** - هو فريد، يفوق خيالنا",
        },
      },
      {
        id: "three-categories",
        type: "text",
        content: {
          en: "Scholars explain Tawheed in three parts:\n\n**1. Tawheed ar-Rububiyyah** (Lordship)\nBelieving that Allah alone is the Creator, Sustainer, and Controller of everything.\n\n**2. Tawheed al-Uluhiyyah** (Worship)\nDirecting all worship to Allah alone - no prayers to anyone else.\n\n**3. Tawheed al-Asma wa Sifat** (Names & Attributes)\nBelieving in Allah's beautiful names and attributes as He described Himself.",
          ar: "يشرح العلماء التوحيد في ثلاثة أجزاء:\n\n**1. توحيد الربوبية**\nالإيمان بأن الله وحده هو الخالق والرازق والمتحكم في كل شيء.\n\n**2. توحيد الألوهية**\nتوجيه كل العبادة لله وحده - لا صلاة لأي أحد غيره.\n\n**3. توحيد الأسماء والصفات**\nالإيمان بأسماء الله الحسنى وصفاته كما وصف نفسه.",
        },
      },
      {
        id: "tip-simplicity",
        type: "tip",
        content: {
          en: "Don't worry if this seems complex! The simple version is: There is ONE God, He created everything, and we worship only Him. That's Tawheed!",
          ar: "لا تقلق إذا بدا هذا معقداً! النسخة البسيطة هي: هناك إله واحد، خلق كل شيء، ونعبده وحده. هذا هو التوحيد!",
        },
      },
      {
        id: "why-matters",
        type: "text",
        content: {
          en: "Tawheed matters because it gives you:\n\n• **Freedom** - You're not slave to money, people, or idols\n• **Peace** - Only One God to please, not many\n• **Purpose** - You know why you exist\n• **Hope** - You have a direct connection to your Creator",
          ar: "التوحيد مهم لأنه يعطيك:\n\n• **الحرية** - أنت لست عبداً للمال أو الناس أو الأصنام\n• **السلام** - إله واحد فقط لترضيه، ليس كثيرين\n• **الهدف** - تعرف لماذا أنت موجود\n• **الأمل** - لديك اتصال مباشر بخالقك",
        },
      },
    ],
    keyPoints: [
      {
        en: "Tawheed means the absolute oneness of God",
        ar: "التوحيد يعني وحدانية الله المطلقة",
      },
      {
        en: "Surah Al-Ikhlas perfectly describes who Allah is",
        ar: "سورة الإخلاص تصف تماماً من هو الله",
      },
      {
        en: "Allah is One, Eternal, has no family, and nothing is like Him",
        ar: "الله واحد، أزلي، ليس له عائلة، ولا شيء مثله",
      },
      {
        en: "Tawheed brings freedom, peace, purpose, and hope",
        ar: "التوحيد يجلب الحرية والسلام والهدف والأمل",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: {
          en: "What does 'Tawheed' mean?",
          ar: "ماذا يعني 'التوحيد'؟",
        },
        options: [
          { en: "The five pillars", ar: "الأركان الخمسة" },
          { en: "The oneness of God", ar: "وحدانية الله" },
          { en: "Prayer times", ar: "أوقات الصلاة" },
          { en: "The holy book", ar: "الكتاب المقدس" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Tawheed means the oneness of God - the belief that there is only one God, Allah.",
          ar: "التوحيد يعني وحدانية الله - الإيمان بأن هناك إله واحد فقط، الله.",
        },
      },
    ],
  },
  {
    id: "shahada-conditions",
    chapterId: "shahada",
    title: { en: "Conditions of Shahada", ar: "شروط الشهادة" },
    subtitle: { en: "Saying it with meaning", ar: "قولها بمعنى" },
    duration: 12,
    type: "lesson",
    xpReward: 60,
    glossaryTerms: ["shahada", "iman", "taqwa"],
    sections: [
      {
        id: "intro",
        type: "text",
        content: {
          en: "Saying the Shahada is simple, but saying it with TRUE meaning is what makes it powerful. Let's learn the seven conditions that make your Shahada complete.",
          ar: "قول الشهادة بسيط، لكن قولها بمعنى حقيقي هو ما يجعلها قوية. دعنا نتعلم الشروط السبعة التي تجعل شهادتك كاملة.",
        },
      },
      {
        id: "conditions-list",
        type: "text",
        content: {
          en: "**The 7 Conditions of Shahada:**\n\n**1. Knowledge (العلم)** - Know what you're saying. You're declaring belief in One God and accepting Muhammad ﷺ as His messenger.\n\n**2. Certainty (اليقين)** - Have no doubt about it. Be sure in your heart.\n\n**3. Acceptance (القبول)** - Accept Islam fully, not partially. You can't pick and choose.\n\n**4. Submission (الانقياد)** - Be willing to follow Islamic teachings, even when it's hard.\n\n**5. Truthfulness (الصدق)** - Mean it sincerely, not just saying words.\n\n**6. Sincerity (الإخلاص)** - Do it for Allah alone, not for people or worldly benefits.\n\n**7. Love (المحبة)** - Love Allah and His messenger more than anything else.",
          ar: "**الشروط السبعة للشهادة:**\n\n**1. العلم** - اعرف ما تقوله. أنت تعلن الإيمان بإله واحد وتقبل محمد ﷺ كرسوله.\n\n**2. اليقين** - لا تشك فيها. كن متأكداً في قلبك.\n\n**3. القبول** - اقبل الإسلام بالكامل، ليس جزئياً. لا يمكنك الاختيار.\n\n**4. الانقياد** - كن مستعداً لاتباع تعاليم الإسلام، حتى عندما يكون صعباً.\n\n**5. الصدق** - اقصدها بإخلاص، ليس مجرد كلمات.\n\n**6. الإخلاص** - افعلها لله وحده، ليس للناس أو المنافع الدنيوية.\n\n**7. المحبة** - أحب الله ورسوله أكثر من أي شيء آخر.",
        },
      },
      {
        id: "warning",
        type: "warning",
        content: {
          en: "Don't be overwhelmed! You don't need to be perfect to say Shahada. These are ideals to strive for. Start where you are, and grow from there.",
          ar: "لا تكن مرهقاً! لا تحتاج أن تكون كاملاً لتقول الشهادة. هذه مُثُل للسعي إليها. ابدأ من حيث أنت، وتطور من هناك.",
        },
      },
      {
        id: "tip-growth",
        type: "tip",
        content: {
          en: "Think of these conditions like seeds you plant. They start small but grow stronger over time as you learn and practice Islam. Every Muslim is always growing!",
          ar: "فكر في هذه الشروط كبذور تزرعها. تبدأ صغيرة لكنها تنمو أقوى مع الوقت كلما تعلمت ومارست الإسلام. كل مسلم ينمو دائماً!",
        },
      },
    ],
    keyPoints: [
      {
        en: "There are 7 conditions: Knowledge, Certainty, Acceptance, Submission, Truthfulness, Sincerity, Love",
        ar: "هناك 7 شروط: العلم، اليقين، القبول، الانقياد، الصدق، الإخلاص، المحبة",
      },
      {
        en: "You don't need to be perfect - these are goals to grow toward",
        ar: "لا تحتاج أن تكون كاملاً - هذه أهداف للنمو نحوها",
      },
      {
        en: "Sincerity (doing it for Allah alone) is the most important",
        ar: "الإخلاص (فعلها لله وحده) هو الأهم",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: {
          en: "How many conditions does the Shahada have?",
          ar: "كم شرط للشهادة؟",
        },
        options: [
          { en: "3", ar: "3" },
          { en: "5", ar: "5" },
          { en: "7", ar: "7" },
          { en: "10", ar: "10" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "The Shahada has 7 conditions: Knowledge, Certainty, Acceptance, Submission, Truthfulness, Sincerity, and Love.",
          ar: "الشهادة لها 7 شروط: العلم، اليقين، القبول، الانقياد، الصدق، الإخلاص، والمحبة.",
        },
      },
    ],
  },
  {
    id: "shahada-prophet",
    chapterId: "shahada",
    title: { en: "Prophet Muhammad ﷺ", ar: "النبي محمد ﷺ" },
    subtitle: { en: "The final messenger", ar: "الرسول الأخير" },
    duration: 20,
    type: "lesson",
    xpReward: 100,
    glossaryTerms: ["prophet", "pbuh", "quran", "sunnah", "hadith", "mecca"],
    sections: [
      {
        id: "intro",
        type: "text",
        content: {
          en: "In the second part of the Shahada, we declare that Muhammad ﷺ is the messenger of Allah. But who was he? Let's learn about the most influential person in human history.",
          ar: "في الجزء الثاني من الشهادة، نعلن أن محمداً ﷺ رسول الله. لكن من كان؟ دعنا نتعلم عن أكثر شخص تأثيراً في تاريخ البشرية.",
        },
      },
      {
        id: "early-life",
        type: "text",
        content: {
          en: "**Early Life:**\n\nMuhammad ﷺ was born in Mecca around 570 CE. He was orphaned young - his father died before his birth, and his mother died when he was 6. He was raised by his grandfather and then his uncle.\n\nEven before prophethood, he was known as 'Al-Amin' (The Trustworthy) and 'As-Sadiq' (The Truthful). People trusted him with their valuables because he never lied or cheated.",
          ar: "**الحياة المبكرة:**\n\nوُلد محمد ﷺ في مكة حوالي 570 م. يتم صغيراً - توفي والده قبل ولادته، وتوفيت أمه عندما كان في السادسة. ربّاه جده ثم عمه.\n\nحتى قبل النبوة، كان معروفاً بـ 'الأمين' و'الصادق'. كان الناس يثقون به بأشيائهم الثمينة لأنه لم يكذب أو يغش أبداً.",
        },
      },
      {
        id: "revelation",
        type: "text",
        content: {
          en: '**The First Revelation:**\n\nAt age 40, while meditating in a cave called Hira, the angel Gabriel (Jibreel) came to him with the first words of the Quran:\n\n"Read in the name of your Lord who created..." (Quran 96:1)\n\nThis was the beginning of 23 years of revelation that would become the Quran.',
          ar: '**الوحي الأول:**\n\nفي سن الأربعين، بينما كان يتعبد في غار يُسمى حراء، جاءه الملك جبريل بأول كلمات القرآن:\n\n"اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ..." (القرآن 96:1)\n\nكانت هذه بداية 23 عاماً من الوحي الذي سيصبح القرآن.',
        },
      },
      {
        id: "quran-character",
        type: "quran",
        content: {
          en: '"And indeed, you are of a great moral character."',
          ar: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
        },
        reference: "Surah Al-Qalam (68:4)",
      },
      {
        id: "his-character",
        type: "text",
        content: {
          en: "**His Character:**\n\nProphet Muhammad ﷺ was known for:\n\n• **Kindness** - He was gentle with children, animals, and even enemies\n• **Humility** - Despite being a leader, he mended his own clothes and helped with housework\n• **Justice** - He treated everyone equally, rich or poor\n• **Forgiveness** - He forgave people who had hurt him badly\n• **Honesty** - He never lied, even when it was difficult",
          ar: "**شخصيته:**\n\nكان النبي محمد ﷺ معروفاً بـ:\n\n• **اللطف** - كان رقيقاً مع الأطفال والحيوانات وحتى الأعداء\n• **التواضع** - رغم كونه قائداً، كان يرقع ثيابه ويساعد في أعمال المنزل\n• **العدل** - كان يعامل الجميع بالتساوي، غنياً أو فقيراً\n• **المغفرة** - سامح الناس الذين أذوه بشدة\n• **الصدق** - لم يكذب أبداً، حتى عندما كان صعباً",
        },
      },
      {
        id: "why-follow",
        type: "text",
        content: {
          en: "**Why Do We Follow Him?**\n\nMuslims follow Prophet Muhammad ﷺ because:\n\n1. Allah commanded us to in the Quran\n2. He showed us HOW to worship Allah correctly\n3. His life is the best example of how to live as a Muslim\n4. He explained and demonstrated the Quran\n\nHis teachings (called 'Sunnah') and sayings (called 'Hadith') guide Muslims in daily life.",
          ar: "**لماذا نتبعه؟**\n\nالمسلمون يتبعون النبي محمد ﷺ لأن:\n\n1. الله أمرنا بذلك في القرآن\n2. أرانا كيف نعبد الله بشكل صحيح\n3. حياته هي أفضل مثال على كيفية العيش كمسلم\n4. شرح وأظهر القرآن\n\nتعاليمه (تُسمى 'السنة') وأقواله (تُسمى 'الحديث') توجه المسلمين في الحياة اليومية.",
        },
      },
      {
        id: "tip-love",
        type: "tip",
        content: {
          en: "The more you learn about Prophet Muhammad ﷺ, the more you'll love him. He truly cared about YOU - yes, you reading this now. He prayed for future generations of Muslims!",
          ar: "كلما تعلمت أكثر عن النبي محمد ﷺ، كلما أحببته أكثر. هو حقاً اهتم بك - نعم، أنت الذي تقرأ هذا الآن. دعا للأجيال القادمة من المسلمين!",
        },
      },
    ],
    keyPoints: [
      {
        en: "Muhammad ﷺ was born in Mecca around 570 CE",
        ar: "وُلد محمد ﷺ في مكة حوالي 570 م",
      },
      {
        en: "He was known for his honesty even before prophethood",
        ar: "كان معروفاً بصدقه حتى قبل النبوة",
      },
      {
        en: "He received the first revelation at age 40",
        ar: "تلقى الوحي الأول في سن الأربعين",
      },
      {
        en: "His character was praised by Allah in the Quran",
        ar: "أثنى الله على شخصيته في القرآن",
      },
      {
        en: "We follow his Sunnah (teachings) and Hadith (sayings)",
        ar: "نتبع سنته (تعاليمه) وحديثه (أقواله)",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: {
          en: "What was Prophet Muhammad ﷺ called before prophethood?",
          ar: "بماذا كان يُلقب النبي محمد ﷺ قبل النبوة؟",
        },
        options: [
          { en: "The Rich", ar: "الغني" },
          { en: "The Trustworthy and Truthful", ar: "الأمين والصادق" },
          { en: "The Warrior", ar: "المحارب" },
          { en: "The King", ar: "الملك" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "He was known as Al-Amin (The Trustworthy) and As-Sadiq (The Truthful) because of his honest character.",
          ar: "كان معروفاً بالأمين والصادق بسبب شخصيته الصادقة.",
        },
      },
      {
        id: "q2",
        question: {
          en: "At what age did Muhammad ﷺ receive the first revelation?",
          ar: "في أي سن تلقى محمد ﷺ الوحي الأول؟",
        },
        options: [
          { en: "20", ar: "20" },
          { en: "30", ar: "30" },
          { en: "40", ar: "40" },
          { en: "50", ar: "50" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Prophet Muhammad ﷺ received the first revelation from Angel Gabriel at the age of 40.",
          ar: "تلقى النبي محمد ﷺ الوحي الأول من الملك جبريل في سن الأربعين.",
        },
      },
    ],
  },
  {
    id: "shahada-quiz",
    chapterId: "shahada",
    title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
    subtitle: { en: "Test your knowledge", ar: "اختبر معلوماتك" },
    duration: 5,
    type: "quiz",
    xpReward: 150,
    glossaryTerms: [],
    sections: [
      {
        id: "intro",
        type: "text",
        content: {
          en: "Congratulations on completing the Shahada chapter! Now let's test what you've learned. Don't worry - you can retake this quiz as many times as you like.",
          ar: "تهانينا على إكمال فصل الشهادة! الآن دعنا نختبر ما تعلمته. لا تقلق - يمكنك إعادة هذا الاختبار كما تشاء.",
        },
      },
    ],
    keyPoints: [],
    quiz: [
      {
        id: "final-q1",
        question: { en: "What is the Shahada?", ar: "ما هي الشهادة؟" },
        options: [
          { en: "The name of a prayer", ar: "اسم صلاة" },
          {
            en: "The Islamic declaration of faith",
            ar: "إعلان الإيمان الإسلامي",
          },
          { en: "A type of fasting", ar: "نوع من الصيام" },
          { en: "A charity organization", ar: "منظمة خيرية" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "The Shahada is the Islamic declaration of faith that makes someone a Muslim.",
          ar: "الشهادة هي إعلان الإيمان الإسلامي الذي يجعل شخصاً ما مسلماً.",
        },
      },
      {
        id: "final-q2",
        question: { en: "What does Tawheed mean?", ar: "ماذا يعني التوحيد؟" },
        options: [
          { en: "Multiple gods", ar: "آلهة متعددة" },
          { en: "The oneness of God", ar: "وحدانية الله" },
          { en: "Prayer position", ar: "وضعية الصلاة" },
          { en: "A month name", ar: "اسم شهر" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Tawheed is the belief in the absolute oneness of God - the most fundamental concept in Islam.",
          ar: "التوحيد هو الإيمان بوحدانية الله المطلقة - أهم مفهوم في الإسلام.",
        },
      },
      {
        id: "final-q3",
        question: {
          en: "Which pillar of Islam is the Shahada?",
          ar: "أي ركن من أركان الإسلام هي الشهادة؟",
        },
        options: [
          { en: "First", ar: "الأول" },
          { en: "Second", ar: "الثاني" },
          { en: "Third", ar: "الثالث" },
          { en: "Fourth", ar: "الرابع" },
        ],
        correctAnswer: 0,
        explanation: {
          en: "The Shahada is the first and most important pillar of Islam.",
          ar: "الشهادة هي الركن الأول والأهم في الإسلام.",
        },
      },
      {
        id: "final-q4",
        question: {
          en: "Who is Muhammad ﷺ according to the Shahada?",
          ar: "من هو محمد ﷺ وفقاً للشهادة؟",
        },
        options: [
          { en: "A god", ar: "إله" },
          { en: "A king", ar: "ملك" },
          { en: "The messenger of Allah", ar: "رسول الله" },
          { en: "An angel", ar: "ملاك" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "The Shahada declares that Muhammad ﷺ is the messenger (prophet) of Allah, not a god.",
          ar: "الشهادة تعلن أن محمد ﷺ هو رسول (نبي) الله، وليس إلهاً.",
        },
      },
      {
        id: "final-q5",
        question: {
          en: "What is the most important requirement for saying Shahada?",
          ar: "ما هو أهم شرط لقول الشهادة؟",
        },
        options: [
          { en: "Knowing Arabic", ar: "معرفة العربية" },
          { en: "Sincerity and belief", ar: "الإخلاص والإيمان" },
          { en: "Being in a mosque", ar: "أن تكون في مسجد" },
          { en: "Having witnesses", ar: "وجود شهود" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "While witnesses are recommended, the most important thing is sincerity - truly believing in your heart.",
          ar: "بينما يُستحب الشهود، الأهم هو الإخلاص - الإيمان الحقيقي في قلبك.",
        },
      },
    ],
  },
];

// Import additional chapter lessons
import { salahLessons } from "./salah-lessons";
import { zakatLessons } from "./zakat-lessons";
import { sawmLessons } from "./sawm-lessons";
import { hajjLessons } from "./hajj-lessons";
import { quranLessons } from "./quran-lessons";
import { akhlaqLessons } from "./akhlaq-lessons";

// Convert lessons objects to arrays
const salahLessonArray = Object.values(salahLessons);
const zakatLessonArray = Object.values(zakatLessons);
const sawmLessonArray = Object.values(sawmLessons);
const hajjLessonArray = Object.values(hajjLessons);
const quranLessonArray = Object.values(quranLessons);
const akhlaqLessonArray = Object.values(akhlaqLessons);

// Export all lessons
export const allLessons: LessonContent[] = [
  ...shahadaLessons,
  ...salahLessonArray,
  ...zakatLessonArray,
  ...sawmLessonArray,
  ...hajjLessonArray,
  ...quranLessonArray,
  ...akhlaqLessonArray,
];

// Helper function to get lesson by ID
export function getLessonById(id: string): LessonContent | undefined {
  return allLessons.find((lesson) => lesson.id === id);
}

// Helper function to get lessons by chapter
export function getLessonsByChapter(chapterId: string): LessonContent[] {
  return allLessons.filter((lesson) => lesson.chapterId === chapterId);
}
