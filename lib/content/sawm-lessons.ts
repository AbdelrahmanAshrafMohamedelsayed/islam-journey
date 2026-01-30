import type { LessonContent, QuizQuestion } from "./lessons";

// ============================================
// SAWM (FASTING) CHAPTER LESSONS
// ============================================

export const sawmLessons: Record<string, LessonContent> = {
  "sawm-meaning": {
    id: "sawm-meaning",
    chapterId: "sawm",
    title: {
      en: "The Purpose of Fasting",
      ar: "الحكمة من الصيام",
    },
    content: {
      en: `
# The Purpose of Fasting in Islam

Fasting (**Sawm** in Arabic) is the fourth pillar of Islam. During the month of Ramadan, Muslims abstain from food, drink, and other physical needs from dawn until sunset.

## The Divine Command

Allah says in the Quran:

> "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous (achieve Taqwa)." (Quran 2:183)

This verse reveals the ultimate purpose: **Taqwa** - God-consciousness, piety, and self-restraint.

## What is Sawm?

**Sawm** literally means "to refrain" or "to abstain." In Islamic terminology, it means:
- Abstaining from food and drink
- Abstaining from intimate relations
- Abstaining from sinful speech and actions
- From dawn (Fajr) to sunset (Maghrib)

## The Spiritual Benefits of Fasting

### 1. Developing Taqwa (God-Consciousness)
- Constant awareness of Allah
- Resisting temptation strengthens faith
- Every moment becomes an act of worship

### 2. Self-Discipline
- Control over desires and impulses
- Building willpower and patience
- Breaking bad habits

### 3. Empathy for the Poor
- Experiencing hunger firsthand
- Understanding the struggles of the needy
- Motivating charitable giving

### 4. Physical Purification
- Giving the digestive system rest
- Detoxifying the body
- Health benefits documented by science

### 5. Spiritual Reset
- Breaking from daily routines
- More time for worship and reflection
- Strengthening relationship with Quran

## The Month of Ramadan

Ramadan is the ninth month of the Islamic lunar calendar. It holds special significance:

### Why Ramadan?

> "The month of Ramadan [is that] in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion." (Quran 2:185)

The Quran was first revealed during Ramadan, making it the holiest month.

### The Night of Power (Laylatul Qadr)

> "The Night of Decree is better than a thousand months." (Quran 97:3)

This blessed night falls in the last ten nights of Ramadan, particularly the odd nights (21st, 23rd, 25th, 27th, 29th).

## Fasting Beyond Ramadan

While Ramadan fasting is obligatory, Muslims are encouraged to fast voluntarily:

| Voluntary Fasts | When |
|-----------------|------|
| Mondays & Thursdays | Weekly |
| 13th, 14th, 15th of lunar months | Monthly (Ayyam al-Bid) |
| Day of Arafah (9th Dhul Hijjah) | Yearly |
| Ashura (10th Muharram) | Yearly |
| Six days of Shawwal | After Ramadan |

## The Prophet's Guidance

The Prophet Muhammad ﷺ said:

> "Whoever fasts Ramadan with faith and seeking reward, his previous sins will be forgiven."

> "Fasting is a shield; when one of you is fasting, let him not use foul language or raise his voice in anger."

## Key Takeaways

1. **Fasting is training** - for the soul, mind, and body
2. **Ramadan is special** - but fasting extends throughout the year
3. **The goal is Taqwa** - not just abstaining from food
4. **Community matters** - Muslims fast together, strengthening bonds

In the next lesson, we'll learn the specific rules and requirements of fasting.
      `,
      ar: `
# الحكمة من الصيام في الإسلام

الصيام (**الصوم** بالعربية) هو الركن الرابع من أركان الإسلام. خلال شهر رمضان، يمتنع المسلمون عن الطعام والشراب والاحتياجات الجسدية الأخرى من الفجر حتى غروب الشمس.

## الأمر الإلهي

قال الله تعالى في القرآن:

> "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ" (البقرة: 183)

تكشف هذه الآية عن الهدف الأسمى: **التقوى** - الوعي بالله والورع وضبط النفس.

## ما هو الصوم؟

**الصوم** يعني حرفياً "الامتناع" أو "الكف". في المصطلح الإسلامي، يعني:
- الامتناع عن الطعام والشراب
- الامتناع عن العلاقات الحميمة
- الامتناع عن الكلام والأفعال المحرمة
- من الفجر إلى المغرب

## الفوائد الروحية للصيام

### 1. تنمية التقوى (الوعي بالله)
- الوعي الدائم بالله
- مقاومة الإغراء تقوي الإيمان
- كل لحظة تصبح عبادة

### 2. ضبط النفس
- السيطرة على الرغبات والنزوات
- بناء قوة الإرادة والصبر
- كسر العادات السيئة

### 3. التعاطف مع الفقراء
- تجربة الجوع بشكل مباشر
- فهم معاناة المحتاجين
- تحفيز العطاء الخيري

### 4. التطهير الجسدي
- إراحة الجهاز الهضمي
- تنقية الجسم من السموم
- فوائد صحية موثقة علمياً

### 5. التجديد الروحي
- الانقطاع عن الروتين اليومي
- مزيد من الوقت للعبادة والتأمل
- تقوية العلاقة مع القرآن

## شهر رمضان

رمضان هو الشهر التاسع من التقويم الهجري القمري. له أهمية خاصة:

### لماذا رمضان؟

> "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ" (البقرة: 185)

القرآن أُنزل لأول مرة في رمضان، مما يجعله أقدس الشهور.

### ليلة القدر

> "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ" (القدر: 3)

هذه الليلة المباركة تقع في العشر الأواخر من رمضان، خاصة الليالي الوترية (21، 23، 25، 27، 29).

## الصيام خارج رمضان

بينما صيام رمضان واجب، يُشجع المسلمون على الصيام التطوعي:

| الصيام التطوعي | متى |
|----------------|-----|
| الإثنين والخميس | أسبوعياً |
| 13، 14، 15 من الشهر القمري | شهرياً (أيام البيض) |
| يوم عرفة (9 ذو الحجة) | سنوياً |
| عاشوراء (10 محرم) | سنوياً |
| ستة أيام من شوال | بعد رمضان |

## هدي النبي

قال النبي محمد ﷺ:

> "من صام رمضان إيماناً واحتساباً غُفر له ما تقدم من ذنبه"

> "الصيام جُنة، فإذا كان يوم صوم أحدكم فلا يرفث ولا يصخب"

## النقاط الرئيسية

1. **الصيام تدريب** - للروح والعقل والجسد
2. **رمضان خاص** - لكن الصيام يمتد طوال العام
3. **الهدف التقوى** - وليس مجرد الامتناع عن الطعام
4. **المجتمع مهم** - المسلمون يصومون معاً، مما يقوي الروابط

في الدرس التالي، سنتعلم القواعد والمتطلبات المحددة للصيام.
      `,
    },
    duration: 10,
    xpReward: 50,
    glossaryTerms: ["sawm", "ramadan", "taqwa"],
  },

  "sawm-rules": {
    id: "sawm-rules",
    chapterId: "sawm",
    title: {
      en: "Rules of Fasting",
      ar: "أحكام الصيام",
    },
    content: {
      en: `
# Rules of Fasting in Islam

Understanding the rules of fasting ensures that your fast is valid and rewarding. Let's explore what's required, what breaks the fast, and what's permissible.

## Who Must Fast?

Fasting in Ramadan is obligatory for every Muslim who is:

✅ **Adult** (reached puberty)
✅ **Sane** (mentally capable)
✅ **Healthy** (able to fast without harm)
✅ **Not traveling** (though travelers may fast if able)
✅ **Women not menstruating or in post-natal bleeding**

## Essential Elements of Fasting

### 1. Intention (Niyyah)
- Make intention before Fajr each night
- Intention should be in the heart
- Can be verbal: "I intend to fast tomorrow for the sake of Allah"

### 2. Abstaining from Dawn to Sunset
- Begins at **Fajr** (true dawn)
- Ends at **Maghrib** (sunset)
- Listen for the Adhan or check prayer times

## What BREAKS the Fast

These actions invalidate the fast and require making it up later:

### 🚫 Food and Drink
- Eating anything intentionally
- Drinking any liquid
- Swallowing anything that has substance

### 🚫 Intimate Relations
- Sexual intercourse during fasting hours

### 🚫 Intentional Vomiting
- Making oneself vomit deliberately

### 🚫 Menstruation or Post-Natal Bleeding
- When it begins, the fast is broken
- Must be made up later

## What Does NOT Break the Fast

These are permissible and don't invalidate your fast:

### ✅ Permissible Actions
- **Eating/drinking by forgetfulness** - Continue fasting, it's valid
- **Unintentional vomiting** - Fast remains valid
- **Swallowing saliva** - Natural and unavoidable
- **Rinsing mouth or nose** - Be careful not to swallow
- **Showering or bathing** - Even swimming is okay
- **Using eye/ear drops** - Most scholars say it's fine
- **Blood tests** - Small amounts don't break fast
- **Brushing teeth** - Use miswak or be careful with toothpaste
- **Injections** - Non-nutritive injections are okay
- **Asthma inhalers** - Necessary for breathing

## Suhoor and Iftar

### Suhoor (Pre-Dawn Meal)
- Eat before Fajr begins
- Highly recommended (Sunnah)
- Prophet ﷺ said: "Take suhoor, for in suhoor there is blessing"
- Even a sip of water counts

### Iftar (Breaking the Fast)
- Break fast immediately at Maghrib
- Start with dates and water (Sunnah)
- Recite: "ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله"
- "The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills"

## Making Up Missed Fasts

If you miss fasts, you must make them up:

| Reason | Ruling |
|--------|--------|
| Illness | Make up when recovered |
| Travel | Make up after returning |
| Menstruation | Make up after Ramadan |
| Pregnancy/Nursing | Make up when able |
| Old age/Chronic illness | Pay Fidyah instead |

### Fidyah
If unable to fast due to permanent illness or old age:
- Feed one poor person for each day missed
- About 1.5kg of staple food per day
- Or equivalent monetary value

### Kaffarah
For deliberately breaking fast without valid reason:
- Free a slave (not applicable today), OR
- Fast 60 consecutive days, OR
- Feed 60 poor people

## Recommended Acts While Fasting

Maximize your Ramadan with these actions:

1. 📖 **Read Quran daily** - Complete it if possible
2. 🤲 **Make extra du'a** - Especially before iftar
3. 🕌 **Pray Tarawih** - Special night prayers
4. 💰 **Give charity** - Rewards multiplied in Ramadan
5. 🤐 **Guard your tongue** - Avoid gossip and arguing
6. 😴 **Rest when needed** - Conserve energy for worship
7. 🍽️ **Don't overeat at iftar** - Defeats the purpose

## Common Mistakes to Avoid

❌ Missing Suhoor intentionally
❌ Overeating at Iftar
❌ Sleeping through Fajr
❌ Wasting time on entertainment
❌ Getting angry or arguing
❌ Forgetting the spiritual purpose

Remember: Fasting is more than hunger. The Prophet ﷺ said:
> "Whoever does not give up false speech and acting upon it, Allah has no need of his giving up food and drink."
      `,
      ar: `
# أحكام الصيام في الإسلام

فهم أحكام الصيام يضمن أن يكون صيامك صحيحاً ومأجوراً. دعونا نستكشف ما هو مطلوب، وما يُفسد الصيام، وما هو جائز.

## من يجب عليه الصيام؟

الصيام في رمضان واجب على كل مسلم:

✅ **بالغ** (وصل سن البلوغ)
✅ **عاقل** (قادر عقلياً)
✅ **صحيح** (قادر على الصيام دون ضرر)
✅ **غير مسافر** (وإن كان للمسافر الصيام إن استطاع)
✅ **المرأة غير حائض أو نفساء**

## أركان الصيام

### 1. النية
- اعقد النية قبل الفجر كل ليلة
- النية محلها القلب
- يمكن أن تكون بالقول: "نويت صيام غد لله تعالى"

### 2. الإمساك من الفجر إلى المغرب
- يبدأ عند **الفجر** (الفجر الصادق)
- ينتهي عند **المغرب** (غروب الشمس)
- استمع للأذان أو تحقق من أوقات الصلاة

## ما يُفسد الصيام

هذه الأفعال تُبطل الصيام وتوجب القضاء:

### 🚫 الأكل والشرب
- الأكل متعمداً
- شرب أي سائل
- بلع أي شيء له جسم

### 🚫 الجماع
- الجماع أثناء ساعات الصيام

### 🚫 التقيؤ المتعمد
- استفراغ النفس عمداً

### 🚫 الحيض أو النفاس
- عند بدئه، يُفسد الصيام
- يجب القضاء لاحقاً

## ما لا يُفسد الصيام

هذه الأمور جائزة ولا تُبطل الصيام:

### ✅ الأفعال الجائزة
- **الأكل/الشرب نسياناً** - أكمل صيامك، فهو صحيح
- **القيء غير المتعمد** - الصيام صحيح
- **بلع الريق** - طبيعي ولا يمكن تجنبه
- **المضمضة والاستنشاق** - احذر من البلع
- **الاستحمام** - حتى السباحة جائزة
- **قطرات العين/الأذن** - أكثر العلماء يجيزها
- **تحاليل الدم** - الكميات الصغيرة لا تفسد
- **تنظيف الأسنان** - استخدم السواك أو احذر من المعجون
- **الحقن** - الحقن غير المغذية جائزة
- **بخاخات الربو** - ضرورية للتنفس

## السحور والإفطار

### السحور
- تناوله قبل دخول الفجر
- مستحب جداً (سنة)
- قال النبي ﷺ: "تسحروا فإن في السحور بركة"
- حتى رشفة ماء تكفي

### الإفطار
- أفطر فور دخول المغرب
- ابدأ بالتمر والماء (سنة)
- قل: "ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله"

## قضاء الصيام الفائت

إذا فاتك الصيام، عليك قضاؤه:

| السبب | الحكم |
|-------|-------|
| المرض | القضاء عند الشفاء |
| السفر | القضاء بعد العودة |
| الحيض | القضاء بعد رمضان |
| الحمل/الرضاعة | القضاء عند القدرة |
| الشيخوخة/المرض المزمن | دفع الفدية بدلاً |

### الفدية
إذا عجزت عن الصيام بسبب مرض دائم أو شيخوخة:
- إطعام مسكين عن كل يوم
- حوالي 1.5 كجم من طعام القوت الأساسي يومياً
- أو قيمتها النقدية

### الكفارة
لمن أفطر متعمداً بدون عذر شرعي:
- عتق رقبة (غير منطبق اليوم)، أو
- صيام 60 يوماً متتالياً، أو
- إطعام 60 مسكيناً

## المستحبات أثناء الصيام

استثمر رمضانك بهذه الأعمال:

1. 📖 **اقرأ القرآن يومياً** - أكمله إن استطعت
2. 🤲 **أكثر من الدعاء** - خاصة قبل الإفطار
3. 🕌 **صلِّ التراويح** - صلاة الليل الخاصة
4. 💰 **تصدق** - الأجر مضاعف في رمضان
5. 🤐 **احفظ لسانك** - تجنب الغيبة والجدال
6. 😴 **ارتح عند الحاجة** - وفر طاقتك للعبادة
7. 🍽️ **لا تُسرف في الإفطار** - هذا يُفسد الغرض

## أخطاء شائعة يجب تجنبها

❌ ترك السحور عمداً
❌ الإسراف في الإفطار
❌ النوم عن صلاة الفجر
❌ إضاعة الوقت في الترفيه
❌ الغضب والجدال
❌ نسيان الغرض الروحي

تذكر: الصيام أكثر من الجوع. قال النبي ﷺ:
> "من لم يدع قول الزور والعمل به فليس لله حاجة في أن يدع طعامه وشرابه"
      `,
    },
    duration: 15,
    xpReward: 75,
    glossaryTerms: ["sawm", "ramadan", "fajr", "maghrib", "sunnah"],
  },

  "sawm-ramadan": {
    id: "sawm-ramadan",
    chapterId: "sawm",
    title: {
      en: "The Month of Ramadan",
      ar: "شهر رمضان",
    },
    content: {
      en: `
# The Blessed Month of Ramadan

Ramadan is the most sacred month in the Islamic calendar. It's a time of intense spiritual reflection, self-improvement, and heightened devotion.

## The Significance of Ramadan

### The Month of Revelation
The Quran was first revealed to Prophet Muhammad ﷺ during Ramadan:

> "The month of Ramadan [is that] in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion." (Quran 2:185)

### A Month of Mercy
The Prophet ﷺ said:
> "When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained."

## The Structure of Ramadan

### Daily Schedule
| Time | Activity |
|------|----------|
| Before Fajr | Suhoor (pre-dawn meal) |
| Fajr | Morning prayer, Quran |
| Daytime | Fasting, work, Quran, dhikr |
| Asr | Afternoon prayer, rest |
| Maghrib | Iftar, Maghrib prayer |
| Isha | Night prayer, Tarawih |
| Late night | Qiyam, tahajjud |

### The Three Stages of Ramadan

**First 10 Days: Mercy (Rahmah)**
- Focus on seeking Allah's mercy
- Du'a: "يا أرحم الراحمين ارحمنا"

**Second 10 Days: Forgiveness (Maghfirah)**
- Focus on seeking forgiveness
- Du'a: "اللهم اغفر لي ذنوبي"

**Last 10 Days: Freedom from Hellfire ('Itq min an-Nar)**
- Intensify worship, seek Laylatul Qadr
- Du'a: "اللهم أجرني من النار"

## Tarawih Prayer

Special night prayers performed in Ramadan after Isha:
- 8 or 20 rak'ahs (units)
- Performed in congregation at the mosque
- Quran is often recited completely over the month
- Great reward for attending

### How to Pray Tarawih
1. Pray 2 rak'ahs at a time
2. Take short breaks between sets
3. Listen to Quran recitation
4. Make du'a during breaks
5. End with Witr prayer

## Laylatul Qadr (Night of Power)

The most blessed night of the year:

> "The Night of Decree is better than a thousand months." (Quran 97:3)

### When is it?
- In the last 10 nights of Ramadan
- Most likely on odd nights: 21, 23, 25, 27, 29
- 27th night is commonly emphasized

### What to Do
- Stay awake for worship
- Pray Qiyam/Tahajjud
- Recite Quran
- Make lots of du'a
- Recite: "اللهم إنك عفو تحب العفو فاعف عني"
- "O Allah, You are Forgiving and love forgiveness, so forgive me"

## I'tikaf (Spiritual Retreat)

Secluding oneself in the mosque during the last 10 days:
- Complete devotion to worship
- Following the Prophet's Sunnah
- Can be any duration
- Women can do it at home or mosque

## Zakat al-Fitr

Obligatory charity before Eid:
- Must be paid before Eid prayer
- Approximately 2.5kg of staple food
- Or monetary equivalent
- Given on behalf of every family member
- Purpose: purify the fast, help the poor celebrate Eid

## Eid al-Fitr

The celebration marking the end of Ramadan:

### Eid Day Sunnah
1. Take ghusl (full bath)
2. Wear best clothes
3. Eat dates before Eid prayer
4. Go to prayer ground/mosque
5. Take different routes to and from
6. Say takbir: "الله أكبر الله أكبر، لا إله إلا الله"
7. Pray Eid prayer (2 rak'ahs)
8. Listen to the khutbah
9. Visit family and friends
10. Give gifts, especially to children

## Maximizing Your Ramadan

### Daily Goals
- ☐ Pray all 5 prayers on time
- ☐ Read at least 1 juz (part) of Quran
- ☐ Make dhikr after each prayer
- ☐ Give charity (even small amounts)
- ☐ Make du'a before iftar
- ☐ Attend Tarawih prayer
- ☐ Avoid backbiting and negativity

### Spiritual Checklist
- ☐ Seek forgiveness from others
- ☐ Forgive those who wronged you
- ☐ Fix broken relationships
- ☐ Increase in dhikr
- ☐ Learn something new about Islam
- ☐ Teach others what you know

May Allah accept your fasting and grant you the blessings of Ramadan!
      `,
      ar: `
# شهر رمضان المبارك

رمضان هو أقدس شهر في التقويم الإسلامي. إنه وقت للتأمل الروحي المكثف والتحسن الذاتي وتعميق العبادة.

## أهمية رمضان

### شهر الوحي
القرآن أُنزل أول مرة على النبي محمد ﷺ في رمضان:

> "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ" (البقرة: 185)

### شهر الرحمة
قال النبي ﷺ:
> "إذا دخل رمضان فُتحت أبواب الجنة، وغُلقت أبواب النار، وصُفدت الشياطين"

## هيكل رمضان

### الجدول اليومي
| الوقت | النشاط |
|-------|--------|
| قبل الفجر | السحور |
| الفجر | صلاة الصبح، القرآن |
| النهار | الصيام، العمل، القرآن، الذكر |
| العصر | صلاة العصر، الراحة |
| المغرب | الإفطار، صلاة المغرب |
| العشاء | صلاة العشاء، التراويح |
| آخر الليل | القيام، التهجد |

### مراحل رمضان الثلاث

**العشر الأولى: الرحمة**
- التركيز على طلب رحمة الله
- الدعاء: "يا أرحم الراحمين ارحمنا"

**العشر الوسطى: المغفرة**
- التركيز على طلب المغفرة
- الدعاء: "اللهم اغفر لي ذنوبي"

**العشر الأخيرة: العتق من النار**
- تكثيف العبادة، تحري ليلة القدر
- الدعاء: "اللهم أجرني من النار"

## صلاة التراويح

صلاة الليل الخاصة برمضان بعد العشاء:
- 8 أو 20 ركعة
- تُصلى جماعة في المسجد
- غالباً يُختم القرآن خلال الشهر
- أجرها عظيم

### كيفية صلاة التراويح
1. صلِّ ركعتين ركعتين
2. خذ استراحات قصيرة بين كل ركعتين
3. استمع لتلاوة القرآن
4. ادعُ في الاستراحات
5. اختم بصلاة الوتر

## ليلة القدر

أبرك ليلة في السنة:

> "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ" (القدر: 3)

### متى هي؟
- في العشر الأواخر من رمضان
- الأرجح في الليالي الوترية: 21، 23، 25، 27، 29
- ليلة 27 هي الأشهر

### ماذا تفعل
- اسهر للعبادة
- صلِّ القيام/التهجد
- اقرأ القرآن
- أكثر من الدعاء
- ادعُ: "اللهم إنك عفو تحب العفو فاعف عني"

## الاعتكاف

الإقامة في المسجد في العشر الأواخر:
- التفرغ الكامل للعبادة
- اتباع سنة النبي
- يمكن أن يكون لأي مدة
- المرأة يمكنها الاعتكاف في البيت أو المسجد

## زكاة الفطر

صدقة واجبة قبل العيد:
- تُدفع قبل صلاة العيد
- حوالي 2.5 كجم من طعام القوت
- أو ما يعادلها نقداً
- تُدفع عن كل فرد من الأسرة
- الغرض: تطهير الصيام، مساعدة الفقراء للاحتفال بالعيد

## عيد الفطر

الاحتفال بنهاية رمضان:

### سنن يوم العيد
1. الاغتسال
2. لبس أفضل الثياب
3. أكل التمر قبل صلاة العيد
4. الذهاب للمصلى/المسجد
5. الذهاب من طريق والعودة من آخر
6. التكبير: "الله أكبر الله أكبر، لا إله إلا الله"
7. صلاة العيد (ركعتان)
8. الاستماع للخطبة
9. زيارة الأهل والأصدقاء
10. إعطاء الهدايا، خاصة للأطفال

## استثمار رمضان

### الأهداف اليومية
- ☐ صلاة الخمس في وقتها
- ☐ قراءة جزء واحد على الأقل من القرآن
- ☐ الذكر بعد كل صلاة
- ☐ الصدقة (ولو مبالغ صغيرة)
- ☐ الدعاء قبل الإفطار
- ☐ حضور صلاة التراويح
- ☐ تجنب الغيبة والسلبية

### قائمة روحية
- ☐ طلب السماح من الآخرين
- ☐ مسامحة من أساء إليك
- ☐ إصلاح العلاقات المقطوعة
- ☐ الإكثار من الذكر
- ☐ تعلم شيء جديد عن الإسلام
- ☐ تعليم الآخرين ما تعرفه

تقبل الله صيامكم وأعانكم على بركات رمضان!
      `,
    },
    duration: 12,
    xpReward: 60,
    glossaryTerms: ["ramadan", "tarawih", "eid"],
  },

  "sawm-exemptions": {
    id: "sawm-exemptions",
    chapterId: "sawm",
    title: {
      en: "Exemptions from Fasting",
      ar: "الإعفاءات من الصيام",
    },
    content: {
      en: `
# Who is Exempt from Fasting?

Islam recognizes that not everyone can fast safely or practically. Allah says:

> "Allah intends for you ease and does not intend for you hardship." (Quran 2:185)

## Categories of Exemptions

### 1. Travelers
**Ruling:** May break fast, must make up later

- Long-distance travel (approximately 80+ km)
- During the journey itself
- Can choose to fast if not difficult
- Make up missed days after Ramadan

> "And whoever is ill or on a journey - then an equal number of other days." (Quran 2:185)

### 2. Sick Persons

**Temporary Illness:**
- May break fast
- Must make up when recovered

**Chronic/Terminal Illness:**
- Permanently exempt if fasting causes harm
- Must pay Fidyah (feed one poor person per day)

**Mental Illness:**
- If unable to understand the obligation
- No fasting or Fidyah required

### 3. Pregnant Women

**If fasting may harm:**
- The mother
- The unborn baby
- Either one

**Ruling varies by scholars:**
- Some say: Make up only
- Others say: Make up + Fidyah
- Consult a knowledgeable scholar

### 4. Breastfeeding Mothers

**If fasting would:**
- Reduce milk supply
- Harm the baby
- Cause excessive weakness

**Ruling:**
- May break fast
- Make up later (and possibly Fidyah)
- Each situation is different

### 5. Elderly

**If unable to fast:**
- Very old age
- Extreme weakness
- No hope of recovery

**Ruling:**
- Exempt from fasting
- Must pay Fidyah only
- No make-up required

### 6. Menstruating Women

**During menstruation:**
- Fasting is not valid
- Must break the fast
- No sin in this - it's Allah's command

**After Ramadan:**
- Must make up all missed days
- No Fidyah required

### 7. Women in Post-Natal Bleeding (Nifas)

**Same ruling as menstruation:**
- Cannot fast during bleeding
- Make up missed days later
- Period varies (up to 40 days)

### 8. Children

**Before puberty:**
- Not obligated to fast
- Encouraged to practice
- Start gradually (half day, etc.)

**After puberty:**
- Fully obligated
- No exemption based on age alone

## How to Calculate Fidyah

**Rate:** Feed one poor person for each missed day

**Amount per day:**
- Approximately 1.5 kg of staple food, OR
- The cost of one meal
- Varies by location - check local guidelines

**Example:**
- Missed 30 days × $10/day = $300 Fidyah
- Can be given to one person or many
- Can be paid all at once

## Making Up Missed Fasts (Qada)

### Rules for Qada:
1. **Before next Ramadan** - Ideally complete before the next Ramadan arrives
2. **Consecutively or not** - Can be spread throughout the year
3. **Intention** - Make intention for each make-up fast
4. **Priority** - Complete obligatory fasts before voluntary ones

### What if next Ramadan arrives?
- Fast the current Ramadan first
- Make up previous year's fasts after
- Some scholars say: pay Fidyah for delay + make up

## Special Situations

### Exams or Work
- Not valid excuses to break fast
- Plan ahead, adjust schedule
- Seek Allah's help

### Starting a New Medication
- Consult doctor about timing
- Many medicines can be taken at night
- If absolutely necessary during day, break fast and make up

### Sports/Athletics
- Not an exemption
- Adjust training times if possible
- Professional athletes should consult scholars

## Important Reminders

✅ **Always intend to fast** unless clearly exempt
✅ **Consult knowledgeable scholars** for complex situations
✅ **Don't be hasty** in seeking exemptions
✅ **Trust Allah's wisdom** in the obligation
✅ **Be grateful** for the ability to fast

Remember: Missing Ramadan fasts is a serious matter. Make them up as soon as possible and don't delay without valid reason.
      `,
      ar: `
# من يُعفى من الصيام؟

الإسلام يدرك أن ليس كل شخص يمكنه الصيام بأمان أو بشكل عملي. قال الله تعالى:

> "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ" (البقرة: 185)

## فئات الإعفاءات

### 1. المسافرون
**الحكم:** يجوز الإفطار، مع وجوب القضاء لاحقاً

- السفر لمسافة طويلة (حوالي 80+ كم)
- خلال الرحلة نفسها
- يمكن اختيار الصيام إذا لم يكن صعباً
- قضاء الأيام الفائتة بعد رمضان

> "فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ" (البقرة: 185)

### 2. المرضى

**المرض المؤقت:**
- يجوز الإفطار
- يجب القضاء عند الشفاء

**المرض المزمن/العضال:**
- معفى بشكل دائم إذا كان الصيام يسبب ضرراً
- يجب دفع الفدية (إطعام مسكين عن كل يوم)

**المرض العقلي:**
- إذا كان غير قادر على فهم الواجب
- لا صيام ولا فدية مطلوبة

### 3. الحوامل

**إذا كان الصيام قد يضر:**
- الأم
- الجنين
- أيهما

**الحكم يختلف حسب العلماء:**
- بعضهم يقول: القضاء فقط
- آخرون يقولون: القضاء + الفدية
- استشر عالماً متخصصاً

### 4. المرضعات

**إذا كان الصيام:**
- يقلل إدرار الحليب
- يضر الطفل
- يسبب ضعفاً شديداً

**الحكم:**
- يجوز الإفطار
- القضاء لاحقاً (وربما الفدية)
- كل حالة مختلفة

### 5. كبار السن

**إذا عجز عن الصيام:**
- تقدم السن الشديد
- الضعف الشديد
- لا أمل في الشفاء

**الحكم:**
- معفى من الصيام
- يجب دفع الفدية فقط
- لا قضاء مطلوب

### 6. الحائض

**أثناء الحيض:**
- الصيام غير صحيح
- يجب الإفطار
- لا إثم في ذلك - إنه أمر الله

**بعد رمضان:**
- يجب قضاء جميع الأيام الفائتة
- لا فدية مطلوبة

### 7. النفساء

**نفس حكم الحائض:**
- لا يصح الصيام أثناء النفاس
- قضاء الأيام الفائتة لاحقاً
- المدة تختلف (حتى 40 يوماً)

### 8. الأطفال

**قبل البلوغ:**
- غير ملزمين بالصيام
- يُشجعون على التدريب
- البدء تدريجياً (نصف يوم، إلخ)

**بعد البلوغ:**
- ملزمون بالكامل
- لا إعفاء بناءً على العمر وحده

## كيفية حساب الفدية

**المعدل:** إطعام مسكين عن كل يوم فائت

**المبلغ يومياً:**
- حوالي 1.5 كجم من طعام القوت، أو
- تكلفة وجبة واحدة
- يختلف حسب الموقع - راجع الإرشادات المحلية

**مثال:**
- 30 يوماً فائتة × 10$/يوم = 300$ فدية
- يمكن إعطاؤها لشخص واحد أو عدة أشخاص
- يمكن دفعها دفعة واحدة

## قضاء الصيام الفائت

### قواعد القضاء:
1. **قبل رمضان القادم** - يُفضل إكماله قبل دخول رمضان التالي
2. **متتالياً أو لا** - يمكن توزيعه على مدار السنة
3. **النية** - اعقد النية لكل يوم قضاء
4. **الأولوية** - أكمل الصيام الواجب قبل التطوعي

### ماذا لو دخل رمضان التالي؟
- صم رمضان الحالي أولاً
- اقضِ صيام العام السابق بعده
- بعض العلماء يقولون: ادفع فدية التأخير + القضاء

## حالات خاصة

### الامتحانات أو العمل
- ليست أعذاراً صحيحة للإفطار
- خطط مسبقاً، عدّل جدولك
- استعن بالله

### بدء دواء جديد
- استشر الطبيب حول التوقيت
- كثير من الأدوية يمكن تناولها ليلاً
- إذا كان ضرورياً أثناء النهار، أفطر واقضِ

### الرياضة
- ليست إعفاءً
- عدّل أوقات التدريب إن أمكن
- الرياضيون المحترفون يستشيرون العلماء

## تذكيرات مهمة

✅ **انوِ الصيام دائماً** ما لم تكن معفياً بوضوح
✅ **استشر العلماء المتخصصين** للحالات المعقدة
✅ **لا تتسرع** في طلب الإعفاءات
✅ **ثق في حكمة الله** في الفريضة
✅ **كن شاكراً** على القدرة على الصيام

تذكر: تفويت صيام رمضان أمر خطير. اقضِه في أقرب وقت ممكن ولا تؤخر بدون عذر صحيح.
      `,
    },
    duration: 10,
    xpReward: 50,
    glossaryTerms: ["sawm", "ramadan"],
  },

  "sawm-quiz": {
    id: "sawm-quiz",
    chapterId: "sawm",
    title: {
      en: "Fasting Quiz",
      ar: "اختبار الصيام",
    },
    type: "quiz",
    content: { en: "", ar: "" },
    duration: 5,
    xpReward: 100,
    quiz: [
      {
        id: "sawm-q1",
        question: {
          en: "What is the primary purpose of fasting mentioned in Quran 2:183?",
          ar: "ما هو الهدف الأساسي من الصيام المذكور في سورة البقرة آية 183؟",
        },
        options: [
          { en: "To lose weight", ar: "لإنقاص الوزن" },
          { en: "To achieve Taqwa (God-consciousness)", ar: "لتحقيق التقوى" },
          { en: "To save money on food", ar: "لتوفير المال على الطعام" },
          { en: "To sleep more", ar: "للنوم أكثر" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Allah says 'that you may become righteous (achieve Taqwa)' - the spiritual goal of fasting is to develop God-consciousness.",
          ar: "قال الله تعالى 'لعلكم تتقون' - الهدف الروحي من الصيام هو تنمية التقوى والوعي بالله.",
        },
      },
      {
        id: "sawm-q2",
        question: {
          en: "When does the daily fast begin and end?",
          ar: "متى يبدأ وينتهي الصيام اليومي؟",
        },
        options: [
          { en: "Sunrise to sunset", ar: "من شروق الشمس إلى غروبها" },
          { en: "Fajr (dawn) to Maghrib (sunset)", ar: "من الفجر إلى المغرب" },
          { en: "Midnight to midnight", ar: "من منتصف الليل إلى منتصف الليل" },
          { en: "Fajr to Isha", ar: "من الفجر إلى العشاء" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Fasting begins at true dawn (Fajr) when the white thread of light can be distinguished from darkness, and ends at sunset (Maghrib).",
          ar: "يبدأ الصيام عند الفجر الصادق عندما يمكن تمييز الخيط الأبيض من الضوء عن الظلام، وينتهي عند غروب الشمس (المغرب).",
        },
      },
      {
        id: "sawm-q3",
        question: {
          en: "What happens if you accidentally eat while fasting?",
          ar: "ماذا يحدث إذا أكلت بالخطأ أثناء الصيام؟",
        },
        options: [
          {
            en: "Your fast is broken - start over",
            ar: "صيامك باطل - ابدأ من جديد",
          },
          {
            en: "Continue fasting - it's still valid",
            ar: "أكمل صيامك - لا يزال صحيحاً",
          },
          { en: "Pay Fidyah for that day", ar: "ادفع فدية عن ذلك اليوم" },
          { en: "Fast two extra days", ar: "صم يومين إضافيين" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "The Prophet ﷺ said whoever forgets while fasting and eats or drinks should complete their fast, for Allah has fed them. The fast remains valid.",
          ar: "قال النبي ﷺ من نسي وهو صائم فأكل أو شرب فليتم صومه، فإنما أطعمه الله وسقاه. الصيام يبقى صحيحاً.",
        },
      },
      {
        id: "sawm-q4",
        question: {
          en: "When is Laylatul Qadr (Night of Power) most likely?",
          ar: "متى من المرجح أن تكون ليلة القدر؟",
        },
        options: [
          { en: "First night of Ramadan", ar: "الليلة الأولى من رمضان" },
          { en: "15th night of Ramadan", ar: "الليلة الخامسة عشرة من رمضان" },
          {
            en: "Odd nights of the last 10 days",
            ar: "الليالي الوترية من العشر الأواخر",
          },
          { en: "Eid night", ar: "ليلة العيد" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "The Prophet ﷺ told us to seek Laylatul Qadr in the odd nights of the last ten days of Ramadan (21st, 23rd, 25th, 27th, 29th).",
          ar: "أخبرنا النبي ﷺ أن نتحرى ليلة القدر في الليالي الوترية من العشر الأواخر من رمضان (21، 23، 25، 27، 29).",
        },
      },
      {
        id: "sawm-q5",
        question: {
          en: "What is Fidyah?",
          ar: "ما هي الفدية؟",
        },
        options: [
          { en: "A type of prayer", ar: "نوع من الصلاة" },
          {
            en: "Feeding the poor for missed fasts",
            ar: "إطعام الفقراء عن الصيام الفائت",
          },
          { en: "The pre-dawn meal", ar: "وجبة السحور" },
          { en: "A Ramadan celebration", ar: "احتفال رمضاني" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Fidyah is feeding one poor person for each day of fasting that someone cannot make up due to chronic illness or old age.",
          ar: "الفدية هي إطعام مسكين عن كل يوم صيام لا يستطيع الشخص قضاءه بسبب مرض مزمن أو كبر السن.",
        },
      },
    ],
  },
};

export default sawmLessons;
