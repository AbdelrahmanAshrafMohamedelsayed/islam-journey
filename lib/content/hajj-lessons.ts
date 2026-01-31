import type { LessonContent, QuizQuestion } from "./lessons";

// ============================================
// HAJJ CHAPTER LESSONS
// ============================================

export const hajjLessons: Record<string, LessonContent> = {
  "hajj-meaning": {
    id: "hajj-meaning",
    chapterId: "hajj",
    title: {
      en: "Significance of Hajj",
      ar: "أهمية الحج",
    },
    content: {
      en: `
# The Significance of Hajj

Hajj is the fifth and final pillar of Islam. It is the pilgrimage to Makkah that every able Muslim must perform at least once in their lifetime.

## The Divine Command

Allah says in the Quran:

> "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass." (Quran 22:27)

> "And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way." (Quran 3:97)

## What is Hajj?

**Hajj** literally means "to set out for a place." In Islam, it refers to:
- The annual pilgrimage to Makkah
- Performed during the month of Dhul Hijjah (12th Islamic month)
- Specific dates: 8th to 12th (or 13th) of Dhul Hijjah
- Millions of Muslims gather as one Ummah

## The History of Hajj

### Prophet Ibrahim (Abraham) عليه السلام
- Built the Kaaba with his son Ismail
- First called people to pilgrimage
- Many Hajj rituals commemorate his trials

### The Well of Zamzam
- Hajar (Hagar) searched for water for Ismail
- Ran between Safa and Marwa seven times
- Angel Jibreel revealed the spring

### Prophet Muhammad ﷺ
- Purified Hajj from pagan practices
- Performed his Farewell Hajj in 10 AH
- Set the example for all Muslims to follow

## Who Must Perform Hajj?

Hajj is obligatory for every Muslim who meets these conditions:

| Condition | Explanation |
|-----------|-------------|
| **Muslim** | Must be a believer |
| **Adult** | Reached puberty |
| **Sane** | Mentally capable |
| **Free** | Not enslaved |
| **Physically Able** | Health permits the journey |
| **Financially Able** | Can afford without hardship |
| **Safe Route** | Journey is reasonably safe |
| **Woman's Mahram** | Female must have male guardian (varies by madhab) |

## The Spiritual Significance

### 1. Unity of the Ummah
- Muslims from all nations gather
- No distinction of race, wealth, or status
- All wear the same simple garments (Ihram)

### 2. Submission to Allah
- Leaving behind worldly comforts
- Following Allah's command completely
- Remembering the purpose of life

### 3. Purification from Sins
The Prophet ﷺ said:
> "Whoever performs Hajj and does not commit any obscenity or transgression, he returns free from sin as on the day his mother gave birth to him."

### 4. Preparation for the Hereafter
- The gathering resembles the Day of Judgment
- Standing on Arafah reminds us of standing before Allah
- White garments symbolize shrouds of death

## The Rewards of Hajj

The Prophet ﷺ said:

> "An accepted Hajj has no reward except Paradise."

> "From one Umrah to another is an expiation for what comes between them, and Hajj al-Mabrur (accepted Hajj) has no reward except Paradise."

## Types of Hajj

There are three types of Hajj a pilgrim can perform:

### 1. Hajj Tamattu' (Enjoyment)
- Perform Umrah first
- Exit Ihram, wait for Hajj
- Enter Ihram again for Hajj
- Animal sacrifice required

### 2. Hajj Qiran (Combined)
- Enter Ihram for both Umrah and Hajj
- Stay in Ihram until Hajj is complete
- Animal sacrifice required

### 3. Hajj Ifrad (Single)
- Enter Ihram for Hajj only
- No Umrah before Hajj
- No sacrifice required

**Prophet ﷺ recommended Tamattu'** for those who didn't bring a sacrificial animal.

## Key Locations

### Makkah (Mecca)
- Home of the Kaaba
- Center of the Islamic world
- Qibla direction for all prayers

### Masjid al-Haram
- The Sacred Mosque surrounding the Kaaba
- Largest mosque in the world
- One prayer = 100,000 prayers elsewhere

### Other Important Sites
- **Mina**: Tent city for pilgrims
- **Arafah**: Mount where pilgrims stand
- **Muzdalifah**: Night stay after Arafah
- **Jamarat**: Pillars for stoning ritual

In the next lesson, we'll explore the rituals of Hajj in detail.
      `,
      ar: `
# أهمية الحج

الحج هو الركن الخامس والأخير من أركان الإسلام. إنه الرحلة إلى مكة التي يجب على كل مسلم قادر أداؤها مرة واحدة على الأقل في حياته.

## الأمر الإلهي

قال الله تعالى في القرآن:

> "وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ" (الحج: 27)

> "وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا" (آل عمران: 97)

## ما هو الحج؟

**الحج** يعني حرفياً "القصد إلى مكان". في الإسلام، يشير إلى:
- الحج السنوي إلى مكة
- يُؤدى في شهر ذي الحجة (الشهر الثاني عشر الهجري)
- التواريخ المحددة: 8 إلى 12 (أو 13) من ذي الحجة
- ملايين المسلمين يجتمعون كأمة واحدة

## تاريخ الحج

### النبي إبراهيم عليه السلام
- بنى الكعبة مع ابنه إسماعيل
- أول من دعا الناس للحج
- كثير من مناسك الحج تُخلد تجاربه

### بئر زمزم
- هاجر بحثت عن الماء لإسماعيل
- ركضت بين الصفا والمروة سبع مرات
- الملك جبريل كشف عن الينبوع

### النبي محمد ﷺ
- طهر الحج من الممارسات الوثنية
- أدى حجة الوداع في السنة 10 هـ
- وضع المثال لجميع المسلمين

## من يجب عليه أداء الحج؟

الحج واجب على كل مسلم تتوفر فيه الشروط التالية:

| الشرط | الشرح |
|-------|-------|
| **مسلم** | يجب أن يكون مؤمناً |
| **بالغ** | وصل سن البلوغ |
| **عاقل** | قادر عقلياً |
| **حر** | غير مملوك |
| **قادر بدنياً** | صحته تسمح بالرحلة |
| **قادر مالياً** | يستطيع التحمل بدون مشقة |
| **طريق آمن** | الرحلة آمنة بشكل معقول |
| **محرم للمرأة** | المرأة تحتاج ولي ذكر (يختلف حسب المذهب) |

## الأهمية الروحية

### 1. وحدة الأمة
- المسلمون من جميع الدول يجتمعون
- لا تمييز بالعرق أو الثروة أو المكانة
- الجميع يرتدون نفس الملابس البسيطة (الإحرام)

### 2. الخضوع لله
- ترك الراحة الدنيوية
- اتباع أمر الله بالكامل
- تذكر الهدف من الحياة

### 3. التطهر من الذنوب
قال النبي ﷺ:
> "من حج فلم يرفث ولم يفسق رجع من ذنوبه كيوم ولدته أمه"

### 4. الاستعداد للآخرة
- التجمع يشبه يوم القيامة
- الوقوف بعرفة يُذكرنا بالوقوف أمام الله
- الملابس البيضاء ترمز لأكفان الموت

## ثواب الحج

قال النبي ﷺ:

> "الحج المبرور ليس له جزاء إلا الجنة"

> "العمرة إلى العمرة كفارة لما بينهما، والحج المبرور ليس له جزاء إلا الجنة"

## أنواع الحج

هناك ثلاثة أنواع من الحج يمكن للحاج أداؤها:

### 1. حج التمتع
- أداء العمرة أولاً
- الخروج من الإحرام، انتظار الحج
- الدخول في الإحرام مرة أخرى للحج
- ذبح الهدي مطلوب

### 2. حج القران
- الدخول في الإحرام للعمرة والحج معاً
- البقاء في الإحرام حتى اكتمال الحج
- ذبح الهدي مطلوب

### 3. حج الإفراد
- الدخول في الإحرام للحج فقط
- لا عمرة قبل الحج
- لا هدي مطلوب

**النبي ﷺ أوصى بالتمتع** لمن لم يسق الهدي.

## المواقع الرئيسية

### مكة المكرمة
- موطن الكعبة
- مركز العالم الإسلامي
- اتجاه القبلة لجميع الصلوات

### المسجد الحرام
- المسجد المقدس المحيط بالكعبة
- أكبر مسجد في العالم
- صلاة واحدة = 100,000 صلاة في مكان آخر

### مواقع أخرى مهمة
- **منى**: مدينة الخيام للحجاج
- **عرفة**: الجبل حيث يقف الحجاج
- **مزدلفة**: المبيت بعد عرفة
- **الجمرات**: الأعمدة لرمي الحصى

في الدرس التالي، سنستكشف مناسك الحج بالتفصيل.
      `,
    },
    duration: 10,
    xpReward: 50,
    glossaryTerms: ["hajj", "kaaba", "umrah"],
    sections: [
      {
        id: "hajj-intro-video",
        type: "video",
        content: {
          en: "Watch: The Journey of a Lifetime - Understanding Hajj",
          ar: "شاهد: رحلة العمر - فهم الحج",
        },
        mediaUrl: "https://www.youtube.com/watch?v=1MWbz8jXJTw",
        backupUrls: [
          "https://www.youtube.com/watch?v=NbQ6_cJvP_o",
          "https://www.youtube.com/watch?v=y-X9yS5Etyg",
        ],
      },
      {
        id: "hajj-quran-audio",
        type: "audio",
        content: {
          en: "Listen: Surah Al-Hajj verse 27 - The Call to Pilgrimage",
          ar: "استمع: سورة الحج آية 27 - النداء للحج",
        },
        mediaUrl:
          "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2705.mp3",
      },
      {
        id: "hajj-kaaba-image",
        type: "image",
        content: {
          en: "Millions of pilgrims gather around the Kaaba in unity",
          ar: "ملايين الحجاج يجتمعون حول الكعبة في وحدة",
        },
        mediaUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
        mediaAlt: "Pilgrims performing Tawaf around the Kaaba during Hajj",
      },
      {
        id: "hajj-hadith",
        type: "hadith",
        content: {
          en: "The Prophet ﷺ said: 'Whoever performs Hajj and does not commit any obscenity or transgression, returns free from sin as on the day his mother gave birth to him.'",
          ar: "قال النبي ﷺ: 'من حج فلم يرفث ولم يفسق رجع من ذنوبه كيوم ولدته أمه.'",
        },
        source: { en: "Sahih Bukhari", ar: "صحيح البخاري" },
      },
    ],
  },

  "hajj-rituals": {
    id: "hajj-rituals",
    chapterId: "hajj",
    title: {
      en: "Rituals of Hajj",
      ar: "مناسك الحج",
    },
    content: {
      en: `
# The Rituals of Hajj

The Hajj journey consists of specific rituals performed over several days. Let's explore each step in detail.

## Before Hajj: Preparation

### Spiritual Preparation
- Repent sincerely to Allah
- Seek forgiveness from others
- Clear all debts or arrange for them
- Write a will
- Make sincere intention (niyyah)

### Practical Preparation
- Obtain visa and permits
- Get required vaccinations
- Pack necessary items
- Learn the rituals thoroughly

## The Rituals Day by Day

### Pre-Hajj: Entering Ihram

**Ihram** is the sacred state a pilgrim enters before Hajj:

**For Men:**
- Two white unstitched cloths
- One wrapped around waist (izar)
- One over shoulder (rida)
- Head must remain uncovered
- Simple sandals

**For Women:**
- Regular modest clothing
- Face and hands visible
- No specific color required

**Ihram Restrictions:**
- No cutting hair or nails
- No perfume
- No intimate relations
- No hunting
- No fighting or arguing

**Entering Ihram:**
1. Ghusl (full bath)
2. Wear ihram garments
3. Pray two rak'ahs
4. Make intention: "Labbayk Allahumma Hajj" (Here I am, O Allah, for Hajj)
5. Begin reciting the Talbiyah

### The Talbiyah

> لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ

"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner."

---

## Day 1: 8th Dhul Hijjah (Yawm al-Tarwiyah)

### Morning: Go to Mina
- Depart for Mina after Fajr
- Stay in tent city
- Pray Dhuhr, Asr, Maghrib, Isha, and Fajr
- Shorten 4-rak'ah prayers to 2
- Spend the night preparing for Arafah

---

## Day 2: 9th Dhul Hijjah (Day of Arafah)

### The Most Important Day of Hajj

The Prophet ﷺ said: **"Hajj is Arafah"**

### Morning: Journey to Arafah
- Leave Mina after sunrise
- Arrive at the plains of Arafah
- Stand anywhere within the boundaries

### Noon to Sunset: Standing at Arafah (Wuquf)
- Combine Dhuhr and Asr prayers (shortened)
- Make abundant du'a
- Recite Quran and dhikr
- Cry and beg Allah for forgiveness
- Stay until after sunset

**The best du'a on Arafah:**
> لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ

### After Sunset: Move to Muzdalifah
- Leave Arafah after sunset
- Combine Maghrib and Isha at Muzdalifah
- Sleep under the open sky
- Collect pebbles for stoning (49-70 pebbles)
- Leave after Fajr prayer

---

## Day 3: 10th Dhul Hijjah (Yawm al-Nahr - Eid Day)

The busiest day with multiple rituals:

### 1. Stone Jamrat al-Aqaba (Big Pillar)
- Throw 7 pebbles saying "Allahu Akbar" with each
- This represents rejecting Satan
- Stop reciting Talbiyah after this

### 2. Animal Sacrifice (Hadi)
- Required for Tamattu' and Qiran pilgrims
- Can be done personally or delegated
- Meat distributed to poor

### 3. Shaving/Cutting Hair (Halq/Taqsir)
- Men: Shave head completely (better) or trim
- Women: Cut a fingertip length

### 4. Tawaf al-Ifadah (Circumambulation)
- Go to Makkah
- Perform Tawaf around Kaaba (7 circuits)
- This is a pillar of Hajj

### 5. Sa'i (Walking between Safa and Marwa)
- 7 trips between the two hills
- If not done during Umrah
- Commemorates Hajar's search for water

**After these rituals:**
- First release from Ihram (Tahallul al-Awwal)
- All restrictions lifted except intimacy
- After Tawaf: Complete release

---

## Days 4-5: 11th-12th Dhul Hijjah (Days of Tashreeq)

### Stay in Mina
- Return to tent in Mina
- Stone all three Jamarat each day:
  - Small (Jamrat al-Sughra) - 7 pebbles
  - Medium (Jamrat al-Wusta) - 7 pebbles
  - Large (Jamrat al-Aqaba) - 7 pebbles
- Make du'a after small and medium
- Leave after stoning on 12th (if rushing)

### Optional 13th Dhul Hijjah
- Can stay and stone again
- Better to stay if able
- Leave Mina after Dhuhr

---

## Farewell Tawaf (Tawaf al-Wada')

Before leaving Makkah:
- Perform final Tawaf around Kaaba
- Last act in Makkah should be at Kaaba
- Menstruating women are excused
- Make du'a at Multazam (between door and Black Stone)

---

## Summary of Pillars (Arkan)

These are ESSENTIAL - Hajj invalid without them:

1. **Ihram** - Entering the sacred state
2. **Standing at Arafah** - Being there on 9th Dhul Hijjah
3. **Tawaf al-Ifadah** - Circumambulation after Arafah
4. **Sa'i** - Walking between Safa and Marwa

## Summary of Obligations (Wajibat)

Missing these requires a sacrifice but Hajj is valid:

1. Ihram from Miqat
2. Standing at Arafah until sunset
3. Staying at Muzdalifah
4. Staying at Mina
5. Stoning the Jamarat
6. Shaving/cutting hair
7. Farewell Tawaf

May Allah grant you the opportunity to perform Hajj Mabrur!
      `,
      ar: `
# مناسك الحج

رحلة الحج تتكون من مناسك محددة تُؤدى على مدار عدة أيام. دعونا نستكشف كل خطوة بالتفصيل.

## قبل الحج: التحضير

### التحضير الروحي
- التوبة الصادقة لله
- طلب المسامحة من الآخرين
- تسديد الديون أو ترتيبها
- كتابة الوصية
- النية الصادقة

### التحضير العملي
- الحصول على التأشيرة والتصاريح
- أخذ التطعيمات المطلوبة
- تجهيز الأغراض الضرورية
- تعلم المناسك جيداً

## المناسك يوماً بيوم

### قبل الحج: الدخول في الإحرام

**الإحرام** هو الحالة المقدسة التي يدخلها الحاج قبل الحج:

**للرجال:**
- قطعتان بيضاوان غير مخيطتين
- واحدة تُلف حول الخصر (الإزار)
- واحدة على الكتف (الرداء)
- الرأس يبقى مكشوفاً
- نعال بسيطة

**للنساء:**
- ملابس عادية محتشمة
- الوجه واليدان ظاهران
- لا لون محدد مطلوب

**محظورات الإحرام:**
- لا قص للشعر أو الأظافر
- لا طيب
- لا علاقات زوجية
- لا صيد
- لا شجار أو جدال

**الدخول في الإحرام:**
1. الغسل
2. لبس ملابس الإحرام
3. صلاة ركعتين
4. النية: "لبيك اللهم حجاً"
5. البدء بالتلبية

### التلبية

> لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ

---

## اليوم الأول: 8 ذو الحجة (يوم التروية)

### الصباح: الذهاب إلى منى
- المغادرة إلى منى بعد الفجر
- البقاء في مدينة الخيام
- صلاة الظهر والعصر والمغرب والعشاء والفجر
- قصر الصلوات الرباعية إلى ركعتين
- قضاء الليلة استعداداً لعرفة

---

## اليوم الثاني: 9 ذو الحجة (يوم عرفة)

### أهم يوم في الحج

قال النبي ﷺ: **"الحج عرفة"**

### الصباح: الرحلة إلى عرفة
- مغادرة منى بعد شروق الشمس
- الوصول إلى سهول عرفة
- الوقوف في أي مكان داخل الحدود

### من الظهر إلى الغروب: الوقوف بعرفة
- جمع صلاتي الظهر والعصر (قصراً)
- الإكثار من الدعاء
- تلاوة القرآن والذكر
- البكاء والتضرع لله بالمغفرة
- البقاء حتى بعد غروب الشمس

**أفضل دعاء في عرفة:**
> لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ

### بعد الغروب: التحرك إلى مزدلفة
- مغادرة عرفة بعد الغروب
- جمع المغرب والعشاء في مزدلفة
- النوم تحت السماء المفتوحة
- جمع الحصى للرمي (49-70 حصاة)
- المغادرة بعد صلاة الفجر

---

## اليوم الثالث: 10 ذو الحجة (يوم النحر - يوم العيد)

أكثر يوم مزدحماً بالمناسك:

### 1. رمي جمرة العقبة الكبرى
- رمي 7 حصيات مع قول "الله أكبر" مع كل حصاة
- هذا يمثل رفض الشيطان
- التوقف عن التلبية بعد هذا

### 2. ذبح الهدي
- مطلوب للمتمتع والقارن
- يمكن أن يُذبح شخصياً أو يُوكل
- اللحم يُوزع على الفقراء

### 3. الحلق/التقصير
- الرجال: حلق الرأس كاملاً (أفضل) أو التقصير
- النساء: قص بمقدار أنملة

### 4. طواف الإفاضة
- الذهاب إلى مكة
- أداء الطواف حول الكعبة (7 أشواط)
- هذا ركن من أركان الحج

### 5. السعي بين الصفا والمروة
- 7 أشواط بين التلتين
- إذا لم يُؤدَ أثناء العمرة
- إحياء لذكرى بحث هاجر عن الماء

**بعد هذه المناسك:**
- التحلل الأول
- جميع المحظورات ترتفع عدا الجماع
- بعد الطواف: التحلل الكامل

---

## اليومان 4-5: 11-12 ذو الحجة (أيام التشريق)

### البقاء في منى
- العودة إلى الخيمة في منى
- رمي الجمرات الثلاث كل يوم:
  - الصغرى - 7 حصيات
  - الوسطى - 7 حصيات
  - الكبرى - 7 حصيات
- الدعاء بعد الصغرى والوسطى
- المغادرة بعد الرمي في اليوم 12 (للمتعجل)

### اليوم 13 ذو الحجة (اختياري)
- يمكن البقاء والرمي مرة أخرى
- الأفضل البقاء إن استطاع
- مغادرة منى بعد الظهر

---

## طواف الوداع

قبل مغادرة مكة:
- أداء الطواف الأخير حول الكعبة
- آخر عمل في مكة يكون عند الكعبة
- الحائض معفاة
- الدعاء عند الملتزم (بين الباب والحجر الأسود)

---

## ملخص الأركان

هذه أساسية - الحج باطل بدونها:

1. **الإحرام** - الدخول في الحالة المقدسة
2. **الوقوف بعرفة** - التواجد هناك في 9 ذو الحجة
3. **طواف الإفاضة** - الطواف بعد عرفة
4. **السعي** - بين الصفا والمروة

## ملخص الواجبات

تركها يوجب ذبيحة لكن الحج صحيح:

1. الإحرام من الميقات
2. الوقوف بعرفة حتى الغروب
3. المبيت بمزدلفة
4. المبيت بمنى
5. رمي الجمرات
6. الحلق/التقصير
7. طواف الوداع

تقبل الله حجكم وجعله حجاً مبروراً!
      `,
    },
    duration: 20,
    xpReward: 100,
    glossaryTerms: ["hajj", "ihram", "kaaba", "tawaf", "umrah"],
  },

  "hajj-umrah": {
    id: "hajj-umrah",
    chapterId: "hajj",
    title: {
      en: "Understanding Umrah",
      ar: "فهم العمرة",
    },
    content: {
      en: `
# Understanding Umrah: The Lesser Pilgrimage

Umrah is often called the "lesser pilgrimage" and can be performed at any time of the year, unlike Hajj which has specific dates.

## What is Umrah?

**Umrah** comes from the Arabic word meaning "to visit." It involves:
- Visiting the Kaaba in Makkah
- Performing specific rituals
- Can be done year-round
- Takes only a few hours to complete

## Umrah vs. Hajj

| Aspect | Umrah | Hajj |
|--------|-------|------|
| **Time** | Any time | 8-13 Dhul Hijjah |
| **Obligation** | Sunnah (recommended) | Fard (obligatory) |
| **Duration** | Few hours | 5-6 days |
| **Rituals** | Tawaf, Sa'i, Halq | All + Arafah, Mina, etc. |
| **Crowd** | Variable | Very crowded |

## The Rituals of Umrah

Umrah consists of four main rituals:

### 1. Ihram (إحرام)
The state of consecration:
- Enter from designated Miqat points
- Ghusl (full bath)
- Wear ihram garments
- Make intention: "Labbayk Allahumma 'Umrah"
- Begin reciting Talbiyah

### 2. Tawaf (طواف)
Circumambulating the Kaaba:
- 7 complete circuits counter-clockwise
- Start from Black Stone corner
- Say "Bismillah, Allahu Akbar" at Black Stone
- Make du'a throughout
- Men: First 3 circuits with Raml (fast walking)
- Pray 2 rak'ahs at Maqam Ibrahim after

### 3. Sa'i (سعي)
Walking between Safa and Marwa:
- Start at Safa, end at Marwa
- 7 one-way trips total
- Make du'a at each hill
- Men jog lightly between green markers
- Commemorates Hajar's search for water

### 4. Halq or Taqsir (حلق أو تقصير)
Shaving or cutting hair:
- Men: Shave head completely (better) or trim
- Women: Cut a fingertip length
- Signifies completion of Umrah
- Exit from state of Ihram

## Step-by-Step Umrah Guide

### Before Arrival
1. Make ghusl at home or Miqat
2. Wear ihram clothes
3. Pray 2 rak'ahs
4. Make intention for Umrah
5. Start Talbiyah

### At Masjid al-Haram
1. Enter with right foot, make du'a
2. Proceed to Kaaba
3. Stop Talbiyah upon seeing Kaaba
4. Make du'a (accepted time!)

### Performing Tawaf
1. Face Black Stone, raise hand, say "Bismillah, Allahu Akbar"
2. Begin counter-clockwise
3. Kaaba should be on your left
4. Complete 7 circuits
5. Pray 2 rak'ahs behind Maqam Ibrahim
6. Drink Zamzam water

### Performing Sa'i
1. Exit towards Safa
2. Climb Safa, face Kaaba, make du'a
3. Walk towards Marwa
4. At Marwa, face Kaaba, make du'a
5. Repeat until 7 trips complete
6. End at Marwa

### Completing Umrah
1. Men: Shave or trim hair
2. Women: Trim fingertip length
3. Change out of ihram
4. Umrah complete! Make shukr to Allah

## Recommended Du'as

### At Black Stone
> بِسْمِ اللهِ وَاللهُ أَكْبَرُ

### During Tawaf
> رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ

### At Safa and Marwa
> إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ

## Virtues of Umrah

The Prophet ﷺ said:

> "From one Umrah to another is an expiation for what comes between them."

> "Perform Hajj and Umrah consecutively, for they remove poverty and sins as the bellows removes impurity from iron."

## Tips for a Blessed Umrah

### Before You Go
- Learn the rituals properly
- Practice the du'as
- Prepare physically and spiritually
- Pack comfortable clothes

### During Umrah
- Stay focused and present
- Make sincere du'as
- Be patient with crowds
- Help fellow pilgrims
- Avoid arguments

### After Umrah
- Thank Allah for the opportunity
- Maintain the spiritual high
- Share your experience to inspire others
- Make du'a to return again

## Common Mistakes to Avoid

❌ Crossing in front of people praying
❌ Pushing or shoving during Tawaf
❌ Touching the Kaaba roughly
❌ Rushing through rituals
❌ Forgetting the intention
❌ Not learning the du'as beforehand

May Allah accept your Umrah and grant you many more visits to His House!
      `,
      ar: `
# فهم العمرة: الحج الأصغر

العمرة تُسمى غالباً "الحج الأصغر" ويمكن أداؤها في أي وقت من السنة، على عكس الحج الذي له تواريخ محددة.

## ما هي العمرة؟

**العمرة** مشتقة من الكلمة العربية التي تعني "الزيارة". تشمل:
- زيارة الكعبة في مكة
- أداء مناسك محددة
- يمكن أداؤها على مدار السنة
- تستغرق بضع ساعات فقط

## العمرة مقابل الحج

| الجانب | العمرة | الحج |
|--------|--------|------|
| **الوقت** | أي وقت | 8-13 ذو الحجة |
| **الحكم** | سنة (مستحبة) | فرض (واجب) |
| **المدة** | بضع ساعات | 5-6 أيام |
| **المناسك** | طواف، سعي، حلق | الكل + عرفة، منى، إلخ |
| **الازدحام** | متغير | مزدحم جداً |

## مناسك العمرة

تتكون العمرة من أربعة مناسك رئيسية:

### 1. الإحرام
حالة التقديس:
- الدخول من نقاط الميقات المحددة
- الغسل
- لبس ملابس الإحرام
- النية: "لبيك اللهم عمرة"
- البدء بالتلبية

### 2. الطواف
الدوران حول الكعبة:
- 7 أشواط كاملة عكس عقارب الساعة
- البدء من ركن الحجر الأسود
- قول "بسم الله، الله أكبر" عند الحجر الأسود
- الدعاء طوال الطواف
- الرجال: أول 3 أشواط بالرمل (المشي السريع)
- صلاة ركعتين عند مقام إبراهيم بعد الطواف

### 3. السعي
المشي بين الصفا والمروة:
- البدء من الصفا، الانتهاء عند المروة
- 7 أشواط ذهاباً وإياباً
- الدعاء عند كل تل
- الرجال يهرولون بين العلامات الخضراء
- إحياء لذكرى بحث هاجر عن الماء

### 4. الحلق أو التقصير
حلق أو قص الشعر:
- الرجال: حلق الرأس كاملاً (أفضل) أو التقصير
- النساء: قص بمقدار أنملة
- يدل على اكتمال العمرة
- الخروج من حالة الإحرام

## دليل العمرة خطوة بخطوة

### قبل الوصول
1. الاغتسال في المنزل أو الميقات
2. لبس ملابس الإحرام
3. صلاة ركعتين
4. النية للعمرة
5. البدء بالتلبية

### في المسجد الحرام
1. الدخول بالقدم اليمنى، الدعاء
2. التوجه إلى الكعبة
3. التوقف عن التلبية عند رؤية الكعبة
4. الدعاء (وقت مستجاب!)

### أداء الطواف
1. مواجهة الحجر الأسود، رفع اليد، قول "بسم الله، الله أكبر"
2. البدء عكس عقارب الساعة
3. الكعبة على يسارك
4. إكمال 7 أشواط
5. صلاة ركعتين خلف مقام إبراهيم
6. شرب ماء زمزم

### أداء السعي
1. الخروج نحو الصفا
2. صعود الصفا، مواجهة الكعبة، الدعاء
3. المشي نحو المروة
4. عند المروة، مواجهة الكعبة، الدعاء
5. التكرار حتى إكمال 7 أشواط
6. الانتهاء عند المروة

### إتمام العمرة
1. الرجال: حلق أو تقصير الشعر
2. النساء: تقصير بمقدار أنملة
3. تغيير ملابس الإحرام
4. اكتملت العمرة! الحمد لله

## الأدعية المستحبة

### عند الحجر الأسود
> بِسْمِ اللهِ وَاللهُ أَكْبَرُ

### أثناء الطواف
> رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ

### عند الصفا والمروة
> إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ

## فضائل العمرة

قال النبي ﷺ:

> "العمرة إلى العمرة كفارة لما بينهما"

> "تابعوا بين الحج والعمرة، فإنهما ينفيان الفقر والذنوب كما ينفي الكير خبث الحديد"

## نصائح لعمرة مباركة

### قبل الذهاب
- تعلم المناسك جيداً
- تدرب على الأدعية
- استعد جسدياً وروحياً
- احزم ملابس مريحة

### أثناء العمرة
- ابقَ مركزاً وحاضراً
- ادعُ بإخلاص
- تحلَّ بالصبر مع الزحام
- ساعد الحجاج الآخرين
- تجنب الجدال

### بعد العمرة
- اشكر الله على الفرصة
- حافظ على الروحانية العالية
- شارك تجربتك لإلهام الآخرين
- ادعُ بالعودة مرة أخرى

## أخطاء شائعة يجب تجنبها

❌ المرور أمام المصلين
❌ الدفع أثناء الطواف
❌ لمس الكعبة بخشونة
❌ التسرع في المناسك
❌ نسيان النية
❌ عدم تعلم الأدعية مسبقاً

تقبل الله عمرتكم ورزقكم زيارات كثيرة لبيته!
      `,
    },
    duration: 12,
    xpReward: 60,
    glossaryTerms: ["umrah", "hajj", "kaaba", "ihram", "tawaf"],
  },

  "hajj-quiz": {
    id: "hajj-quiz",
    chapterId: "hajj",
    title: {
      en: "Hajj Quiz",
      ar: "اختبار الحج",
    },
    type: "quiz",
    content: { en: "", ar: "" },
    duration: 5,
    xpReward: 100,
    quiz: [
      {
        id: "hajj-q1",
        question: {
          en: "Which day of Hajj is considered the most important?",
          ar: "أي يوم من أيام الحج يُعتبر الأهم؟",
        },
        options: [
          {
            en: "8th Dhul Hijjah - Day of Tarwiyah",
            ar: "8 ذو الحجة - يوم التروية",
          },
          {
            en: "9th Dhul Hijjah - Day of Arafah",
            ar: "9 ذو الحجة - يوم عرفة",
          },
          {
            en: "10th Dhul Hijjah - Day of Sacrifice",
            ar: "10 ذو الحجة - يوم النحر",
          },
          {
            en: "11th Dhul Hijjah - Day of Tashreeq",
            ar: "11 ذو الحجة - يوم التشريق",
          },
        ],
        correctAnswer: 1,
        explanation: {
          en: "The Prophet ﷺ said 'Hajj is Arafah' - standing at Arafah on the 9th of Dhul Hijjah is the most essential pillar of Hajj.",
          ar: "قال النبي ﷺ 'الحج عرفة' - الوقوف بعرفة في التاسع من ذي الحجة هو أهم ركن في الحج.",
        },
      },
      {
        id: "hajj-q2",
        question: {
          en: "What is the sacred state a pilgrim enters before Hajj called?",
          ar: "ما اسم الحالة المقدسة التي يدخلها الحاج قبل الحج؟",
        },
        options: [
          { en: "Tawaf", ar: "الطواف" },
          { en: "Ihram", ar: "الإحرام" },
          { en: "Sa'i", ar: "السعي" },
          { en: "Wuquf", ar: "الوقوف" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Ihram is the sacred state of ritual consecration that pilgrims must enter before performing Hajj or Umrah.",
          ar: "الإحرام هو حالة التقديس الشعائري التي يجب على الحجاج الدخول فيها قبل أداء الحج أو العمرة.",
        },
      },
      {
        id: "hajj-q3",
        question: {
          en: "How many circuits around the Kaaba are performed in Tawaf?",
          ar: "كم عدد الأشواط حول الكعبة في الطواف؟",
        },
        options: [
          { en: "3", ar: "3" },
          { en: "5", ar: "5" },
          { en: "7", ar: "7" },
          { en: "10", ar: "10" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Tawaf consists of 7 complete circuits (rounds) around the Kaaba, performed counter-clockwise.",
          ar: "الطواف يتكون من 7 أشواط كاملة حول الكعبة، تُؤدى عكس عقارب الساعة.",
        },
      },
      {
        id: "hajj-q4",
        question: {
          en: "What does Sa'i commemorate?",
          ar: "ماذا يُحيي السعي ذكراه؟",
        },
        options: [
          { en: "Prophet Ibrahim's sacrifice", ar: "ذبيحة النبي إبراهيم" },
          { en: "Hajar's search for water", ar: "بحث هاجر عن الماء" },
          { en: "The revelation of Quran", ar: "نزول القرآن" },
          { en: "Building of the Kaaba", ar: "بناء الكعبة" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Sa'i commemorates Hajar (Hagar) running between Safa and Marwa seven times searching for water for her son Ismail, until Zamzam spring appeared.",
          ar: "السعي يُحيي ذكرى هاجر وهي تركض بين الصفا والمروة سبع مرات بحثاً عن الماء لابنها إسماعيل، حتى ظهرت عين زمزم.",
        },
      },
      {
        id: "hajj-q5",
        question: {
          en: "Which of these is NOT a pillar (rukn) of Hajj?",
          ar: "أي من هذه ليس ركناً من أركان الحج؟",
        },
        options: [
          { en: "Standing at Arafah", ar: "الوقوف بعرفة" },
          { en: "Tawaf al-Ifadah", ar: "طواف الإفاضة" },
          { en: "Stoning the Jamarat", ar: "رمي الجمرات" },
          { en: "Sa'i between Safa and Marwa", ar: "السعي بين الصفا والمروة" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Stoning the Jamarat is a wajib (obligation), not a rukn (pillar). Missing a wajib requires a sacrifice, but the Hajj is valid. Missing a pillar invalidates the Hajj.",
          ar: "رمي الجمرات واجب وليس ركناً. ترك الواجب يوجب فدية لكن الحج صحيح. ترك الركن يُبطل الحج.",
        },
      },
    ],
  },
};

export default hajjLessons;
