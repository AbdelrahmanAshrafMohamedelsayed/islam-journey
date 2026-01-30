import { LessonContent } from "./lessons";

// =====================
// QURAN CHAPTER LESSONS
// =====================

export const quranLessons: Record<string, LessonContent> = {
  "quran-introduction": {
    id: "quran-introduction",
    chapterId: "quran",
    title: { en: "Introduction to the Quran", ar: "مقدمة إلى القرآن" },
    description: {
      en: "Discover what makes the Quran unique and why it is the central text of Islam.",
      ar: "اكتشف ما يجعل القرآن فريداً ولماذا هو النص المركزي في الإسلام.",
    },
    duration: 12,
    xpReward: 60,
    content: {
      en: `## What is the Quran?

The **Quran** (also spelled Qur'an) is the holy book of Islam, believed by Muslims to be the literal word of Allah (God) as revealed to Prophet Muhammad ﷺ over a period of 23 years (610-632 CE).

### Key Facts About the Quran

- **Original Language**: Arabic - and it has been preserved in Arabic exactly as it was revealed
- **Structure**: 114 chapters called "Surahs" containing over 6,000 verses called "Ayat"
- **Revelation**: Through the Angel Jibreel (Gabriel) to Prophet Muhammad ﷺ
- **Memorization**: Millions of Muslims have memorized the entire Quran, called "Hafiz"

## Why is the Quran Special?

### 1. Preserved Word-for-Word

Unlike other religious texts, the Quran has been preserved letter-by-letter since its revelation. Not a single word has changed in over 1,400 years. This is a historical fact acknowledged even by non-Muslim scholars.

### 2. The Linguistic Miracle

The Quran's Arabic is so eloquent and unique that it challenged the most skilled poets of Arabia - and still does. No one has been able to produce anything like it, despite the Quran's open challenge to do so.

### 3. A Book of Guidance

The Quran is not just a historical document. It's a living guide that addresses:
- Faith and belief
- Personal character
- Family relationships
- Social justice
- Economic principles
- Legal matters

### 4. For All of Humanity

While revealed in Arabic to an Arab Prophet, the Quran declares itself to be guidance for all of humanity, across all times and places.

## How to Approach the Quran as a New Muslim

1. **Start with translations** - Read the meaning in your language first
2. **Learn Al-Fatiha** - The opening chapter, recited in every prayer
3. **Memorize short surahs** - Begin with the last chapters (Juz Amma)
4. **Listen to recitations** - Beautiful recitation helps connect with the text
5. **Study with context** - Learn when and why verses were revealed

## The First Revelation

The first words revealed to Prophet Muhammad ﷺ in the cave of Hira were:

> "Read! In the name of your Lord who created. Created man from a clinging substance. Read! And your Lord is the Most Generous. Who taught by the pen. Taught man that which he knew not."
> — Quran 96:1-5

These powerful verses emphasize knowledge, reading, and learning - setting the tone for a faith that values education and understanding.`,
      ar: `## ما هو القرآن؟

**القرآن** هو الكتاب المقدس للإسلام، يؤمن المسلمون أنه كلام الله الحرفي كما أُنزل على النبي محمد ﷺ على مدى 23 سنة (610-632 م).

### حقائق أساسية عن القرآن

- **اللغة الأصلية**: العربية - وقد حُفظ بالعربية تماماً كما أُنزل
- **الهيكل**: 114 فصلاً تُسمى "سور" تحتوي على أكثر من 6,000 آية
- **الوحي**: من خلال الملاك جبريل إلى النبي محمد ﷺ
- **الحفظ**: ملايين المسلمين حفظوا القرآن كاملاً، ويُسمون "حافظ"

## لماذا القرآن مميز؟

### 1. محفوظ كلمة بكلمة

على عكس النصوص الدينية الأخرى، حُفظ القرآن حرفاً حرفاً منذ نزوله. لم تتغير كلمة واحدة في أكثر من 1,400 سنة.

### 2. المعجزة اللغوية

عربية القرآن بليغة وفريدة لدرجة أنها تحدت أمهر شعراء العرب - ولا تزال. لم يستطع أحد أن يأتي بمثله.

### 3. كتاب هداية

القرآن ليس مجرد وثيقة تاريخية. إنه دليل حي يتناول:
- الإيمان والعقيدة
- الأخلاق الشخصية
- العلاقات الأسرية
- العدالة الاجتماعية
- المبادئ الاقتصادية
- الأمور القانونية

### 4. للبشرية جمعاء

رغم نزوله بالعربية على نبي عربي، يُعلن القرآن أنه هداية للبشرية جمعاء، عبر كل الأزمنة والأماكن.

## كيف تتعامل مع القرآن كمسلم جديد

1. **ابدأ بالترجمات** - اقرأ المعنى بلغتك أولاً
2. **تعلم الفاتحة** - السورة الافتتاحية، تُتلى في كل صلاة
3. **احفظ السور القصيرة** - ابدأ بالأجزاء الأخيرة (جزء عم)
4. **استمع للتلاوات** - التلاوة الجميلة تساعد على التواصل مع النص
5. **ادرس مع السياق** - تعلم متى ولماذا نزلت الآيات`,
    },
    keyPoints: [
      {
        en: "The Quran is the literal word of Allah revealed to Prophet Muhammad ﷺ",
        ar: "القرآن هو كلام الله الحرفي المُنزل على النبي محمد ﷺ",
      },
      {
        en: "It has been perfectly preserved for over 1,400 years",
        ar: "حُفظ بشكل مثالي لأكثر من 1,400 سنة",
      },
      {
        en: "The Quran contains 114 surahs (chapters) and over 6,000 ayat (verses)",
        ar: "يحتوي القرآن على 114 سورة وأكثر من 6,000 آية",
      },
      {
        en: "Start learning with translations, then gradually learn Arabic",
        ar: "ابدأ التعلم بالترجمات، ثم تعلم العربية تدريجياً",
      },
    ],
  },

  "quran-structure": {
    id: "quran-structure",
    chapterId: "quran",
    title: { en: "Structure of the Quran", ar: "هيكل القرآن" },
    description: {
      en: "Learn how the Quran is organized and navigate its chapters and verses.",
      ar: "تعلم كيف يُنظم القرآن وتصفح سوره وآياته.",
    },
    duration: 10,
    xpReward: 50,
    content: {
      en: `## How the Quran is Organized

### Surahs (Chapters)

The Quran contains **114 surahs** (chapters), arranged roughly from longest to shortest - not in chronological order of revelation.

- **Longest**: Surah Al-Baqarah (The Cow) - 286 verses
- **Shortest**: Surah Al-Kawthar (The Abundance) - 3 verses

### Ayat (Verses)

Each surah is made up of **ayat** (verses). The word "ayah" literally means "sign" - each verse is considered a sign from Allah.

### Juz (Parts)

For easier reading and memorization, the Quran is divided into **30 equal parts** called "juz" (plural: ajza). This allows Muslims to read 1 juz per day and complete the Quran in a month.

### Makki and Madani Surahs

- **Makki (Meccan)**: Revealed in Makkah before the migration. Focus on faith, the afterlife, and stories of previous prophets.
- **Madani (Medinan)**: Revealed in Madinah after the migration. Focus on laws, social issues, and community building.

## Important Surahs to Know

### Al-Fatiha (The Opening)
- First surah, recited in every prayer
- Called "The Mother of the Quran"
- Contains the essence of Islamic faith

### Al-Ikhlas (The Sincerity)
- Equal in reward to 1/3 of the Quran
- Summarizes pure monotheism (Tawheed)
- Short and easy to memorize

### Al-Nas & Al-Falaq (The Mankind & The Dawn)
- Protection from evil
- Recited together as "Al-Mu'awwidhatayn"
- Important for daily protection

### Ayat Al-Kursi (The Throne Verse)
- Verse 255 of Surah Al-Baqarah
- Greatest verse in the Quran
- Powerful for protection

## Reading Tips

1. **Bismillah**: All surahs except At-Tawbah begin with "Bismillahir Rahmanir Raheem"
2. **Seek Refuge**: Before reading, say "A'udhu billahi minash-shaytanir rajeem"
3. **Read with Tajweed**: Proper pronunciation rules (learn gradually)
4. **Understand**: Use translation alongside Arabic`,
      ar: `## كيف يُنظم القرآن

### السور (الفصول)

يحتوي القرآن على **114 سورة**، مرتبة تقريباً من الأطول إلى الأقصر - ليس بترتيب النزول.

- **الأطول**: سورة البقرة - 286 آية
- **الأقصر**: سورة الكوثر - 3 آيات

### الآيات

كل سورة تتكون من **آيات**. كلمة "آية" تعني حرفياً "علامة" - كل آية تُعتبر علامة من الله.

### الأجزاء

لتسهيل القراءة والحفظ، يُقسم القرآن إلى **30 جزءاً متساوياً**. هذا يسمح للمسلمين بقراءة جزء يومياً وختم القرآن في شهر.

### السور المكية والمدنية

- **المكية**: نزلت في مكة قبل الهجرة. تركز على الإيمان، الآخرة، وقصص الأنبياء السابقين.
- **المدنية**: نزلت في المدينة بعد الهجرة. تركز على الأحكام، القضايا الاجتماعية، وبناء المجتمع.

## سور مهمة يجب معرفتها

### الفاتحة
- السورة الأولى، تُتلى في كل صلاة
- تُسمى "أم القرآن"
- تحتوي على جوهر الإيمان الإسلامي

### الإخلاص
- تعدل ثلث القرآن في الأجر
- تلخص التوحيد الخالص
- قصيرة وسهلة الحفظ

### الناس والفلق
- حماية من الشر
- تُقرآن معاً باسم "المعوذتين"
- مهمتان للحماية اليومية

### آية الكرسي
- الآية 255 من سورة البقرة
- أعظم آية في القرآن
- قوية للحماية`,
    },
    keyPoints: [
      {
        en: "The Quran has 114 surahs arranged mostly by length",
        ar: "القرآن يحتوي على 114 سورة مرتبة غالباً حسب الطول",
      },
      {
        en: "It is divided into 30 juz for easy monthly reading",
        ar: "مُقسم إلى 30 جزءاً للقراءة الشهرية السهلة",
      },
      {
        en: "Surahs are classified as Makki (Meccan) or Madani (Medinan)",
        ar: "السور تُصنف كمكية أو مدنية",
      },
      {
        en: "Al-Fatiha is essential - memorize it first for prayer",
        ar: "الفاتحة ضرورية - احفظها أولاً للصلاة",
      },
    ],
  },

  "quran-recitation": {
    id: "quran-recitation",
    chapterId: "quran",
    title: { en: "Learning Quran Recitation", ar: "تعلم تلاوة القرآن" },
    description: {
      en: "Start your journey in learning to recite the Quran properly.",
      ar: "ابدأ رحلتك في تعلم تلاوة القرآن بشكل صحيح.",
    },
    duration: 15,
    xpReward: 75,
    content: {
      en: `## The Art of Quran Recitation

Reciting the Quran is not just reading - it's an act of worship. The Prophet ﷺ said: "Whoever reads a letter from the Book of Allah will receive a reward, and the reward will be multiplied by ten."

### Tajweed: The Rules of Recitation

**Tajweed** means "to beautify" or "to improve." It's the science of reciting the Quran correctly, giving each letter its rights:

1. **Correct pronunciation** of each Arabic letter
2. **Proper length** of vowels (short vs. elongated)
3. **Appropriate stops** and pauses
4. **Nasal sounds** (ghunnah) where required

### Getting Started

#### Step 1: Learn Arabic Letters
Before you can recite, learn the 28 Arabic letters and their sounds. Many resources are available:
- Noorani Qaida (beginner's book)
- YouTube tutorials
- Quran learning apps

#### Step 2: Start with Short Surahs
Begin with the last surahs of the Quran (Juz Amma):
1. Al-Fatiha (essential for prayer)
2. Al-Ikhlas
3. Al-Falaq
4. Al-Nas
5. Al-Kawthar

#### Step 3: Listen and Repeat
- Listen to a reciter (Sheikh Mishary, Sheikh Sudais, etc.)
- Repeat after them phrase by phrase
- Record yourself and compare

### Beautiful Recitation Tips

1. **Start slow** - Speed will come naturally
2. **Focus on pronunciation** - Get the sounds right first
3. **Practice daily** - Even 10 minutes helps
4. **Find a teacher** - Tajweed is best learned with guidance
5. **Make du'a** - Ask Allah to make it easy

### The Reward of Struggling

The Prophet ﷺ said: "The one who recites the Quran and struggles with it, stammering, will have two rewards."

If you find it difficult, know that your struggle itself is rewarded! Allah sees your effort.

### Common Mistakes to Avoid

- Rushing through verses
- Not pronouncing letters from their correct points
- Ignoring the rules of stopping
- Not seeking correction when unsure`,
      ar: `## فن تلاوة القرآن

تلاوة القرآن ليست مجرد قراءة - إنها عبادة. قال النبي ﷺ: "من قرأ حرفاً من كتاب الله فله به حسنة، والحسنة بعشر أمثالها."

### التجويد: قواعد التلاوة

**التجويد** يعني "التحسين". إنه علم تلاوة القرآن بشكل صحيح، إعطاء كل حرف حقه:

1. **النطق الصحيح** لكل حرف عربي
2. **الطول المناسب** للحركات (قصيرة مقابل ممدودة)
3. **الوقفات المناسبة** والسكتات
4. **الأصوات الأنفية** (الغنة) حيث مطلوب

### البداية

#### الخطوة 1: تعلم الحروف العربية
قبل أن تتلو، تعلم الحروف العربية الـ 28 وأصواتها.

#### الخطوة 2: ابدأ بالسور القصيرة
ابدأ بآخر سور القرآن (جزء عم):
1. الفاتحة (ضرورية للصلاة)
2. الإخلاص
3. الفلق
4. الناس
5. الكوثر

#### الخطوة 3: استمع وكرر
- استمع لقارئ (الشيخ مشاري، الشيخ السديس، إلخ)
- كرر بعدهم جملة جملة
- سجل نفسك وقارن

### نصائح للتلاوة الجميلة

1. **ابدأ ببطء** - السرعة ستأتي طبيعياً
2. **ركز على النطق** - أصلح الأصوات أولاً
3. **تدرب يومياً** - حتى 10 دقائق تساعد
4. **ابحث عن معلم** - التجويد يُتعلم أفضل مع التوجيه
5. **ادعُ الله** - اسأل الله أن يسهل عليك

### أجر المجاهد

قال النبي ﷺ: "الذي يقرأ القرآن ويتعتع فيه وهو عليه شاق له أجران."

إذا وجدته صعباً، اعلم أن جهدك نفسه مُثاب! الله يرى جهدك.`,
    },
    keyPoints: [
      {
        en: "Tajweed is the science of proper Quran recitation",
        ar: "التجويد هو علم تلاوة القرآن الصحيحة",
      },
      {
        en: "Start by learning Arabic letters, then short surahs",
        ar: "ابدأ بتعلم الحروف العربية، ثم السور القصيرة",
      },
      {
        en: "Listen to reciters and repeat after them",
        ar: "استمع للقراء وكرر بعدهم",
      },
      {
        en: "Struggling with recitation earns double reward",
        ar: "المجاهدة في التلاوة لها أجر مضاعف",
      },
    ],
  },

  "quran-understanding": {
    id: "quran-understanding",
    chapterId: "quran",
    title: { en: "Understanding the Quran", ar: "فهم القرآن" },
    description: {
      en: "Learn how to approach understanding the meanings of the Quran.",
      ar: "تعلم كيفية التعامل مع فهم معاني القرآن.",
    },
    duration: 12,
    xpReward: 60,
    content: {
      en: `## Beyond Recitation: Understanding

While reciting the Quran in Arabic has special merit, understanding its meanings transforms your life. Allah says: "This is a blessed Book which We have revealed to you, that they might reflect upon its verses." (38:29)

### Types of Quran Study

#### 1. Translation (Tarjama)
Reading the meaning in your native language. Good for:
- Getting the general message
- Daily reading and reflection
- Understanding while reciting

**Recommended Translations:**
- Sahih International (clear, accurate)
- Dr. Mustafa Khattab (The Clear Quran)
- Abdul Haleem (modern English)

#### 2. Tafsir (Commentary)
Detailed explanation of verses. Includes:
- Context of revelation
- Linguistic analysis
- Scholarly interpretations
- Practical applications

**Beginner-Friendly Tafsir:**
- "Towards Understanding the Quran" by Maududi
- Tafsir Ibn Kathir (abridged)
- "The Study Quran" (academic)

### Key Themes in the Quran

1. **Tawheed (Monotheism)** - The Oneness of Allah
2. **Prophethood** - Stories and lessons from prophets
3. **The Afterlife** - Paradise, Hell, Day of Judgment
4. **Worship** - Prayer, fasting, charity, pilgrimage
5. **Ethics** - Justice, kindness, honesty, patience
6. **Laws** - Family, business, society

### Tips for Deeper Understanding

1. **Read with intention** - Seek guidance, not just information
2. **Reflect (tadabbur)** - Pause and think about the verses
3. **Apply what you learn** - Knowledge without action is incomplete
4. **Ask questions** - Seek answers from reliable scholars
5. **Join a study circle** - Learn with others

### Understanding Requires Humility

The Quran is deep and multilayered. Even scholars spend lifetimes studying it. Approach it with:
- Humility
- Openness to correction
- Reliance on authentic scholars
- Prayer for understanding`,
      ar: `## ما وراء التلاوة: الفهم

بينما تلاوة القرآن بالعربية لها فضل خاص، فهم معانيه يُحول حياتك. يقول الله: "كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ." (38:29)

### أنواع دراسة القرآن

#### 1. الترجمة
قراءة المعنى بلغتك الأم. جيدة لـ:
- فهم الرسالة العامة
- القراءة والتأمل اليومي
- الفهم أثناء التلاوة

#### 2. التفسير
شرح مفصل للآيات. يشمل:
- سياق النزول
- التحليل اللغوي
- تفسيرات العلماء
- التطبيقات العملية

### المواضيع الرئيسية في القرآن

1. **التوحيد** - وحدانية الله
2. **النبوة** - قصص ودروس من الأنبياء
3. **الآخرة** - الجنة، النار، يوم القيامة
4. **العبادة** - الصلاة، الصيام، الزكاة، الحج
5. **الأخلاق** - العدل، اللطف، الصدق، الصبر
6. **الأحكام** - الأسرة، التجارة، المجتمع

### نصائح للفهم الأعمق

1. **اقرأ بنية** - اطلب الهداية، ليس مجرد معلومات
2. **تدبر** - توقف وفكر في الآيات
3. **طبق ما تعلمته** - العلم بدون عمل ناقص
4. **اسأل أسئلة** - اطلب الإجابات من علماء موثوقين
5. **انضم لحلقة دراسية** - تعلم مع الآخرين

### الفهم يتطلب التواضع

القرآن عميق ومتعدد الطبقات. حتى العلماء يقضون أعمارهم في دراسته. تعامل معه بـ:
- التواضع
- الانفتاح للتصحيح
- الاعتماد على العلماء الموثوقين
- الدعاء للفهم`,
    },
    keyPoints: [
      {
        en: "Translations help understand the message, tafsir provides deeper insight",
        ar: "الترجمات تساعد على فهم الرسالة، التفسير يوفر رؤية أعمق",
      },
      {
        en: "Key themes include Tawheed, prophethood, afterlife, and ethics",
        ar: "المواضيع الرئيسية تشمل التوحيد، النبوة، الآخرة، والأخلاق",
      },
      {
        en: "Reflect (tadabbur) on verses, don't just read them",
        ar: "تدبر الآيات، لا تقرأها فقط",
      },
      {
        en: "Approach the Quran with humility and seek reliable scholars",
        ar: "تعامل مع القرآن بتواضع واطلب علماء موثوقين",
      },
    ],
  },

  "quran-quiz": {
    id: "quran-quiz",
    chapterId: "quran",
    title: { en: "Quran Quiz", ar: "اختبار القرآن" },
    description: {
      en: "Test your knowledge about the Quran.",
      ar: "اختبر معلوماتك عن القرآن.",
    },
    duration: 5,
    xpReward: 100,
    type: "quiz",
    content: { en: "", ar: "" },
    quiz: [
      {
        id: "quran-q1",
        question: {
          en: "How many surahs are in the Quran?",
          ar: "كم عدد السور في القرآن؟",
        },
        options: [
          { en: "100", ar: "100" },
          { en: "114", ar: "114" },
          { en: "120", ar: "120" },
          { en: "130", ar: "130" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "The Quran contains exactly 114 surahs (chapters).",
          ar: "يحتوي القرآن على 114 سورة بالضبط.",
        },
      },
      {
        id: "quran-q2",
        question: {
          en: "Which surah must be recited in every rak'ah of prayer?",
          ar: "أي سورة يجب تلاوتها في كل ركعة من الصلاة؟",
        },
        options: [
          { en: "Al-Ikhlas", ar: "الإخلاص" },
          { en: "Al-Fatiha", ar: "الفاتحة" },
          { en: "Al-Baqarah", ar: "البقرة" },
          { en: "Al-Nas", ar: "الناس" },
        ],
        correctAnswer: 1,
        explanation: {
          en: 'Al-Fatiha (The Opening) must be recited in every rak\'ah of prayer. It is called "The Mother of the Quran."',
          ar: 'الفاتحة يجب تلاوتها في كل ركعة من الصلاة. تُسمى "أم القرآن".',
        },
      },
      {
        id: "quran-q3",
        question: {
          en: "How many parts (juz) is the Quran divided into?",
          ar: "إلى كم جزء يُقسم القرآن؟",
        },
        options: [
          { en: "20", ar: "20" },
          { en: "25", ar: "25" },
          { en: "30", ar: "30" },
          { en: "40", ar: "40" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "The Quran is divided into 30 equal parts (juz) to facilitate reading the entire Quran in one month.",
          ar: "يُقسم القرآن إلى 30 جزءاً متساوياً لتسهيل قراءة القرآن كاملاً في شهر واحد.",
        },
      },
      {
        id: "quran-q4",
        question: {
          en: "What is the science of proper Quran recitation called?",
          ar: "ما يُسمى علم تلاوة القرآن الصحيحة؟",
        },
        options: [
          { en: "Tafsir", ar: "التفسير" },
          { en: "Tajweed", ar: "التجويد" },
          { en: "Tarjama", ar: "الترجمة" },
          { en: "Tadabbur", ar: "التدبر" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Tajweed is the science of proper Quran recitation, ensuring each letter is pronounced correctly.",
          ar: "التجويد هو علم تلاوة القرآن الصحيحة، لضمان نطق كل حرف بشكل صحيح.",
        },
      },
      {
        id: "quran-q5",
        question: {
          en: "What was the first word revealed to Prophet Muhammad ﷺ?",
          ar: "ما أول كلمة أُنزلت على النبي محمد ﷺ؟",
        },
        options: [
          { en: "Pray", ar: "صلِّ" },
          { en: "Worship", ar: "اعبد" },
          { en: "Read", ar: "اقرأ" },
          { en: "Believe", ar: "آمن" },
        ],
        correctAnswer: 2,
        explanation: {
          en: 'The first revelation was "Iqra" (Read/Recite) from Surah Al-Alaq, emphasizing the importance of knowledge in Islam.',
          ar: 'أول وحي كان "اقرأ" من سورة العلق، مؤكداً أهمية العلم في الإسلام.',
        },
      },
    ],
  },
};

// Helper to get all Quran lessons
export const getQuranLessons = () => Object.values(quranLessons);
