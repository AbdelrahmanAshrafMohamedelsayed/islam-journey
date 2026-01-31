import { LessonContent } from "./lessons";

// ====================================
// NEW MUSLIMS CHAPTER - ESSENTIAL GUIDANCE
// ====================================

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
        id: "haram-intro",
        type: "text",
        content: {
          en: "# 🛡️ Protection, Not Restriction\n\nAs a new Muslim, you might hear about things that are \"haram\" (forbidden). But here's a beautiful perspective:\n\n**Allah doesn't forbid things to make life difficult - He forbids things to PROTECT us.**\n\nImagine a loving parent telling their child not to touch fire. The child might not understand why, but the parent knows the danger. Similarly, Allah, who created us and knows us better than we know ourselves, guides us away from harm.\n\nLet's explore what Allah has protected us from, and understand the wisdom behind each...",
          ar: "# 🛡️ حماية، وليس قيود\n\nكمسلم جديد، قد تسمع عن أشياء \"حرام\" (محرمة). لكن هنا منظور جميل:\n\n**الله لا يحرم الأشياء ليجعل الحياة صعبة - بل يحرمها ليحمينا.**\n\nتخيل أبًا محبًا يقول لطفله ألا يلمس النار. قد لا يفهم الطفل لماذا، لكن الأب يعرف الخطر. وبالمثل، الله الذي خلقنا ويعرفنا أفضل مما نعرف أنفسنا، يرشدنا بعيدًا عن الضرر.\n\nدعونا نستكشف ما حمانا الله منه، ونفهم الحكمة وراء كل...",
        },
      },
      {
        id: "haram-major-sins-title",
        type: "text",
        content: {
          en: "---\n\n## ⚠️ The Major Prohibitions\n\nThese are the things Allah has clearly forbidden. Understanding why helps us appreciate His wisdom:",
          ar: "---\n\n## ⚠️ المحرمات الكبرى\n\nهذه هي الأشياء التي حرمها الله بوضوح. فهم السبب يساعدنا على تقدير حكمته:",
        },
      },
      {
        id: "haram-zina",
        type: "text",
        content: {
          en: "### 🚫 1. Zina (زنا) - Unlawful Relations\n\n**What is it?** Sexual relations outside of marriage.\n\n**Why is it forbidden?**\n- Protects family structure and children's rights\n- Prevents diseases and emotional trauma\n- Honors human dignity and relationships\n- Creates stable societies",
          ar: "### 🚫 1. الزنا - العلاقات غير الشرعية\n\n**ما هي؟** العلاقات الجنسية خارج الزواج.\n\n**لماذا محرمة؟**\n- تحمي بنية الأسرة وحقوق الأطفال\n- تمنع الأمراض والصدمات العاطفية\n- تكرم كرامة الإنسان والعلاقات\n- تخلق مجتمعات مستقرة",
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
        transliteration: "And do not approach unlawful sexual intercourse. Indeed, it is ever an immorality and is evil as a way.",
      },
      {
        id: "haram-alcohol",
        type: "text",
        content: {
          en: "### 🍷 2. Khamr (خمر) - Intoxicants & Alcohol\n\n**What is it?** Alcohol and all substances that intoxicate the mind.\n\n**Why is it forbidden?**\n- Clouds judgment and leads to other sins\n- Destroys families and careers\n- Causes health problems (liver disease, addiction)\n- Wastes money that could help others\n- Disconnects us from Allah during prayer",
          ar: "### 🍷 2. الخمر - المسكرات والكحول\n\n**ما هي؟** الكحول وكل المواد التي تسكر العقل.\n\n**لماذا محرمة؟**\n- تضبب الحكم وتؤدي إلى ذنوب أخرى\n- تدمر العائلات والوظائف\n- تسبب مشاكل صحية (أمراض الكبد، الإدمان)\n- تهدر المال الذي يمكن أن يساعد الآخرين\n- تفصلنا عن الله أثناء الصلاة",
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
        transliteration: "O you who believe! Intoxicants, gambling, idols, and divining arrows are an abomination of Satan's doing: avoid them that you may prosper.",
      },
      {
        id: "haram-gambling",
        type: "text",
        content: {
          en: "### 🎰 3. Maysir (ميسر) - Gambling\n\n**What is it?** Any game of chance where money is at stake.\n\n**Why is it forbidden?**\n- Creates addiction and financial ruin\n- Breeds hatred between people when one wins and another loses\n- Based on luck, not honest work\n- Destroys families when savings are gambled away\n- Takes away trust (amanah) from society",
          ar: "### 🎰 3. الميسر - القمار\n\n**ما هو؟** أي لعبة حظ يكون المال فيها على المحك.\n\n**لماذا محرم؟**\n- يخلق الإدمان والخراب المالي\n- يولد الكراهية بين الناس عندما يفوز أحد ويخسر آخر\n- يعتمد على الحظ، وليس العمل الشريف\n- يدمر العائلات عندما تُقامر المدخرات\n- يأخذ الأمانة من المجتمع",
        },
      },
      {
        id: "haram-lying",
        type: "text",
        content: {
          en: "### 🤥 4. Al-Kidhb (الكذب) - Lying\n\n**What is it?** Saying what is not true, deceiving others.\n\n**Why is it forbidden?**\n- Destroys trust in relationships\n- One lie leads to more lies\n- Creates a society where no one can be trusted\n- The Prophet ﷺ said lying leads to wickedness, and wickedness leads to the Fire",
          ar: "### 🤥 4. الكذب\n\n**ما هو؟** قول ما ليس بحق، خداع الآخرين.\n\n**لماذا محرم؟**\n- يدمر الثقة في العلاقات\n- كذبة واحدة تؤدي إلى المزيد من الكذب\n- يخلق مجتمعًا لا يمكن الوثوق فيه بأحد\n- قال النبي ﷺ أن الكذب يهدي إلى الفجور، والفجور يهدي إلى النار",
        },
      },
      {
        id: "haram-lying-hadith",
        type: "hadith",
        content: {
          en: "\"Truthfulness leads to righteousness, and righteousness leads to Paradise. A person keeps telling the truth until he is recorded with Allah as truthful. Lying leads to wickedness, and wickedness leads to the Fire. A person keeps lying until he is recorded with Allah as a liar.\"",
          ar: "\"إن الصدق يهدي إلى البر، وإن البر يهدي إلى الجنة، وإن الرجل ليصدق حتى يكتب عند الله صديقاً، وإن الكذب يهدي إلى الفجور، وإن الفجور يهدي إلى النار، وإن الرجل ليكذب حتى يكتب عند الله كذاباً.\"",
        },
        source: {
          en: "Prophet Muhammad ﷺ (Bukhari & Muslim)",
          ar: "النبي محمد ﷺ (البخاري ومسلم)",
        },
      },
      {
        id: "haram-gheebah",
        type: "text",
        content: {
          en: "### 🗣️ 5. Al-Gheebah (الغيبة) - Backbiting\n\n**What is it?** Speaking about someone behind their back in a way they would dislike - even if it's TRUE!\n\n**Why is it forbidden?**\n- Destroys community bonds and trust\n- Hurts people who cannot defend themselves\n- Creates suspicion and hatred\n- The Quran compares it to eating the flesh of your dead brother!",
          ar: "### 🗣️ 5. الغيبة\n\n**ما هي؟** التحدث عن شخص في غيابه بطريقة لا يحبها - حتى لو كان صحيحًا!\n\n**لماذا محرمة؟**\n- تدمر روابط المجتمع والثقة\n- تؤذي أشخاصًا لا يستطيعون الدفاع عن أنفسهم\n- تخلق الشك والكراهية\n- القرآن يشبهها بأكل لحم أخيك ميتًا!",
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
        transliteration: "And do not backbite one another. Would one of you like to eat the flesh of his dead brother? You would hate it. And fear Allah; indeed, Allah is Accepting of repentance and Merciful.",
      },
      {
        id: "haram-gaze",
        type: "text",
        content: {
          en: "### 👁️ 6. Lowering the Gaze\n\n**What is it?** Avoiding looking at what Allah has forbidden - inappropriate images, the opposite gender with desire.\n\n**Why is it commanded?**\n- Protects the heart from temptation\n- First glance is forgiven, but looking again is a choice\n- Looking leads to thinking, thinking leads to action\n- Preserves modesty and respect",
          ar: "### 👁️ 6. غض البصر\n\n**ما هو؟** تجنب النظر إلى ما حرمه الله - الصور غير اللائقة، الجنس الآخر بشهوة.\n\n**لماذا مأمور به؟**\n- يحمي القلب من الفتنة\n- النظرة الأولى مغفورة، لكن النظر مرة أخرى اختيار\n- النظر يؤدي إلى التفكير، والتفكير يؤدي إلى الفعل\n- يحفظ الحياء والاحترام",
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
        transliteration: "Tell the believing men to lower their gaze and guard their chastity. That is purer for them.",
      },
      {
        id: "haram-hijab",
        type: "text",
        content: {
          en: "### 👳‍♀️ 7. Hijab - Modesty in Dress\n\n**What is it?** For women, covering the body except face and hands. For men, covering from navel to knee and dressing modestly.\n\n**Why is it commanded?**\n- Identity as a Muslim\n- Protection from unwanted attention\n- Judged by character, not appearance\n- Obedience to Allah's command\n- Dignity and self-respect",
          ar: "### 👳‍♀️ 7. الحجاب - الاحتشام في اللباس\n\n**ما هو؟** للنساء، تغطية الجسم ما عدا الوجه والكفين. للرجال، التغطية من السرة إلى الركبة واللباس المحتشم.\n\n**لماذا مأمور به؟**\n- هوية كمسلم\n- حماية من الانتباه غير المرغوب فيه\n- الحكم بالأخلاق، وليس المظهر\n- طاعة لأمر الله\n- الكرامة واحترام الذات",
        },
      },
      {
        id: "haram-hijab-quran",
        type: "quran",
        content: {
          en: "يَا أَيُّهَا النَّبِيُّ قُل لِّأَزْوَاجِكَ وَبَنَاتِكَ وَنِسَاءِ الْمُؤْمِنِينَ يُدْنِينَ عَلَيْهِنَّ مِن جَلَابِيبِهِنَّ ۚ ذَٰلِكَ أَدْنَىٰ أَن يُعْرَفْنَ فَلَا يُؤْذَيْنَ",
          ar: "يَا أَيُّهَا النَّبِيُّ قُل لِّأَزْوَاجِكَ وَبَنَاتِكَ وَنِسَاءِ الْمُؤْمِنِينَ يُدْنِينَ عَلَيْهِنَّ مِن جَلَابِيبِهِنَّ ۚ ذَٰلِكَ أَدْنَىٰ أَن يُعْرَفْنَ فَلَا يُؤْذَيْنَ",
        },
        reference: { en: "Quran 33:59", ar: "سورة الأحزاب ٣٣:٥٩" },
        transliteration: "O Prophet, tell your wives and your daughters and the women of the believers to bring down over themselves their outer garments. That is more suitable that they will be known and not be abused.",
      },
      {
        id: "haram-murder",
        type: "text",
        content: {
          en: "### 💀 8. Murder (القتل) - Taking a Life\n\n**What is it?** Killing an innocent person unjustly.\n\n**Why is it forbidden?**\n- Human life is sacred - given by Allah alone\n- Killing one innocent person is like killing all of humanity\n- Creates cycles of revenge and violence\n- One of the greatest sins that can never be forgiven without the victim's forgiveness",
          ar: "### 💀 8. القتل - أخذ الحياة\n\n**ما هو؟** قتل شخص بريء ظلمًا.\n\n**لماذا محرم؟**\n- حياة الإنسان مقدسة - من الله وحده\n- قتل شخص بريء واحد كقتل البشرية جمعاء\n- يخلق دورات من الانتقام والعنف\n- من أعظم الذنوب التي لا يمكن مغفرتها بدون مسامحة الضحية",
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
        transliteration: "Whoever kills a soul unless for a soul or for corruption in the land - it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely.",
      },
      {
        id: "haram-hope",
        type: "text",
        content: {
          en: "---\n\n## 🌟 The Door of Repentance is ALWAYS Open\n\nIf you've done any of these things in the past - **don't despair!**\n\nWhen you became Muslim, all your previous sins were forgiven. And for ongoing struggles, Allah says:",
          ar: "---\n\n## 🌟 باب التوبة مفتوح دائمًا\n\nإذا فعلت أيًا من هذه الأشياء في الماضي - **لا تيأس!**\n\nعندما أصبحت مسلمًا، غُفرت جميع ذنوبك السابقة. وللصراعات المستمرة، يقول الله:",
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
        transliteration: "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
      },
      {
        id: "haram-conclusion",
        type: "tip",
        content: {
          en: "**Remember:**\n\n✅ Every prohibition has wisdom behind it\n✅ Allah wants to protect you, not punish you\n✅ Struggling against sin is itself rewarded\n✅ The door of repentance is always open\n✅ Progress, not perfection - take it one step at a time\n\n*\"Indeed, with hardship comes ease.\"* - Quran 94:6",
          ar: "**تذكر:**\n\n✅ كل تحريم له حكمة وراءه\n✅ الله يريد أن يحميك، لا أن يعاقبك\n✅ مجاهدة الذنب بحد ذاتها مُثابة\n✅ باب التوبة مفتوح دائمًا\n✅ التقدم، وليس الكمال - خطوة بخطوة\n\n*\"إِنَّ مَعَ الْعُسْرِ يُسْرًا\"* - القرآن ٩٤:٦",
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
          { en: "Speaking truth about someone in their absence that they would dislike", ar: "قول الحق عن شخص في غيابه مما يكرهه" },
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
