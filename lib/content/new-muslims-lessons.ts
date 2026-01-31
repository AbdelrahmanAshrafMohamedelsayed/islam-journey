import { LessonContent } from "./lessons";

// ====================================
// NEW MUSLIMS CHAPTER - ESSENTIAL GUIDANCE
// Cinematic, Story-driven learning experience
// ====================================

// Scene backgrounds for cinematic transitions
const sceneBackgrounds = {
  protection:
    "https://images.unsplash.com/photo-1564769625657-435cc3f91237?w=1200&q=80", // Shield/protection concept
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80", // Happy family
  heart:
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80", // Heart/love
  light:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80", // Light through darkness
  mosque:
    "https://images.unsplash.com/photo-1564769610726-59cead6a6f65?w=1200&q=80", // Beautiful mosque
  stars:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80", // Night sky
  sunrise:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80", // New beginning
  forgiveness:
    "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1200&q=80", // Peace/serenity
};

export const newMuslimsLessons: Record<string, LessonContent> = {
  "haram-things": {
    id: "haram-things",
    chapterId: "new-muslims",
    title: { en: "What Allah Has Forbidden", ar: "ما حرّمه الله" },
    subtitle: {
      en: "Understanding boundaries for a blessed life",
      ar: "فهم الحدود لحياة مباركة",
    },
    description: {
      en: "Learn about the major prohibitions in Islam and why Allah has protected us from them.",
      ar: "تعلم عن المحرمات الكبرى في الإسلام ولماذا حمانا الله منها.",
    },
    duration: 20,
    xpReward: 100,
    sections: [
      // SCENE 1: The Opening - Cinematic Introduction
      {
        id: "haram-scene-1",
        type: "story",
        content: {
          en: "🎬 CHAPTER ONE: THE SHIELD OF FAITH",
          ar: "🎬 الفصل الأول: درع الإيمان",
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.protection,
          character: "imam",
          mood: "wise",
          animation: "fadeIn",
        },
      },
      {
        id: "haram-intro-video",
        type: "video",
        content: {
          en: "🎬 Understanding Islamic Boundaries",
          ar: "🎬 فهم الحدود الإسلامية",
        },
        mediaUrl: "https://www.youtube.com/watch?v=6eZ5Jnp2CKI",
      },
      {
        id: "haram-intro-image",
        type: "media",
        content: {
          en: "![Shield of Protection](https://images.unsplash.com/photo-1564769625657-435cc3f91237?w=800&q=80)\n\n*Every prohibition in Islam is a shield that protects you from harm...*",
          ar: "![درع الحماية](https://images.unsplash.com/photo-1564769625657-435cc3f91237?w=800&q=80)\n\n*كل تحريم في الإسلام هو درع يحميك من الأذى...*",
        },
      },
      {
        id: "haram-intro",
        type: "narrative",
        content: {
          en: "# 🛡️ Protection, Not Restriction\n\n*Imagine walking through a dark forest at night...*\n\nA loving guide holds a lantern, showing you the safe path. They warn you: \"Don't step there - that's quicksand. Don't touch that - it's poisonous.\"\n\nAre these warnings to make your journey difficult? **No!** They're given out of love, to protect you.\n\n---\n\n**Allah, who created us and knows us better than we know ourselves, is our Ultimate Guide.**\n\nWhen He forbids something, it's not to make life difficult - it's to **PROTECT** us from harm we may not even see.\n\nLet's explore what Allah has protected us from...",
          ar: '# 🛡️ حماية، وليس قيود\n\n*تخيل أنك تمشي في غابة مظلمة في الليل...*\n\nدليل محب يحمل فانوسًا، يريك الطريق الآمن. يحذرك: "لا تخطو هناك - تلك رمال متحركة. لا تلمس ذلك - إنه سام."\n\nهل هذه التحذيرات لتجعل رحلتك صعبة؟ **لا!** إنها من المحبة، لحمايتك.\n\n---\n\n**الله، الذي خلقنا ويعرفنا أفضل مما نعرف أنفسنا، هو دليلنا الأعظم.**\n\nعندما يحرم شيئًا، ليس ليجعل الحياة صعبة - بل **ليحمينا** من ضرر قد لا نراه.\n\nدعونا نستكشف ما حمانا الله منه...',
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.light,
          animation: "slideUp",
        },
      },
      // SCENE 2: Major Sins Introduction
      {
        id: "haram-scene-2",
        type: "story",
        content: {
          en: "🎬 SCENE TWO: THE SEVEN SHIELDS",
          ar: "🎬 المشهد الثاني: الدروع السبعة",
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.mosque,
          animation: "cinematic",
        },
      },
      {
        id: "haram-major-sins-title",
        type: "narrative",
        content: {
          en: "## ⚠️ The Major Prohibitions\n\n*Each one is a shield protecting something precious...*\n\n| Shield | Protects |\n|--------|----------|\n| 🛡️ Shield of Chastity | Family & Honor |\n| 🛡️ Shield of Sobriety | Mind & Health |\n| 🛡️ Shield of Trust | Wealth & Relationships |\n| 🛡️ Shield of Truth | Trust & Character |\n| 🛡️ Shield of Brotherhood | Community & Unity |\n| 🛡️ Shield of Modesty | Dignity & Heart |\n| 🛡️ Shield of Life | Humanity |\n\nLet's explore each shield...",
          ar: "## ⚠️ المحرمات الكبرى\n\n*كل واحدة درع يحمي شيئًا ثمينًا...*\n\n| الدرع | يحمي |\n|--------|----------|\n| 🛡️ درع العفة | الأسرة والشرف |\n| 🛡️ درع الصحو | العقل والصحة |\n| 🛡️ درع الأمانة | المال والعلاقات |\n| 🛡️ درع الصدق | الثقة والأخلاق |\n| 🛡️ درع الأخوة | المجتمع والوحدة |\n| 🛡️ درع الحياء | الكرامة والقلب |\n| 🛡️ درع الحياة | الإنسانية |\n\nدعونا نستكشف كل درع...",
        },
        storyConfig: {
          animation: "slideLeft",
        },
      },
      {
        id: "haram-zina-image",
        type: "media",
        content: {
          en: "![Family Protection](https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80)",
          ar: "![حماية الأسرة](https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80)",
        },
      },
      {
        id: "haram-zina",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #1: Zina (زنا) - The Shield of Chastity\n\n**What it forbids:** Sexual relations outside of marriage.\n\n**What it PROTECTS:**\n\n🏠 **Families** - Children deserve to know their parents\n\n💔 **Hearts** - Prevents emotional devastation\n\n🏥 **Bodies** - Protects from diseases\n\n👑 **Honor** - Preserves dignity and respect\n\n*Islam doesn't forbid love - it channels it into the beautiful bond of marriage, where it flourishes with Allah's blessing.*",
          ar: "### 🛡️ الدرع #1: الزنا - درع العفة\n\n**ما يحرمه:** العلاقات الجنسية خارج الزواج.\n\n**ما يحميه:**\n\n🏠 **العائلات** - الأطفال يستحقون معرفة والديهم\n\n💔 **القلوب** - يمنع الدمار العاطفي\n\n🏥 **الأجسام** - يحمي من الأمراض\n\n👑 **الشرف** - يحفظ الكرامة والاحترام\n\n*الإسلام لا يحرم الحب - بل يوجهه إلى رابطة الزواج الجميلة، حيث يزدهر ببركة الله.*",
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.family,
          character: "mentor",
          mood: "caring",
        },
      },
      {
        id: "haram-zina-quran",
        type: "quran",
        content: {
          en: "وَلَا تَقْرَبُوا الزِّنَا ۖ إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا",
          ar: "وَلَا تَقْرَبُوا الزِّنَا ۖ إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا",
        },
        reference: { en: "Quran 17:32", ar: "سورة الإسراء ١٧:٣٢" },
        transliteration:
          "And do not approach unlawful sexual intercourse. Indeed, it is ever an immorality and is evil as a way.",
      },
      {
        id: "haram-alcohol",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #2: Khamr (خمر) - The Shield of Sobriety\n\n**What it forbids:** Alcohol and all intoxicants.\n\n**What it PROTECTS:**\n\n🧠 **Your Mind** - Allah's greatest gift to you\n\n💼 **Your Career** - Clear thinking = better decisions\n\n👨‍👩‍👧‍👦 **Your Family** - Alcohol destroys homes\n\n💰 **Your Wealth** - Addiction drains finances\n\n🕌 **Your Connection to Allah** - Can't pray while intoxicated\n\n*The first thing alcohol takes is your judgment - then you can't even see what else it's taking.*",
          ar: "### 🛡️ الدرع #2: الخمر - درع الصحو\n\n**ما يحرمه:** الكحول وكل المسكرات.\n\n**ما يحميه:**\n\n🧠 **عقلك** - أعظم هبة من الله لك\n\n💼 **عملك** - التفكير الصافي = قرارات أفضل\n\n👨‍👩‍👧‍👦 **عائلتك** - الكحول يدمر البيوت\n\n💰 **مالك** - الإدمان يستنزف المال\n\n🕌 **صلتك بالله** - لا تستطيع الصلاة وأنت سكران\n\n*أول شيء يأخذه الكحول هو حكمك - ثم لا تستطيع حتى رؤية ما يأخذه أيضًا.*",
        },
        storyConfig: {
          character: "scholar",
          mood: "serious",
        },
      },
      {
        id: "haram-alcohol-quran",
        type: "quran",
        content: {
          en: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ لَعَلَّكُمْ تُفْلِحُونَ",
          ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ لَعَلَّكُمْ تُفْلِحُونَ",
        },
        reference: { en: "Quran 5:90", ar: "سورة المائدة ٥:٩٠" },
        transliteration:
          "O you who believe! Intoxicants, gambling, idols, and divining arrows are an abomination of Satan's doing: avoid them that you may prosper.",
      },
      {
        id: "haram-gambling",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #3: Maysir (ميسر) - The Shield of Trust\n\n**What it forbids:** Gambling and games of chance with money.\n\n**What it PROTECTS:**\n\n💵 **Your Wealth** - Earned through honest work\n\n🤝 **Relationships** - Gambling breeds enmity\n\n🧘 **Peace of Mind** - No anxiety over losses\n\n👨‍👩‍👧 **Families** - Savings stay safe\n\n*Islam teaches that wealth should come through honest effort, not luck. Work is worship.*",
          ar: "### 🛡️ الدرع #3: الميسر - درع الأمانة\n\n**ما يحرمه:** القمار وألعاب الحظ بالمال.\n\n**ما يحميه:**\n\n💵 **مالك** - مكتسب بعمل شريف\n\n🤝 **علاقاتك** - القمار يولد العداوة\n\n🧘 **راحة بالك** - لا قلق من الخسائر\n\n👨‍👩‍👧 **عائلتك** - المدخرات تبقى آمنة\n\n*الإسلام يعلم أن المال يجب أن يأتي بالجهد الشريف، لا الحظ. العمل عبادة.*",
        },
      },
      {
        id: "haram-lying",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #4: Al-Kidhb (الكذب) - The Shield of Truth\n\n**What it forbids:** Lying and deception.\n\n**What it PROTECTS:**\n\n🤝 **Trust** - The foundation of all relationships\n\n💎 **Your Character** - Integrity is priceless\n\n🏛️ **Society** - Civilizations are built on trust\n\n*A single lie requires more lies to cover it. Truth, though sometimes hard, sets you free.*",
          ar: "### 🛡️ الدرع #4: الكذب - درع الصدق\n\n**ما يحرمه:** الكذب والخداع.\n\n**ما يحميه:**\n\n🤝 **الثقة** - أساس كل العلاقات\n\n💎 **أخلاقك** - النزاهة لا تقدر بثمن\n\n🏛️ **المجتمع** - الحضارات تُبنى على الثقة\n\n*كذبة واحدة تتطلب المزيد من الكذب لتغطيتها. الصدق، وإن كان صعبًا أحيانًا، يحررك.*",
        },
      },
      {
        id: "haram-lying-hadith",
        type: "hadith",
        content: {
          en: '"Truthfulness leads to righteousness, and righteousness leads to Paradise. A person keeps telling the truth until he is recorded with Allah as truthful. Lying leads to wickedness, and wickedness leads to the Fire. A person keeps lying until he is recorded with Allah as a liar."',
          ar: '"إن الصدق يهدي إلى البر، وإن البر يهدي إلى الجنة، وإن الرجل ليصدق حتى يكتب عند الله صديقاً، وإن الكذب يهدي إلى الفجور، وإن الفجور يهدي إلى النار، وإن الرجل ليكذب حتى يكتب عند الله كذاباً."',
        },
        source: {
          en: "Prophet Muhammad ﷺ (Bukhari & Muslim)",
          ar: "النبي محمد ﷺ (البخاري ومسلم)",
        },
      },
      {
        id: "haram-gheebah",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #5: Al-Gheebah (الغيبة) - The Shield of Brotherhood\n\n**What it forbids:** Backbiting - speaking about someone in their absence in a way they'd dislike (even if TRUE!).\n\n**What it PROTECTS:**\n\n🤝 **Community Bonds** - Unity is strength\n\n💔 **Hearts** - Words wound deeply\n\n🕊️ **Peace** - No suspicion or hatred\n\n*The Quran uses a powerful image: backbiting is like eating the flesh of your dead brother!*",
          ar: "### 🛡️ الدرع #5: الغيبة - درع الأخوة\n\n**ما يحرمه:** الغيبة - التحدث عن شخص في غيابه بما يكرهه (حتى لو كان صحيحًا!).\n\n**ما يحميه:**\n\n🤝 **روابط المجتمع** - الوحدة قوة\n\n💔 **القلوب** - الكلمات تجرح بعمق\n\n🕊️ **السلام** - لا شك ولا كراهية\n\n*القرآن يستخدم صورة قوية: الغيبة كأكل لحم أخيك ميتًا!*",
        },
        storyConfig: {
          character: "companion",
          mood: "thoughtful",
        },
      },
      {
        id: "haram-gheebah-quran",
        type: "quran",
        content: {
          en: "وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ",
          ar: "وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ",
        },
        reference: { en: "Quran 49:12", ar: "سورة الحجرات ٤٩:١٢" },
        transliteration:
          "And do not backbite one another. Would one of you like to eat the flesh of his dead brother? You would hate it. And fear Allah; indeed, Allah is Accepting of repentance and Merciful.",
      },
      {
        id: "haram-gaze",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #6: Lowering the Gaze - The Shield of Modesty\n\n**What it requires:** Avoiding looking at what Allah has forbidden.\n\n**What it PROTECTS:**\n\n💖 **Your Heart** - What enters through eyes reaches the heart\n\n🧠 **Your Mind** - No obsessive thoughts\n\n💑 **Your Future Marriage** - Eyes trained for your spouse\n\n*The first glance is forgiven - it's accidental. The second is a choice. Guard your eyes to guard your heart.*",
          ar: "### 🛡️ الدرع #6: غض البصر - درع الحياء\n\n**ما يتطلبه:** تجنب النظر إلى ما حرمه الله.\n\n**ما يحميه:**\n\n💖 **قلبك** - ما يدخل من العين يصل القلب\n\n🧠 **عقلك** - لا أفكار وسواسية\n\n💑 **زواجك المستقبلي** - عيون مدربة لزوجك\n\n*النظرة الأولى مغفورة - عرضية. الثانية اختيار. احفظ عينيك لتحفظ قلبك.*",
        },
      },
      {
        id: "haram-gaze-quran",
        type: "quran",
        content: {
          en: "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ",
          ar: "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ",
        },
        reference: { en: "Quran 24:30", ar: "سورة النور ٢٤:٣٠" },
        transliteration:
          "Tell the believing men to lower their gaze and guard their chastity. That is purer for them.",
      },
      {
        id: "haram-murder",
        type: "narrative",
        content: {
          en: "### 🛡️ Shield #7: Murder (القتل) - The Shield of Life\n\n**What it forbids:** Taking an innocent life.\n\n**What it PROTECTS:**\n\n🌍 **All of Humanity** - One life = all of mankind\n\n⚖️ **Justice** - Only Allah gives and takes life\n\n🕊️ **Peace** - Prevents cycles of revenge\n\n*Islam values life so highly that saving one person is like saving all of humanity.*",
          ar: "### 🛡️ الدرع #7: القتل - درع الحياة\n\n**ما يحرمه:** أخذ حياة بريئة.\n\n**ما يحميه:**\n\n🌍 **كل البشرية** - حياة واحدة = كل البشر\n\n⚖️ **العدل** - الله وحده يعطي ويأخذ الحياة\n\n🕊️ **السلام** - يمنع دورات الانتقام\n\n*الإسلام يقدر الحياة لدرجة أن إنقاذ شخص واحد كإنقاذ البشرية جمعاء.*",
        },
      },
      {
        id: "haram-murder-quran",
        type: "quran",
        content: {
          en: "مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا",
          ar: "مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا",
        },
        reference: { en: "Quran 5:32", ar: "سورة المائدة ٥:٣٢" },
        transliteration:
          "Whoever kills a soul unless for a soul or for corruption in the land - it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely.",
      },
      // SCENE 3: Hope and Forgiveness
      {
        id: "haram-scene-3",
        type: "story",
        content: {
          en: "🎬 FINAL SCENE: THE DOOR THAT NEVER CLOSES",
          ar: "🎬 المشهد الأخير: الباب الذي لا يُغلق",
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.sunrise,
          animation: "cinematic",
        },
      },
      {
        id: "haram-hope-image",
        type: "media",
        content: {
          en: "![New Beginning](https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80)\n\n*Every sunrise is a reminder: You can always start again...*",
          ar: "![بداية جديدة](https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80)\n\n*كل شروق شمس تذكير: يمكنك دائمًا البدء من جديد...*",
        },
      },
      {
        id: "haram-hope",
        type: "narrative",
        content: {
          en: "## 🌟 The Door of Repentance is ALWAYS Open\n\n**If you've done any of these things in the past - don't despair!**\n\n✨ When you became Muslim, **ALL your previous sins were forgiven** - you were born anew.\n\n✨ For any future mistakes, Allah's mercy is greater than any sin.\n\n✨ **Struggling against sin is itself rewarded** - the battle is the victory.\n\nAllah loves those who repent. He's not waiting to punish - He's waiting to forgive.",
          ar: "## 🌟 باب التوبة مفتوح دائمًا\n\n**إذا فعلت أيًا من هذه الأشياء في الماضي - لا تيأس!**\n\n✨ عندما أصبحت مسلمًا، **غُفرت جميع ذنوبك السابقة** - ولدت من جديد.\n\n✨ لأي أخطاء مستقبلية، رحمة الله أعظم من أي ذنب.\n\n✨ **مجاهدة الذنب بحد ذاتها مثابة** - المعركة هي الانتصار.\n\nالله يحب التوابين. هو لا ينتظر ليعاقب - بل ينتظر ليغفر.",
        },
        storyConfig: {
          backgroundImage: sceneBackgrounds.forgiveness,
          character: "mentor",
          mood: "hopeful",
          animation: "glow",
        },
      },
      {
        id: "haram-forgiveness-quran",
        type: "quran",
        content: {
          en: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
          ar: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
        },
        reference: { en: "Quran 39:53", ar: "سورة الزمر ٣٩:٥٣" },
        transliteration:
          "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
      },
      {
        id: "haram-conclusion",
        type: "tip",
        content: {
          en: '**🎯 Your Takeaways:**\n\n✅ Every prohibition is a **shield of protection**, not a restriction\n\n✅ Allah wants to **guide you to success**, not trip you up\n\n✅ Struggling against temptation is **itself a form of worship**\n\n✅ The door of repentance **never closes** - Allah loves to forgive\n\n✅ Progress over perfection - **one step at a time**\n\n---\n\n*"Indeed, with hardship comes ease."* — Quran 94:6\n\n🤲 **Du\'a:** "O Allah, help me to remember You, thank You, and worship You properly."',
          ar: '**🎯 خلاصاتك:**\n\n✅ كل تحريم هو **درع حماية**، وليس قيد\n\n✅ الله يريد أن **يرشدك للنجاح**، لا أن يعثرك\n\n✅ مجاهدة الإغراء **بحد ذاتها عبادة**\n\n✅ باب التوبة **لا يُغلق أبدًا** - الله يحب أن يغفر\n\n✅ التقدم فوق الكمال - **خطوة بخطوة**\n\n---\n\n*"إِنَّ مَعَ الْعُسْرِ يُسْرًا"* — القرآن ٩٤:٦\n\n🤲 **دعاء:** "اللهم أعني على ذكرك وشكرك وحسن عبادتك."',
        },
      },
    ],
    keyPoints: [
      {
        en: "Allah forbids things to protect us, not to make life difficult",
        ar: "الله يحرم الأشياء ليحمينا، لا ليجعل الحياة صعبة",
      },
      {
        en: "Major sins include: Zina, alcohol, gambling, lying, backbiting, and murder",
        ar: "الكبائر تشمل: الزنا، الخمر، القمار، الكذب، الغيبة، والقتل",
      },
      {
        en: "Lowering the gaze and modest dress protect our hearts and dignity",
        ar: "غض البصر واللباس المحتشم يحميان قلوبنا وكرامتنا",
      },
      {
        en: "The door of repentance is always open - Allah forgives all sins for those who sincerely repent",
        ar: "باب التوبة مفتوح دائمًا - الله يغفر جميع الذنوب لمن تاب توبة صادقة",
      },
    ],
    quiz: [
      {
        id: "haram-q1",
        question: {
          en: "Why does Allah forbid certain things?",
          ar: "لماذا يحرم الله أشياء معينة؟",
        },
        options: [
          { en: "To make life difficult", ar: "ليجعل الحياة صعبة" },
          { en: "To protect us from harm", ar: "ليحمينا من الضرر" },
          { en: "To test our patience only", ar: "لاختبار صبرنا فقط" },
          { en: "For no reason", ar: "بدون سبب" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Allah forbids things to protect us, like a loving parent protecting their child from danger. Every prohibition has wisdom behind it.",
          ar: "الله يحرم الأشياء ليحمينا، مثل الأب المحب الذي يحمي طفله من الخطر. كل تحريم له حكمة وراءه.",
        },
      },
      {
        id: "haram-q2",
        question: {
          en: "What does backbiting (gheebah) mean?",
          ar: "ماذا تعني الغيبة؟",
        },
        options: [
          { en: "Lying about someone", ar: "الكذب على شخص" },
          {
            en: "Speaking truth about someone in their absence that they would dislike",
            ar: "قول الحق عن شخص في غيابه مما يكرهه",
          },
          { en: "Praising someone", ar: "مدح شخص" },
          { en: "Asking about someone", ar: "السؤال عن شخص" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Backbiting is speaking about someone behind their back in a way they would dislike - even if what you're saying is TRUE. The Prophet ﷺ clarified this.",
          ar: "الغيبة هي التحدث عن شخص في غيابه بطريقة يكرهها - حتى لو كان ما تقوله صحيحًا. النبي ﷺ أوضح هذا.",
        },
      },
      {
        id: "haram-q3",
        question: {
          en: "According to Quran 39:53, what should we NOT do regarding Allah's mercy?",
          ar: "وفقًا لسورة الزمر ٣٩:٥٣، ماذا يجب ألا نفعل بشأن رحمة الله؟",
        },
        options: [
          { en: "Ask for it", ar: "نطلبها" },
          { en: "Despair of it", ar: "نيأس منها" },
          { en: "Hope for it", ar: "نرجوها" },
          { en: "Remember it", ar: "نتذكرها" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Allah says: 'Do not despair of the mercy of Allah. Indeed, Allah forgives all sins.' No matter what we've done, the door of repentance is always open.",
          ar: "يقول الله: 'لا تقنطوا من رحمة الله. إن الله يغفر الذنوب جميعًا.' مهما فعلنا، باب التوبة مفتوح دائمًا.",
        },
      },
    ],
  },
};

// Export function to get lesson by ID
export function getNewMuslimsLessonById(id: string): LessonContent | undefined {
  return newMuslimsLessons[id];
}

// Export all lesson IDs
export const newMuslimsLessonIds = Object.keys(newMuslimsLessons);
