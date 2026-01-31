import { LessonContent, QuizQuestion, glossaryTerms } from "./lessons";

// =====================
// SALAH CHAPTER LESSONS
// =====================

export const salahLessons: Record<string, LessonContent> = {
  "salah-importance": {
    id: "salah-importance",
    chapterId: "salah",
    title: { en: "Importance of Salah", ar: "أهمية الصلاة" },
    description: {
      en: "Discover why prayer is the backbone of Islam and the direct connection between you and your Creator.",
      ar: "اكتشف لماذا الصلاة هي عمود الإسلام والاتصال المباشر بينك وبين خالقك.",
    },
    duration: 10,
    xpReward: 50,
    sections: [
      {
        id: "salah-learn-to-pray-video",
        type: "video",
        content: {
          en: "📿 Watch: Complete Guide - How to Pray in Islam (Step by Step)",
          ar: "📿 شاهد: دليل كامل - كيفية الصلاة في الإسلام (خطوة بخطوة)",
        },
        mediaUrl: "https://www.youtube.com/watch?v=2ZEmsdEOpbk",
        backupUrls: [
          "https://www.youtube.com/watch?v=T4auGhmeBlw",
          "https://www.youtube.com/watch?v=zalLv1AXhPg",
        ],
      },
      {
        id: "salah-importance-intro-video",
        type: "video",
        content: {
          en: "Watch: The Beauty and Importance of Prayer in Islam",
          ar: "شاهد: جمال وأهمية الصلاة في الإسلام",
        },
        mediaUrl: "https://www.youtube.com/watch?v=T4auGhmeBlw",
        backupUrls: [
          "https://www.youtube.com/watch?v=zalLv1AXhPg",
          "https://www.youtube.com/watch?v=W8_-E5iQ-yw",
        ],
      },
      {
        id: "salah-importance-image",
        type: "image",
        content: {
          en: "Muslims in prayer - the spiritual connection with Allah",
          ar: "المسلمون في الصلاة - الاتصال الروحي مع الله",
        },
        mediaUrl:
          "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
        mediaAlt: "Muslims praying in congregation",
      },
      {
        id: "salah-importance-section-1",
        type: "text",
        content: {
          en: 'Welcome to one of the most important lessons in your Islamic journey! **Salah** (prayer) is the second pillar of Islam and is often called the "backbone" of the religion. While the Shahada brings you into Islam, Salah is what keeps your faith alive and growing every single day.',
          ar: 'مرحباً بكم في أحد أهم الدروس في رحلتكم الإسلامية! **الصلاة** هي الركن الثاني من أركان الإسلام وغالباً ما تُسمى "عمود" الدين. بينما الشهادة تُدخلك الإسلام، الصلاة هي ما يُبقي إيمانك حياً وينمو كل يوم.',
        },
      },
      {
        id: "salah-importance-section-2",
        type: "hadith",
        content: {
          en: '"The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is incomplete, then the rest of his deeds will be incomplete."',
          ar: '"إن أول ما يحاسب به العبد يوم القيامة من عمله صلاته، فإن صلحت فقد أفلح وأنجح، وإن فسدت فقد خاب وخسر."',
        },
        source: {
          en: "Prophet Muhammad ﷺ (At-Tabarani)",
          ar: "النبي محمد ﷺ (الطبراني)",
        },
      },
      {
        id: "salah-importance-section-3",
        type: "text",
        content: {
          en: "### Why Salah is So Special\n\nUnlike any other act of worship, Salah was given directly to Prophet Muhammad ﷺ during his miraculous night journey (Isra and Mi'raj) to the heavens. Allah did not send this command through Angel Jibreel (Gabriel) - He delivered it personally. This shows how precious prayer is to Allah.\n\nSalah is also the **only pillar of Islam that was originally prescribed as 50 prayers a day**, later reduced to 5 through the Prophet's intercession, while still carrying the reward of 50. This shows Allah's mercy and the immense value He places on each prayer.",
          ar: "### لماذا الصلاة مميزة جداً\n\nعلى عكس أي عبادة أخرى، أُعطيت الصلاة مباشرة للنبي محمد ﷺ خلال رحلته الليلية المعجزة (الإسراء والمعراج) إلى السماوات. لم يُرسل الله هذا الأمر عبر الملاك جبريل - بل سلّمه شخصياً. وهذا يُظهر كم الصلاة عزيزة على الله.\n\nالصلاة هي أيضاً **الركن الوحيد من أركان الإسلام الذي فُرض في الأصل 50 صلاة في اليوم**، ثم خُفف إلى 5 بشفاعة النبي، مع الحفاظ على أجر الـ 50. وهذا يُظهر رحمة الله والقيمة الهائلة التي يضعها على كل صلاة.",
        },
      },
      {
        id: "salah-importance-interactive",
        type: "interactive",
        content: {
          en: "Tap to discover the benefits of Salah",
          ar: "اضغط لاكتشاف فوائد الصلاة",
        },
        items: [
          {
            label: { en: "Spiritual Cleansing", ar: "التطهير الروحي" },
            detail: {
              en: "Each prayer washes away sins committed since the last prayer",
              ar: "كل صلاة تغسل الذنوب المرتكبة منذ الصلاة السابقة",
            },
            icon: "✨",
          },
          {
            label: { en: "Direct Connection", ar: "اتصال مباشر" },
            detail: {
              en: "No intermediaries - you speak directly to Allah",
              ar: "لا وسطاء - تتحدث مباشرة إلى الله",
            },
            icon: "🤲",
          },
          {
            label: { en: "Life Structure", ar: "تنظيم الحياة" },
            detail: {
              en: "Five prayers give rhythm and purpose to your day",
              ar: "خمس صلوات تعطي إيقاعاً وهدفاً ليومك",
            },
            icon: "⏰",
          },
          {
            label: { en: "Peace & Tranquility", ar: "السلام والطمأنينة" },
            detail: {
              en: "A sanctuary from worldly stress to reconnect with your Lord",
              ar: "ملاذ من ضغوط الدنيا للتواصل مع ربك",
            },
            icon: "🕊️",
          },
          {
            label: { en: "Protection", ar: "الحماية" },
            detail: {
              en: "Regular prayer naturally keeps you away from harmful actions",
              ar: "الصلاة المنتظمة تبعدك طبيعياً عن الأفعال الضارة",
            },
            icon: "🛡️",
          },
          {
            label: { en: "Immense Reward", ar: "أجر عظيم" },
            detail: {
              en: "5 prayers carry the reward of 50 - Allah's special mercy",
              ar: "5 صلوات بأجر 50 - رحمة الله الخاصة",
            },
            icon: "⭐",
          },
        ],
      },
      {
        id: "salah-importance-section-4",
        type: "quran",
        content: {
          en: '"Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater. And Allah knows that which you do."',
          ar: '"إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ ۗ وَاللَّهُ يَعْلَمُ مَا تَصْنَعُونَ"',
        },
        reference: { en: "Quran 29:45", ar: "القرآن 29:45" },
        mediaUrl: "https://everyayah.com/data/Alafasy_128kbps/029045.mp3",
      },
      {
        id: "salah-importance-audio",
        type: "audio",
        content: {
          en: "Listen to the Adhan (Call to Prayer)",
          ar: "استمع إلى الأذان",
        },
        mediaUrl:
          "https://media.assabile.com/assabile/adhan_3435370/0bf83c80b583.mp3",
        transliteration: "Allahu Akbar, Allahu Akbar...",
      },
      {
        id: "salah-importance-section-5",
        type: "text",
        content: {
          en: "### What Salah Does for You\n\n1. **Direct Connection to Allah** - No priests, no intermediaries. You stand directly before your Creator five times a day.\n\n2. **Spiritual Cleansing** - Just as you wash your body, prayer washes your soul. Each prayer erases sins committed since the previous prayer.\n\n3. **Life Structure** - The five daily prayers give rhythm and purpose to your day, reminding you of what truly matters.\n\n4. **Protection from Sin** - Regular prayer naturally keeps you away from harmful actions. When you speak to Allah five times daily, it becomes harder to disobey Him.\n\n5. **Peace and Tranquility** - In a world full of stress, prayer is your sanctuary. It's your time to disconnect from worldly worries and reconnect with your Lord.",
          ar: "### ماذا تفعل الصلاة لك\n\n1. **اتصال مباشر بالله** - لا كهنة، لا وسطاء. تقف مباشرة أمام خالقك خمس مرات في اليوم.\n\n2. **تطهير روحي** - كما تغسل جسمك، الصلاة تغسل روحك. كل صلاة تمحو الذنوب المرتكبة منذ الصلاة السابقة.\n\n3. **هيكلة الحياة** - الصلوات الخمس اليومية تعطي إيقاعاً وهدفاً ليومك، تذكرك بما يهم حقاً.\n\n4. **حماية من الذنب** - الصلاة المنتظمة تبعدك طبيعياً عن الأفعال الضارة. عندما تتحدث إلى الله خمس مرات يومياً، يصبح من الصعب عصيانه.\n\n5. **السلام والطمأنينة** - في عالم مليء بالضغوط، الصلاة هي ملاذك. إنه وقتك للانفصال عن هموم الدنيا والتواصل مع ربك.",
        },
      },
      {
        id: "salah-importance-section-6",
        type: "hadith",
        content: {
          en: '"If there was a river at the door of anyone of you and he took a bath in it five times a day, would you notice any dirt on him?" They said, "Not a trace of dirt would be left." The Prophet said, "That is the example of the five prayers with which Allah removes sins."',
          ar: '"أرأيتم لو أن نهراً بباب أحدكم يغتسل منه كل يوم خمس مرات، هل يبقى من درنه شيء؟" قالوا: "لا يبقى من درنه شيء." قال: "فذلك مثل الصلوات الخمس يمحو الله بهن الخطايا."',
        },
        source: {
          en: "Prophet Muhammad ﷺ (Bukhari & Muslim)",
          ar: "النبي محمد ﷺ (البخاري ومسلم)",
        },
      },
      {
        id: "salah-importance-section-7",
        type: "tip",
        content: {
          en: "**Start Small, Stay Consistent**: If you're new to Islam, don't worry about getting everything perfect right away. Begin with whatever you can manage, even if it's just one prayer a day, and gradually build up. Allah loves consistent actions, even if they're small.",
          ar: "**ابدأ صغيراً، كن ثابتاً**: إذا كنت جديداً على الإسلام، لا تقلق بشأن إتقان كل شيء فوراً. ابدأ بما تستطيع، حتى لو كانت صلاة واحدة في اليوم، وتدرج في الزيادة. الله يحب الأعمال المستمرة، حتى لو كانت صغيرة.",
        },
      },
      {
        id: "salah-importance-section-8",
        type: "text",
        content: {
          en: "### The Five Daily Prayers\n\n| Prayer | Time | Rakaat |\n|--------|------|--------|\n| **Fajr** | Before sunrise | 2 |\n| **Dhuhr** | After midday | 4 |\n| **Asr** | Afternoon | 4 |\n| **Maghrib** | After sunset | 3 |\n| **Isha** | Night | 4 |\n\n*Rakaat (singular: rak'ah) are the units of prayer. You'll learn about these in the upcoming lessons.*",
          ar: "### الصلوات الخمس اليومية\n\n| الصلاة | الوقت | الركعات |\n|--------|------|--------|\n| **الفجر** | قبل الشروق | 2 |\n| **الظهر** | بعد الزوال | 4 |\n| **العصر** | بعد الظهر | 4 |\n| **المغرب** | بعد الغروب | 3 |\n| **العشاء** | الليل | 4 |\n\n*الركعات (مفرد: ركعة) هي وحدات الصلاة. ستتعلم عنها في الدروس القادمة.*",
        },
      },
      {
        id: "salah-importance-section-9",
        type: "quote",
        content: {
          en: "Prayer is not just something we do. It's something we become. When we pray consistently, we transform into people who are constantly aware of Allah's presence in our lives.",
          ar: "الصلاة ليست مجرد شيء نفعله. إنها شيء نصبحه. عندما نصلي باستمرار، نتحول إلى أشخاص يدركون دائماً وجود الله في حياتنا.",
        },
      },
    ],
    keyPoints: [
      {
        en: "Salah is the second pillar of Islam and was given directly by Allah during the Night Journey",
        ar: "الصلاة هي الركن الثاني من أركان الإسلام وأُعطيت مباشرة من الله في رحلة الإسراء والمعراج",
      },
      {
        en: "Muslims pray five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha",
        ar: "يصلي المسلمون خمس مرات يومياً: الفجر، الظهر، العصر، المغرب، والعشاء",
      },
      {
        en: "Prayer cleanses the soul from sins and protects from wrongdoing",
        ar: "الصلاة تطهر النفس من الذنوب وتحمي من المنكر",
      },
      {
        en: "Salah is your direct, personal connection to Allah without any intermediary",
        ar: "الصلاة هي اتصالك المباشر الشخصي بالله بدون أي وسيط",
      },
    ],
    quiz: [
      {
        id: "salah-imp-q1",
        question: {
          en: "What pillar of Islam is Salah?",
          ar: "أي ركن من أركان الإسلام هي الصلاة؟",
        },
        options: [
          { en: "First", ar: "الأول" },
          { en: "Second", ar: "الثاني" },
          { en: "Third", ar: "الثالث" },
          { en: "Fourth", ar: "الرابع" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Salah is the second pillar of Islam, right after the Shahada (declaration of faith).",
          ar: "الصلاة هي الركن الثاني من أركان الإسلام، مباشرة بعد الشهادة.",
        },
      },
      {
        id: "salah-imp-q2",
        question: {
          en: "How many obligatory prayers does a Muslim perform daily?",
          ar: "كم عدد الصلوات المفروضة التي يؤديها المسلم يومياً؟",
        },
        options: [
          { en: "Three", ar: "ثلاث" },
          { en: "Four", ar: "أربع" },
          { en: "Five", ar: "خمس" },
          { en: "Seven", ar: "سبع" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Muslims are required to pray five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
          ar: "يُطلب من المسلمين الصلاة خمس مرات يومياً: الفجر، الظهر، العصر، المغرب، والعشاء.",
        },
      },
      {
        id: "salah-imp-q3",
        question: {
          en: "Where was the command for Salah given to Prophet Muhammad ﷺ?",
          ar: "أين أُعطي أمر الصلاة للنبي محمد ﷺ؟",
        },
        options: [
          { en: "In Makkah", ar: "في مكة" },
          { en: "In Madinah", ar: "في المدينة" },
          {
            en: "In the heavens during Isra & Mi'raj",
            ar: "في السماوات خلال الإسراء والمعراج",
          },
          { en: "At Mount Hira", ar: "في جبل حراء" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Salah was uniquely prescribed during the miraculous night journey (Isra and Mi'raj) when Prophet Muhammad ﷺ ascended to the heavens.",
          ar: "فُرضت الصلاة بشكل فريد خلال رحلة الإسراء والمعراج عندما صعد النبي محمد ﷺ إلى السماوات.",
        },
      },
    ],
  },

  "salah-times": {
    id: "salah-times",
    chapterId: "salah",
    title: { en: "Prayer Times", ar: "أوقات الصلاة" },
    description: {
      en: "Learn about the five daily prayer times and how they are determined.",
      ar: "تعرف على أوقات الصلوات الخمس اليومية وكيفية تحديدها.",
    },
    duration: 8,
    xpReward: 40,
    sections: [
      {
        id: "salah-times-section-1",
        type: "text",
        content: {
          en: "One of the beautiful aspects of Islam is how it connects our worship to the natural rhythms of the day. The five daily prayers are tied to the sun's position, reminding us of Allah at key moments throughout the day.\n\nUnderstanding prayer times helps you organize your day around your most important meetings - your appointments with Allah!",
          ar: "من الجوانب الجميلة في الإسلام كيفية ربط عبادتنا بإيقاعات اليوم الطبيعية. الصلوات الخمس اليومية مرتبطة بموقع الشمس، تذكرنا بالله في لحظات رئيسية طوال اليوم.\n\nفهم أوقات الصلاة يساعدك على تنظيم يومك حول أهم اجتماعاتك - مواعيدك مع الله!",
        },
      },
      {
        id: "salah-times-section-2",
        type: "text",
        content: {
          en: "## 1. Fajr (فجر) - Dawn Prayer\n\n**Time:** From the first light of dawn until just before sunrise\n\n**Number of Rakaat:** 2 obligatory\n\nFajr is perhaps the most challenging prayer because it requires waking up before dawn. However, it's also one of the most rewarding. The quiet, peaceful time before the world wakes up is perfect for connecting with Allah.\n\n**Special Merit:** The Prophet ﷺ said, \"The two rak'ah of Fajr are better than the world and everything in it.\" (Muslim)",
          ar: '## 1. الفجر - صلاة الفجر\n\n**الوقت:** من أول ضوء للفجر حتى قبل شروق الشمس\n\n**عدد الركعات:** 2 فرض\n\nالفجر ربما هي أصعب صلاة لأنها تتطلب الاستيقاظ قبل الفجر. ومع ذلك، فهي أيضاً من أكثر الصلوات أجراً. الوقت الهادئ السلمي قبل استيقاظ العالم مثالي للتواصل مع الله.\n\n**فضلها الخاص:** قال النبي ﷺ: "ركعتا الفجر خير من الدنيا وما فيها." (مسلم)',
        },
      },
      {
        id: "salah-times-section-3",
        type: "text",
        content: {
          en: "## 2. Dhuhr (ظهر) - Noon Prayer\n\n**Time:** After the sun passes its zenith (highest point) until the shadow of an object equals its length\n\n**Number of Rakaat:** 4 obligatory\n\nDhuhr is prayed after midday, typically during lunch break for many people. It's a chance to pause in the middle of your day's activities and remember your purpose.\n\n**Practical Tip:** Most prayer apps show the exact time for your location. For beginners, Dhuhr typically falls between 12:00 PM - 3:00 PM depending on your location and the season.",
          ar: "## 2. الظهر - صلاة الظهر\n\n**الوقت:** بعد زوال الشمس (أعلى نقطة) حتى يصبح ظل الشيء مثل طوله\n\n**عدد الركعات:** 4 فرض\n\nالظهر تُصلى بعد منتصف النهار، عادةً خلال استراحة الغداء لكثير من الناس. إنها فرصة للتوقف في منتصف نشاطات يومك وتذكر هدفك.\n\n**نصيحة عملية:** معظم تطبيقات الصلاة تُظهر الوقت الدقيق لموقعك. للمبتدئين، الظهر عادةً تقع بين 12:00 م - 3:00 م حسب موقعك والموسم.",
        },
      },
      {
        id: "salah-times-section-4",
        type: "text",
        content: {
          en: '## 3. Asr (عصر) - Afternoon Prayer\n\n**Time:** When the shadow of an object exceeds its length until sunset\n\n**Number of Rakaat:** 4 obligatory\n\nAsr comes in the late afternoon, a time when people are often busiest with work. Stopping to pray Asr is a powerful reminder not to let worldly concerns distract us from Allah.\n\n**Warning:** The Prophet ﷺ warned specifically against missing Asr prayer, saying, "Whoever misses the Asr prayer, it is as if he has lost his family and wealth." (Bukhari & Muslim)',
          ar: '## 3. العصر - صلاة العصر\n\n**الوقت:** عندما يتجاوز ظل الشيء طوله حتى الغروب\n\n**عدد الركعات:** 4 فرض\n\nالعصر تأتي في وقت متأخر من بعد الظهر، وقت يكون الناس فيه غالباً مشغولين بالعمل. التوقف لصلاة العصر تذكير قوي بعدم ترك الشواغل الدنيوية تصرفنا عن الله.\n\n**تحذير:** حذر النبي ﷺ تحديداً من تفويت صلاة العصر، قائلاً: "من فاتته صلاة العصر فكأنما وُتر أهله وماله." (البخاري ومسلم)',
        },
      },
      {
        id: "salah-times-section-5",
        type: "text",
        content: {
          en: "## 4. Maghrib (مغرب) - Sunset Prayer\n\n**Time:** Right after sunset until the red twilight fades\n\n**Number of Rakaat:** 3 obligatory\n\nMaghrib has the shortest window of all prayers. It should be prayed soon after the sun sets below the horizon. In many Muslim families, this is a special time when everyone gathers to break fast during Ramadan.\n\n**Note:** Maghrib begins immediately after sunset and has a relatively short time window (usually about 1-1.5 hours), so try to pray it as soon as it enters.",
          ar: "## 4. المغرب - صلاة المغرب\n\n**الوقت:** مباشرة بعد الغروب حتى يختفي الشفق الأحمر\n\n**عدد الركعات:** 3 فرض\n\nللمغرب أقصر نافذة زمنية من بين جميع الصلوات. يجب أن تُصلى بعد غروب الشمس مباشرة. في كثير من العائلات المسلمة، هذا وقت خاص حيث يجتمع الجميع للإفطار في رمضان.\n\n**ملاحظة:** المغرب تبدأ مباشرة بعد الغروب ولها نافذة زمنية قصيرة نسبياً (عادةً حوالي ساعة - ساعة ونصف)، لذا حاول الصلاة فور دخول وقتها.",
        },
      },
      {
        id: "salah-times-section-6",
        type: "text",
        content: {
          en: "## 5. Isha (عشاء) - Night Prayer\n\n**Time:** After the red twilight has completely disappeared until midnight (or until Fajr in case of necessity)\n\n**Number of Rakaat:** 4 obligatory\n\nIsha is the last prayer of the day, prayed when darkness has fully settled. It's a perfect way to end your day - thanking Allah for the day's blessings and seeking His protection for the night.\n\n**Bonus:** After Isha, many Muslims pray the Witr prayer, a highly recommended prayer that is usually 1, 3, or more odd-numbered rak'at.",
          ar: "## 5. العشاء - صلاة العشاء\n\n**الوقت:** بعد اختفاء الشفق الأحمر تماماً حتى منتصف الليل (أو حتى الفجر في حالة الضرورة)\n\n**عدد الركعات:** 4 فرض\n\nالعشاء هي آخر صلاة في اليوم، تُصلى عندما يحل الظلام تماماً. إنها طريقة مثالية لإنهاء يومك - شكر الله على نعم اليوم وطلب حمايته لليلة.\n\n**إضافة:** بعد العشاء، يصلي كثير من المسلمين صلاة الوتر، وهي صلاة مستحبة جداً عادةً تكون 1 أو 3 أو أكثر من الركعات الفردية.",
        },
      },
      {
        id: "salah-times-section-7",
        type: "tip",
        content: {
          en: '**Use Prayer Time Apps!** Download a prayer time app like "Muslim Pro", "Athan", or "Islamic Finder" on your phone. These apps will calculate accurate prayer times for your location and send you reminders. They\'re incredibly helpful for beginners!',
          ar: '**استخدم تطبيقات أوقات الصلاة!** حمّل تطبيق أوقات الصلاة مثل "Muslim Pro" أو "Athan" أو "Islamic Finder" على هاتفك. هذه التطبيقات ستحسب أوقات الصلاة الدقيقة لموقعك وترسل لك تذكيرات. إنها مفيدة جداً للمبتدئين!',
        },
      },
      {
        id: "salah-times-section-8",
        type: "warning",
        content: {
          en: "**Forbidden Times for Prayer:** There are three short periods when prayer is prohibited:\n1. From sunrise until the sun rises above the horizon (about 15-20 minutes)\n2. When the sun is at its zenith (a few minutes at exact noon)\n3. From when the sun starts to turn pale before sunset until it sets\n\nThese times are very short, and the five daily prayers never fall within them.",
          ar: "**أوقات النهي عن الصلاة:** هناك ثلاث فترات قصيرة تُحظر فيها الصلاة:\n1. من شروق الشمس حتى ترتفع فوق الأفق (حوالي 15-20 دقيقة)\n2. عندما تكون الشمس في أعلى نقطة (دقائق قليلة عند الظهر بالضبط)\n3. من عندما تبدأ الشمس بالاصفرار قبل الغروب حتى تغرب\n\nهذه الأوقات قصيرة جداً، والصلوات الخمس اليومية لا تقع ضمنها أبداً.",
        },
      },
    ],
    keyPoints: [
      {
        en: "Five daily prayers are connected to the sun's position: Fajr, Dhuhr, Asr, Maghrib, and Isha",
        ar: "الصلوات الخمس اليومية مرتبطة بموقع الشمس: الفجر، الظهر، العصر، المغرب، والعشاء",
      },
      {
        en: "Prayer times vary based on location and season - use apps to track them",
        ar: "أوقات الصلاة تختلف حسب الموقع والموسم - استخدم التطبيقات لتتبعها",
      },
      {
        en: "Each prayer has a time window - try to pray at the beginning of the time",
        ar: "لكل صلاة نافذة زمنية - حاول الصلاة في بداية الوقت",
      },
      {
        en: "There are three short forbidden times for voluntary prayers around sunrise, noon, and sunset",
        ar: "هناك ثلاث أوقات قصيرة محظورة للصلاة التطوعية حول الشروق والظهر والغروب",
      },
    ],
  },

  "salah-recitations": {
    id: "salah-recitations",
    chapterId: "salah",
    title: { en: "Prayer Recitations", ar: "أذكار الصلاة" },
    description: {
      en: "Learn the essential Arabic recitations for prayer with transliteration and meaning.",
      ar: "تعلم الأذكار العربية الأساسية للصلاة مع النطق والمعنى.",
    },
    duration: 25,
    xpReward: 125,
    sections: [
      {
        id: "salah-recitations-section-1",
        type: "text",
        content: {
          en: "One of the most beautiful parts of Salah is that Muslims all around the world recite the same words in Arabic, connecting us across time and space. Don't worry if you don't know Arabic - millions of converts have learned these recitations, and so can you!\n\n**Important:** It's completely okay to read from a paper or phone when you're learning. Allah knows your intention and appreciates your effort!",
          ar: "من أجمل أجزاء الصلاة أن المسلمين في جميع أنحاء العالم يتلون نفس الكلمات بالعربية، مما يربطنا عبر الزمان والمكان. لا تقلق إذا كنت لا تعرف العربية - ملايين المهتدين تعلموا هذه الأذكار، وأنت أيضاً تستطيع!\n\n**مهم:** لا بأس تماماً بالقراءة من ورقة أو هاتف عندما تتعلم. الله يعلم نيتك ويقدر جهدك!",
        },
      },
      {
        id: "salah-recitations-section-2",
        type: "text",
        content: {
          en: "## Takbiratul Ihram (تكبيرة الإحرام) - Opening the Prayer\n\nThis is said once at the very beginning of the prayer while raising your hands:\n\n### Arabic:\n**الله أكبر**\n\n### Transliteration:\n**Allahu Akbar**\n\n### Meaning:\n**Allah is the Greatest**\n\n*This phrase transitions you from the ordinary world into a sacred state of prayer. From this moment, you are in conversation with Allah.*",
          ar: "## تكبيرة الإحرام - افتتاح الصلاة\n\nتُقال مرة واحدة في بداية الصلاة مع رفع اليدين:\n\n### العربية:\n**الله أكبر**\n\n### النطق:\n**Allahu Akbar**\n\n### المعنى:\n**الله أكبر**\n\n*هذه العبارة تنقلك من العالم العادي إلى حالة الصلاة المقدسة. من هذه اللحظة، أنت في حوار مع الله.*",
        },
      },
      {
        id: "salah-recitations-section-3",
        type: "text",
        content: {
          en: "## Surah Al-Fatiha (سورة الفاتحة) - The Opening Chapter\n\nThis is the most important surah and must be recited in every rak'ah of prayer:\n\n### Arabic:\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ\n\n### Transliteration:\n**Bismillah ir-Rahman ir-Raheem**\n**Alhamdu lillahi Rabbil 'aalameen**\n**Ar-Rahman ir-Raheem**\n**Maaliki yawmid-deen**\n**Iyyaaka na'budu wa iyyaaka nasta'een**\n**Ihdinas-siraatal mustaqeem**\n**Siraatal-latheena an'amta 'alayhim**\n**Ghayril maghdoobi 'alayhim walad-daalleen**\n\n### Meaning:\nIn the name of Allah, the Most Gracious, the Most Merciful\nAll praise is for Allah, Lord of all worlds\nThe Most Gracious, the Most Merciful\nMaster of the Day of Judgment\nYou alone we worship, and You alone we ask for help\nGuide us on the Straight Path\nThe path of those who have received Your grace\nNot of those who have brought down wrath upon themselves, nor of those who have gone astray",
          ar: "## سورة الفاتحة - الفاتحة\n\nهذه أهم سورة ويجب تلاوتها في كل ركعة:\n\n### العربية:\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        },
      },
      {
        id: "salah-recitations-section-4",
        type: "text",
        content: {
          en: "## Ruku (ركوع) - Bowing Position\n\nSaid while bowing with your back parallel to the ground:\n\n### Arabic:\n**سُبْحَانَ رَبِّيَ الْعَظِيمِ**\n\n### Transliteration:\n**Subhana Rabbiyal 'Atheem**\n\n### Meaning:\n**Glory be to my Lord, the Most Great**\n\n*Say this 3 times (minimum once)*",
          ar: "## الركوع - وضع الانحناء\n\nتُقال أثناء الانحناء والظهر موازٍ للأرض:\n\n### العربية:\n**سُبْحَانَ رَبِّيَ الْعَظِيمِ**\n\n### النطق:\n**Subhana Rabbiyal 'Atheem**\n\n### المعنى:\n**سبحان ربي العظيم**\n\n*قلها 3 مرات (الحد الأدنى مرة واحدة)*",
        },
      },
      {
        id: "salah-recitations-section-5",
        type: "text",
        content: {
          en: "## Rising from Ruku\n\nSaid while standing up from bowing:\n\n### Arabic:\n**سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ**\n\n### Transliteration:\n**Sami' Allahu liman hamidah**\n\n### Meaning:\n**Allah hears those who praise Him**\n\n---\n\n**Then, once standing straight:**\n\n### Arabic:\n**رَبَّنَا لَكَ الْحَمْدُ**\n\n### Transliteration:\n**Rabbana lakal hamd**\n\n### Meaning:\n**Our Lord, to You belongs all praise**",
          ar: "## القيام من الركوع\n\nتُقال عند الوقوف من الركوع:\n\n### العربية:\n**سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ**\n\n### النطق:\n**Sami' Allahu liman hamidah**\n\n### المعنى:\n**سمع الله لمن حمده**\n\n---\n\n**ثم، عند الوقوف مستقيماً:**\n\n### العربية:\n**رَبَّنَا لَكَ الْحَمْدُ**\n\n### النطق:\n**Rabbana lakal hamd**\n\n### المعنى:\n**ربنا لك الحمد**",
        },
      },
      {
        id: "salah-recitations-section-6",
        type: "text",
        content: {
          en: "## Sujud (سجود) - Prostration\n\nSaid while prostrating with forehead, nose, palms, knees, and toes touching the ground:\n\n### Arabic:\n**سُبْحَانَ رَبِّيَ الأَعْلَى**\n\n### Transliteration:\n**Subhana Rabbiyal A'la**\n\n### Meaning:\n**Glory be to my Lord, the Most High**\n\n*Say this 3 times (minimum once). This is the closest you get to Allah in prayer - make du'a (personal supplication) here!*",
          ar: "## السجود - وضع السجود\n\nتُقال أثناء السجود مع وضع الجبهة والأنف والكفين والركبتين وأطراف القدمين على الأرض:\n\n### العربية:\n**سُبْحَانَ رَبِّيَ الأَعْلَى**\n\n### النطق:\n**Subhana Rabbiyal A'la**\n\n### المعنى:\n**سبحان ربي الأعلى**\n\n*قلها 3 مرات (الحد الأدنى مرة واحدة). هذا أقرب ما تكون إلى الله في الصلاة - ادعُ (دعاء شخصي) هنا!*",
        },
      },
      {
        id: "salah-recitations-section-7",
        type: "hadith",
        content: {
          en: '"The closest that a servant is to his Lord is when he is in prostration, so increase your supplications (du\'a) therein."',
          ar: '"أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء."',
        },
        source: {
          en: "Prophet Muhammad ﷺ (Muslim)",
          ar: "النبي محمد ﷺ (مسلم)",
        },
      },
      {
        id: "salah-recitations-section-8",
        type: "text",
        content: {
          en: "## At-Tashahhud (التشهد) - Sitting Testimony\n\nRecited while sitting after every two rak'ah:\n\n### Arabic:\nالتَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ\nالسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ\nالسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ\n\n### Transliteration:\n**At-tahiyyatu lillahi was-salawatu wat-tayyibat**\n**As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh**\n**As-salamu 'alayna wa 'ala 'ibadillahis-saliheen**\n**Ashhadu an la ilaha illallah wa ashhadu anna Muhammadan 'abduhu wa rasuluh**\n\n### Meaning:\nAll greetings, prayers and good things are for Allah\nPeace be upon you, O Prophet, and the mercy of Allah and His blessings\nPeace be upon us and upon the righteous servants of Allah\nI bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger",
          ar: "## التشهد - جلسة الشهادة\n\nتُتلى أثناء الجلوس بعد كل ركعتين:\n\n### العربية:\nالتَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ\nالسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ\nالسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        },
      },
      {
        id: "salah-recitations-section-9",
        type: "text",
        content: {
          en: "## Salawat (الصلاة على النبي) - Blessings upon the Prophet\n\nAdded in the final sitting (last tashahhud) before ending prayer:\n\n### Arabic:\nاللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ\n\n### Transliteration:\n**Allahumma salli 'ala Muhammad wa 'ala aali Muhammad**\n**Kama sallayta 'ala Ibrahim wa 'ala aali Ibrahim, innaka Hamidun Majeed**\n**Allahumma barik 'ala Muhammad wa 'ala aali Muhammad**\n**Kama barakta 'ala Ibrahim wa 'ala aali Ibrahim, innaka Hamidun Majeed**\n\n### Meaning:\nO Allah, send blessings upon Muhammad and upon the family of Muhammad\nAs You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious\nO Allah, bless Muhammad and the family of Muhammad\nAs You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious",
          ar: "## الصلاة على النبي - الصلوات على النبي\n\nتُضاف في الجلسة الأخيرة (التشهد الأخير) قبل إنهاء الصلاة:\n\n### العربية:\nاللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        },
      },
      {
        id: "salah-recitations-section-10",
        type: "text",
        content: {
          en: "## Tasleem (التسليم) - Ending the Prayer\n\nSaid while turning your head to the right, then to the left:\n\n### Arabic:\n**السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ**\n\n### Transliteration:\n**As-salamu 'alaykum wa rahmatullah**\n\n### Meaning:\n**Peace and mercy of Allah be upon you**\n\n*Turn right first, say it, then turn left and say it again. This concludes your prayer.*",
          ar: "## التسليم - إنهاء الصلاة\n\nتُقال مع توجيه الرأس إلى اليمين، ثم إلى اليسار:\n\n### العربية:\n**السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ**\n\n### النطق:\n**As-salamu 'alaykum wa rahmatullah**\n\n### المعنى:\n**السلام عليكم ورحمة الله**\n\n*التفت يميناً أولاً، قلها، ثم التفت يساراً وقلها مرة أخرى. هذا يختم صلاتك.*",
        },
      },
      {
        id: "salah-recitations-section-11",
        type: "tip",
        content: {
          en: "**Learning Tips:**\n\n1. **Start with Al-Fatiha** - This is the most important. Learn it first and learn it well.\n\n2. **Use Audio** - Listen to recordings while reading along. Hearing proper pronunciation is essential.\n\n3. **Practice daily** - Even 10 minutes of practice each day will help you memorize quickly.\n\n4. **Be patient with yourself** - The Companions of the Prophet ﷺ also learned these words, and so have millions of converts throughout history. You will too, insha'Allah!",
          ar: "**نصائح للتعلم:**\n\n1. **ابدأ بالفاتحة** - هذه الأهم. تعلمها أولاً وأتقنها.\n\n2. **استخدم الصوت** - استمع للتسجيلات أثناء القراءة. سماع النطق الصحيح ضروري.\n\n3. **تدرب يومياً** - حتى 10 دقائق من التدريب كل يوم ستساعدك على الحفظ بسرعة.\n\n4. **كن صبوراً مع نفسك** - صحابة النبي ﷺ أيضاً تعلموا هذه الكلمات، وكذلك ملايين المهتدين عبر التاريخ. وأنت أيضاً ستتعلم، إن شاء الله!",
        },
      },
    ],
    keyPoints: [
      {
        en: "Surah Al-Fatiha must be recited in every rak'ah - it's the most essential recitation",
        ar: "سورة الفاتحة يجب تلاوتها في كل ركعة - هي أهم تلاوة",
      },
      {
        en: '"Subhana Rabbiyal \'Atheem" is said in bowing, "Subhana Rabbiyal A\'la" in prostration',
        ar: '"سبحان ربي العظيم" تُقال في الركوع، "سبحان ربي الأعلى" في السجود',
      },
      {
        en: "At-Tashahhud and Salawat are recited while sitting",
        ar: "التشهد والصلوات تُتلى أثناء الجلوس",
      },
      {
        en: 'The prayer ends with Tasleem - turning right and left saying "As-salamu alaykum wa rahmatullah"',
        ar: 'الصلاة تنتهي بالتسليم - الالتفات يميناً ويساراً قائلاً "السلام عليكم ورحمة الله"',
      },
    ],
  },

  "salah-mistakes": {
    id: "salah-mistakes",
    chapterId: "salah",
    title: { en: "Common Mistakes", ar: "الأخطاء الشائعة" },
    description: {
      en: "Learn about common mistakes in prayer and how to avoid them.",
      ar: "تعرف على الأخطاء الشائعة في الصلاة وكيفية تجنبها.",
    },
    duration: 10,
    xpReward: 50,
    sections: [
      {
        id: "salah-mistakes-section-1",
        type: "text",
        content: {
          en: "As you learn to pray, it's completely normal to make mistakes. Even lifelong Muslims sometimes fall into bad habits! This lesson will help you identify common issues so you can develop good prayer habits from the start.\n\nRemember: Allah looks at your intention and effort. Don't let fear of mistakes stop you from praying!",
          ar: "عندما تتعلم الصلاة، من الطبيعي تماماً أن تخطئ. حتى المسلمون منذ الصغر أحياناً يقعون في عادات سيئة! هذا الدرس سيساعدك على تحديد المشاكل الشائعة حتى تتمكن من تطوير عادات صلاة جيدة من البداية.\n\nتذكر: الله ينظر إلى نيتك وجهدك. لا تدع الخوف من الأخطاء يمنعك من الصلاة!",
        },
      },
      {
        id: "salah-mistakes-section-2",
        type: "text",
        content: {
          en: "## Mistake #1: Rushing Through Prayer\n\n**The Problem:** Praying so quickly that the words become mumbled and the positions aren't held properly.\n\n**Why It Matters:** The Prophet ﷺ told a man who rushed his prayer: \"Go back and pray, for you have not prayed.\" Prayer requires tranquility (tuma'ninah) - settling into each position.\n\n**The Fix:**\n- Pause briefly in each position\n- Recite at a moderate pace you can understand\n- Quality over speed - a calm, focused prayer is better than a rushed one",
          ar: '## الخطأ #1: الاستعجال في الصلاة\n\n**المشكلة:** الصلاة بسرعة كبيرة بحيث تصبح الكلمات غير واضحة والأوضاع لا تُحفظ بشكل صحيح.\n\n**لماذا يهم:** قال النبي ﷺ لرجل استعجل في صلاته: "ارجع فصلِّ، فإنك لم تصلِّ." الصلاة تتطلب الطمأنينة - الاستقرار في كل وضع.\n\n**الحل:**\n- توقف لحظة في كل وضع\n- اقرأ بسرعة معتدلة يمكنك فهمها\n- الجودة أهم من السرعة - صلاة هادئة مركزة أفضل من صلاة مستعجلة',
        },
      },
      {
        id: "salah-mistakes-section-3",
        type: "text",
        content: {
          en: "## Mistake #2: Not Straightening the Back in Ruku\n\n**The Problem:** Bending only slightly or not keeping the back straight and parallel to the ground.\n\n**Why It Matters:** Proper ruku (bowing) involves bending at the waist until your back is flat, like a table. Your head shouldn't be higher or lower than your back.\n\n**The Fix:**\n- Bend until your back is parallel to the floor\n- Place your hands firmly on your knees\n- Keep your head in line with your back (don't lift it up or drop it down)",
          ar: "## الخطأ #2: عدم استقامة الظهر في الركوع\n\n**المشكلة:** الانحناء قليلاً فقط أو عدم إبقاء الظهر مستقيماً وموازياً للأرض.\n\n**لماذا يهم:** الركوع الصحيح يتضمن الانحناء من الخصر حتى يصبح ظهرك مسطحاً، مثل الطاولة. رأسك لا يجب أن يكون أعلى أو أخفض من ظهرك.\n\n**الحل:**\n- انحنِ حتى يصبح ظهرك موازياً للأرض\n- ضع يديك بقوة على ركبتيك\n- أبقِ رأسك على مستوى ظهرك (لا ترفعه أو تخفضه)",
        },
      },
      {
        id: "salah-mistakes-section-4",
        type: "text",
        content: {
          en: '## Mistake #3: "Pecking" in Sujud\n\n**The Problem:** Barely touching the forehead to the ground and quickly coming back up, like a bird pecking.\n\n**Why It Matters:** Sujud is the most important position of prayer - it\'s when you\'re closest to Allah! The Prophet ﷺ emphasized placing seven body parts firmly on the ground.\n\n**The Fix:**\n- Place your forehead AND nose firmly on the ground\n- All seven points should touch: forehead, nose, both palms, both knees, toes of both feet\n- Stay in sujud long enough to say "Subhana Rabbiyal A\'la" at least once, preferably three times',
          ar: '## الخطأ #3: "النقر" في السجود\n\n**المشكلة:** لمس الجبهة للأرض بالكاد والعودة بسرعة، مثل نقر الطائر.\n\n**لماذا يهم:** السجود هو أهم وضع في الصلاة - إنه عندما تكون أقرب إلى الله! أكد النبي ﷺ على وضع سبعة أعضاء بقوة على الأرض.\n\n**الحل:**\n- ضع جبهتك وأنفك بقوة على الأرض\n- جميع النقاط السبع يجب أن تلمس: الجبهة، الأنف، كلتا الكفين، كلتا الركبتين، أصابع كلتا القدمين\n- ابقَ في السجود مدة كافية لتقول "سبحان ربي الأعلى" مرة واحدة على الأقل، ويُفضل ثلاث مرات',
        },
      },
      {
        id: "salah-mistakes-section-5",
        type: "text",
        content: {
          en: "## Mistake #4: Mind Wandering\n\n**The Problem:** Thinking about work, food, problems, or anything other than the prayer while praying.\n\n**Why It Matters:** While your prayer is still valid if your mind wanders, you miss out on the spiritual benefits. The goal is khushu' (focus and humility).\n\n**The Fix:**\n- Understand what you're saying (learn the meanings!)\n- Pray in a quiet place with minimal distractions\n- If your mind wanders, gently bring it back - don't get frustrated\n- Look at the spot where you will prostrate\n- Remember you are standing before Allah, the Creator of the universe",
          ar: "## الخطأ #4: شرود الذهن\n\n**المشكلة:** التفكير في العمل، الطعام، المشاكل، أو أي شيء آخر غير الصلاة أثناء الصلاة.\n\n**لماذا يهم:** بينما صلاتك لا تزال صحيحة إذا شرد ذهنك، تفوتك الفوائد الروحية. الهدف هو الخشوع.\n\n**الحل:**\n- افهم ما تقوله (تعلم المعاني!)\n- صلِّ في مكان هادئ مع أقل قدر من المشتتات\n- إذا شرد ذهنك، أعده بلطف - لا تحبط\n- انظر إلى المكان الذي ستسجد فيه\n- تذكر أنك تقف أمام الله، خالق الكون",
        },
      },
      {
        id: "salah-mistakes-section-6",
        type: "text",
        content: {
          en: "## Mistake #5: Not Facing the Qiblah\n\n**The Problem:** Praying in a direction other than towards the Ka'bah in Makkah.\n\n**Why It Matters:** Facing the qiblah is a condition for valid prayer (unless you genuinely cannot determine it).\n\n**The Fix:**\n- Use a qiblah compass app on your phone\n- Ask local Muslims which direction to face\n- Look for the qiblah direction marker in mosques\n- If truly unable to determine, do your best - Allah knows your intention",
          ar: "## الخطأ #5: عدم استقبال القبلة\n\n**المشكلة:** الصلاة في اتجاه غير اتجاه الكعبة في مكة.\n\n**لماذا يهم:** استقبال القبلة شرط لصحة الصلاة (إلا إذا كنت حقاً لا تستطيع تحديدها).\n\n**الحل:**\n- استخدم تطبيق بوصلة القبلة على هاتفك\n- اسأل المسلمين المحليين أي اتجاه تواجه\n- ابحث عن علامة اتجاه القبلة في المساجد\n- إذا كنت حقاً غير قادر على التحديد، ابذل قصارى جهدك - الله يعلم نيتك",
        },
      },
      {
        id: "salah-mistakes-section-7",
        type: "text",
        content: {
          en: "## Mistake #6: Moving Eyes Around\n\n**The Problem:** Looking around, up at the ceiling, or closing eyes tightly during prayer.\n\n**Why It Matters:** The Prophet ﷺ warned against looking up during prayer and encouraged looking at the place of prostration.\n\n**The Fix:**\n- Keep your gaze on the spot where your forehead will touch in sujud\n- Don't close your eyes tightly (this can increase distraction)\n- Avoid looking at decorations, people, or anything distracting",
          ar: "## الخطأ #6: تحريك العينين\n\n**المشكلة:** النظر حولك، إلى السقف، أو إغماض العينين بإحكام أثناء الصلاة.\n\n**لماذا يهم:** حذر النبي ﷺ من النظر لأعلى أثناء الصلاة وشجع على النظر إلى موضع السجود.\n\n**الحل:**\n- أبقِ نظرك على المكان الذي ستلمس فيه جبهتك في السجود\n- لا تغمض عينيك بإحكام (هذا يمكن أن يزيد الشرود)\n- تجنب النظر إلى الزخارف، الناس، أو أي شيء يشتت",
        },
      },
      {
        id: "salah-mistakes-section-8",
        type: "warning",
        content: {
          en: "**Important:** These are guidelines for improving your prayer, not reasons to feel your prayer is invalid. If you made mistakes unknowingly, your prayer is still accepted. Focus on gradual improvement, not perfection!",
          ar: "**مهم:** هذه إرشادات لتحسين صلاتك، وليست أسباباً للشعور بأن صلاتك باطلة. إذا أخطأت دون علم، صلاتك لا تزال مقبولة. ركز على التحسن التدريجي، وليس الكمال!",
        },
      },
      {
        id: "salah-mistakes-section-9",
        type: "tip",
        content: {
          en: "**Pro Tip:** Watch videos of scholars praying and try to imitate their calmness and deliberate movements. Visual learning can be very helpful for developing good habits.",
          ar: "**نصيحة متقدمة:** شاهد فيديوهات للعلماء وهم يصلون وحاول تقليد هدوئهم وحركاتهم المتأنية. التعلم البصري يمكن أن يكون مفيداً جداً لتطوير عادات جيدة.",
        },
      },
    ],
    keyPoints: [
      {
        en: "Avoid rushing - each position requires tranquility (tuma'ninah)",
        ar: "تجنب الاستعجال - كل وضع يتطلب الطمأنينة",
      },
      {
        en: "Keep your back straight and parallel to the ground in ruku",
        ar: "أبقِ ظهرك مستقيماً وموازياً للأرض في الركوع",
      },
      {
        en: "Place all seven body parts firmly on the ground in sujud",
        ar: "ضع جميع الأعضاء السبعة بقوة على الأرض في السجود",
      },
      {
        en: "Focus on the prayer and face the qiblah",
        ar: "ركز على الصلاة واستقبل القبلة",
      },
    ],
  },

  "salah-quiz": {
    id: "salah-quiz",
    chapterId: "salah",
    title: { en: "Salah Quiz", ar: "اختبار الصلاة" },
    description: {
      en: "Test your knowledge of the Salah chapter.",
      ar: "اختبر معلوماتك عن فصل الصلاة.",
    },
    duration: 5,
    xpReward: 150,
    isQuiz: true,
    sections: [],
    keyPoints: [],
    quiz: [
      {
        id: "salah-quiz-q1",
        question: {
          en: "How many obligatory prayers must a Muslim perform daily?",
          ar: "كم عدد الصلوات المفروضة التي يجب على المسلم أداؤها يومياً؟",
        },
        options: [
          { en: "Three", ar: "ثلاث" },
          { en: "Five", ar: "خمس" },
          { en: "Seven", ar: "سبع" },
          { en: "Ten", ar: "عشر" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Muslims are required to pray five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
          ar: "يُطلب من المسلمين الصلاة خمس مرات يومياً: الفجر، الظهر، العصر، المغرب، والعشاء.",
        },
      },
      {
        id: "salah-quiz-q2",
        question: {
          en: "Which surah must be recited in every rak'ah of prayer?",
          ar: "أي سورة يجب تلاوتها في كل ركعة من الصلاة؟",
        },
        options: [
          { en: "Surah Al-Ikhlas", ar: "سورة الإخلاص" },
          { en: "Surah Al-Fatiha", ar: "سورة الفاتحة" },
          { en: "Surah Al-Nas", ar: "سورة الناس" },
          { en: "Surah Al-Kawthar", ar: "سورة الكوثر" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Surah Al-Fatiha (The Opening) must be recited in every rak'ah. The Prophet ﷺ said there is no prayer without it.",
          ar: "سورة الفاتحة يجب تلاوتها في كل ركعة. قال النبي ﷺ لا صلاة لمن لم يقرأ بها.",
        },
      },
      {
        id: "salah-quiz-q3",
        question: {
          en: "What do you say in ruku (bowing)?",
          ar: "ماذا تقول في الركوع؟",
        },
        options: [
          { en: "Subhana Rabbiyal A'la", ar: "سبحان ربي الأعلى" },
          { en: "Subhana Rabbiyal 'Atheem", ar: "سبحان ربي العظيم" },
          { en: "Allahu Akbar", ar: "الله أكبر" },
          { en: "Rabbana lakal hamd", ar: "ربنا لك الحمد" },
        ],
        correctAnswer: 1,
        explanation: {
          en: '"Subhana Rabbiyal \'Atheem" (Glory be to my Lord, the Most Great) is recited in ruku.',
          ar: '"سبحان ربي العظيم" تُتلى في الركوع.',
        },
      },
      {
        id: "salah-quiz-q4",
        question: {
          en: "What is the position where you are closest to Allah?",
          ar: "ما هو الوضع الذي تكون فيه أقرب إلى الله؟",
        },
        options: [
          { en: "Standing (Qiyam)", ar: "القيام" },
          { en: "Bowing (Ruku)", ar: "الركوع" },
          { en: "Prostration (Sujud)", ar: "السجود" },
          { en: "Sitting (Juloos)", ar: "الجلوس" },
        ],
        correctAnswer: 2,
        explanation: {
          en: 'The Prophet ﷺ said: "The closest a servant is to his Lord is when he is in prostration (sujud)."',
          ar: 'قال النبي ﷺ: "أقرب ما يكون العبد من ربه وهو ساجد."',
        },
      },
      {
        id: "salah-quiz-q5",
        question: {
          en: "Which prayer has the shortest time window?",
          ar: "أي صلاة لها أقصر نافذة زمنية؟",
        },
        options: [
          { en: "Fajr", ar: "الفجر" },
          { en: "Dhuhr", ar: "الظهر" },
          { en: "Maghrib", ar: "المغرب" },
          { en: "Isha", ar: "العشاء" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Maghrib has the shortest window, typically about 1-1.5 hours between sunset and when the red twilight disappears.",
          ar: "للمغرب أقصر نافذة، عادةً حوالي ساعة إلى ساعة ونصف بين الغروب واختفاء الشفق الأحمر.",
        },
      },
    ],
  },
};

// Helper to get all Salah lessons
export const getSalahLessons = () => Object.values(salahLessons);
