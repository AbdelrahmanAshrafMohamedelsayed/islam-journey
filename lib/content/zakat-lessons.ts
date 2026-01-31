import type { LessonContent, QuizQuestion } from "./lessons";

// ============================================
// ZAKAT CHAPTER LESSONS
// ============================================

export const zakatLessons: Record<string, LessonContent> = {
  "zakat-meaning": {
    id: "zakat-meaning",
    chapterId: "zakat",
    title: {
      en: "Understanding Zakat",
      ar: "فهم الزكاة",
    },
    content: {
      en: `
# Understanding Zakat

Zakat is the third pillar of Islam and one of the most important acts of worship. The word "Zakat" comes from the Arabic root meaning "to purify" and "to grow."

## What is Zakat?

**Zakat** is an obligatory form of charity that every eligible Muslim must give annually. It represents 2.5% of one's accumulated wealth and savings held for a full lunar year.

## The Dual Purpose of Zakat

### 1. Spiritual Purification
Zakat purifies the soul from greed and attachment to material possessions. Allah says in the Quran:

> "Take from their wealth a charity by which you purify them and cause them increase" (Quran 9:103)

### 2. Social Welfare
Zakat creates a system of wealth redistribution that:
- Reduces poverty and inequality
- Creates social solidarity
- Prevents hoarding of wealth
- Stimulates economic activity

## Zakat vs. Sadaqah

| Zakat | Sadaqah |
|-------|---------|
| Obligatory | Voluntary |
| Fixed amount (2.5%) | Any amount |
| Annual requirement | Anytime |
| Specific recipients | Any good cause |
| Calculated on wealth | No calculation needed |

## The Importance in Islam

The Quran often mentions Zakat alongside Salah (prayer), showing its fundamental importance:

> "And establish prayer and give Zakat, and bow with those who bow [in worship]" (Quran 2:43)

Prophet Muhammad ﷺ said:
> "Islam is built on five pillars... and giving Zakat..."

## Who Must Pay Zakat?

Zakat is obligatory for every Muslim who:
- Is sane and mature
- Is free (not enslaved)
- Owns wealth above the **Nisab** (minimum threshold)
- Has held this wealth for one lunar year

## Key Terms

- **Nisab**: The minimum amount of wealth one must have before Zakat becomes obligatory
- **Hawl**: The lunar year that must pass while possessing wealth above Nisab
- **Zakatable Assets**: Types of wealth on which Zakat is due

## Modern Applications

Today, Zakat applies to:
- Cash and bank savings
- Gold and silver
- Business inventory and investments
- Stocks and shares
- Rental income
- Agricultural produce
- Livestock

In the next lesson, we'll learn exactly how to calculate your Zakat.
      `,
      ar: `
# فهم الزكاة

الزكاة هي الركن الثالث من أركان الإسلام وأحد أهم العبادات. كلمة "زكاة" مشتقة من الجذر العربي الذي يعني "التطهير" و"النمو".

## ما هي الزكاة؟

**الزكاة** هي شكل إلزامي من الصدقة يجب على كل مسلم مؤهل دفعها سنوياً. وتمثل 2.5% من الثروة والمدخرات المتراكمة المحتفظ بها لسنة قمرية كاملة.

## الغرض المزدوج للزكاة

### 1. التطهير الروحي
الزكاة تطهر النفس من الجشع والتعلق بالممتلكات المادية. قال الله تعالى في القرآن:

> "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا" (التوبة: 103)

### 2. الرعاية الاجتماعية
الزكاة تخلق نظاماً لإعادة توزيع الثروة يعمل على:
- تقليل الفقر وعدم المساواة
- خلق التضامن الاجتماعي
- منع اكتناز الثروة
- تحفيز النشاط الاقتصادي

## الزكاة مقابل الصدقة

| الزكاة | الصدقة |
|--------|--------|
| واجبة | تطوعية |
| مبلغ محدد (2.5%) | أي مبلغ |
| متطلب سنوي | في أي وقت |
| مستلمون محددون | أي عمل خير |
| تُحسب على الثروة | لا حاجة للحساب |

## الأهمية في الإسلام

غالباً ما يذكر القرآن الزكاة إلى جانب الصلاة، مما يدل على أهميتها الأساسية:

> "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ" (البقرة: 43)

قال النبي محمد ﷺ:
> "بُني الإسلام على خمس... وإيتاء الزكاة..."

## من يجب عليه دفع الزكاة؟

الزكاة واجبة على كل مسلم:
- عاقل وبالغ
- حر (غير مملوك)
- يملك ثروة فوق **النصاب** (الحد الأدنى)
- احتفظ بهذه الثروة لسنة قمرية واحدة

## المصطلحات الرئيسية

- **النصاب**: الحد الأدنى من الثروة الذي يجب امتلاكه قبل أن تصبح الزكاة واجبة
- **الحول**: السنة القمرية التي يجب أن تمر مع امتلاك ثروة فوق النصاب
- **الأصول الزكوية**: أنواع الثروة التي تجب عليها الزكاة

## التطبيقات الحديثة

اليوم، تنطبق الزكاة على:
- النقد والمدخرات البنكية
- الذهب والفضة
- مخزون الأعمال والاستثمارات
- الأسهم والحصص
- دخل الإيجار
- المنتجات الزراعية
- المواشي

في الدرس التالي، سنتعلم بالضبط كيفية حساب زكاتك.
      `,
    },
    duration: 10,
    xpReward: 50,
    glossaryTerms: ["zakat", "nisab", "sadaqah"],
    sections: [
      {
        id: "zakat-intro-video",
        type: "video",
        content: {
          en: "Watch: What is Zakat and Why is it Important?",
          ar: "شاهد: ما هي الزكاة ولماذا هي مهمة؟",
        },
        mediaUrl: "https://www.youtube.com/watch?v=OxmRYZ_bEoI",
        backupUrls: [
          "https://www.youtube.com/watch?v=y7X_mLc7E3w",
          "https://www.youtube.com/watch?v=BOqN9cErvgY",
        ],
      },
      {
        id: "zakat-charity-image",
        type: "image",
        content: {
          en: "Giving Zakat - purifying wealth through charity",
          ar: "إعطاء الزكاة - تطهير المال من خلال الصدقة",
        },
        mediaUrl:
          "https://thumbs.dreamstime.com/b/man-giving-zakat-charity-ramadan-man-s-generosity-giving-spirit-image-show-man-handing-over-food-to-274963114.jpg",
        mediaAlt: "Hands giving charity representing Zakat",
      },
      {
        id: "zakat-quran-audio",
        type: "audio",
        content: {
          en: "Listen: Quran verse about Zakat (Surah At-Tawbah 9:103)",
          ar: "استمع: آية قرآنية عن الزكاة (سورة التوبة 9:103)",
        },
        mediaUrl:
          "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1273.mp3",
      },
      {
        id: "zakat-hadith",
        type: "hadith",
        content: {
          en: "The Prophet ﷺ said: 'Charity does not decrease wealth.'",
          ar: "قال النبي ﷺ: 'ما نقصت صدقة من مال.'",
        },
        source: { en: "Sahih Muslim", ar: "صحيح مسلم" },
      },
    ],
  },

  "zakat-calculation": {
    id: "zakat-calculation",
    chapterId: "zakat",
    title: {
      en: "Calculating Zakat",
      ar: "حساب الزكاة",
    },
    content: {
      en: `
# Calculating Your Zakat

Learning to calculate Zakat correctly is essential for every Muslim. Let's break down the process step by step.

## Step 1: Determine the Nisab

**Nisab** is the minimum threshold of wealth. If your total assets exceed this amount, Zakat becomes obligatory.

### Gold Standard
- Nisab = 85 grams of gold
- Current value varies with gold prices

### Silver Standard
- Nisab = 595 grams of silver
- Generally lower threshold, more inclusive

**Most scholars recommend using the silver nisab** as it includes more people in giving Zakat.

## Step 2: Calculate Your Zakatable Assets

### Cash & Savings
- Bank account balances
- Cash at hand
- Money owed to you (expected to be repaid)

### Gold & Silver
- Jewelry (worn or stored)
- Coins and bars
- Decorative items

### Business Assets
- Inventory for sale
- Cash in business accounts
- Accounts receivable

### Investments
- Stocks and shares (market value)
- Mutual funds
- Investment properties (rental income)

## Step 3: Subtract Liabilities

Deduct from your assets:
- Outstanding debts due within the year
- Essential expenses owed
- Business liabilities

## Step 4: Apply the Zakat Rate

**Zakat Rate = 2.5%** (or 1/40th)

### Simple Calculation Formula:

\`\`\`
Zakatable Wealth = Total Assets - Liabilities
If Zakatable Wealth > Nisab:
    Zakat Due = Zakatable Wealth × 2.5%
\`\`\`

## Practical Example

**Ahmed's Zakat Calculation:**

| Asset | Amount |
|-------|--------|
| Bank Savings | $15,000 |
| Gold Jewelry | $3,000 |
| Stock Investments | $7,000 |
| Cash | $500 |
| **Total Assets** | **$25,500** |
| Less: Loan Payment Due | -$2,000 |
| **Zakatable Wealth** | **$23,500** |

If Nisab (silver) = $500

$23,500 > $500 ✓ Zakat is due!

**Zakat = $23,500 × 2.5% = $587.50**

## When to Pay Zakat

- Pay once per lunar year (Hawl)
- Many Muslims pay during Ramadan for extra blessings
- Can be paid all at once or in installments
- Use a Zakat calculator app for accuracy

## Items NOT Subject to Zakat

- Personal residence
- Personal car
- Household furniture
- Clothing and personal items
- Tools of trade

## Tips for Zakat Calculation

1. **Keep records** of your assets throughout the year
2. **Set a Zakat date** - same date each lunar year
3. **Use reliable calculators** for current Nisab values
4. **Consult scholars** for complex situations
5. **Pay promptly** once it becomes due

In the next lesson, we'll learn about who can receive Zakat.
      `,
      ar: `
# حساب الزكاة

تعلم حساب الزكاة بشكل صحيح أمر ضروري لكل مسلم. دعونا نفصل العملية خطوة بخطوة.

## الخطوة 1: تحديد النصاب

**النصاب** هو الحد الأدنى من الثروة. إذا تجاوز إجمالي أصولك هذا المبلغ، تصبح الزكاة واجبة.

### معيار الذهب
- النصاب = 85 جرام من الذهب
- القيمة الحالية تختلف حسب أسعار الذهب

### معيار الفضة
- النصاب = 595 جرام من الفضة
- عتبة أقل عموماً، أكثر شمولاً

**معظم العلماء يوصون باستخدام نصاب الفضة** لأنه يشمل المزيد من الناس في إعطاء الزكاة.

## الخطوة 2: حساب أصولك الزكوية

### النقد والمدخرات
- أرصدة الحسابات البنكية
- النقد في اليد
- الأموال المستحقة لك (المتوقع سدادها)

### الذهب والفضة
- المجوهرات (الملبوسة أو المخزنة)
- العملات والسبائك
- القطع الزخرفية

### أصول الأعمال
- المخزون المعد للبيع
- النقد في حسابات الأعمال
- الحسابات المستحقة

### الاستثمارات
- الأسهم والحصص (القيمة السوقية)
- صناديق الاستثمار
- العقارات الاستثمارية (دخل الإيجار)

## الخطوة 3: خصم الالتزامات

اخصم من أصولك:
- الديون المستحقة خلال السنة
- النفقات الأساسية المستحقة
- التزامات الأعمال

## الخطوة 4: تطبيق نسبة الزكاة

**نسبة الزكاة = 2.5%** (أو 1/40)

### صيغة الحساب البسيطة:

\`\`\`
الثروة الزكوية = إجمالي الأصول - الالتزامات
إذا كانت الثروة الزكوية > النصاب:
    الزكاة المستحقة = الثروة الزكوية × 2.5%
\`\`\`

## مثال عملي

**حساب زكاة أحمد:**

| الأصل | المبلغ |
|-------|--------|
| المدخرات البنكية | 15,000$ |
| مجوهرات ذهبية | 3,000$ |
| استثمارات الأسهم | 7,000$ |
| نقد | 500$ |
| **إجمالي الأصول** | **25,500$** |
| ناقص: قسط القرض المستحق | -2,000$ |
| **الثروة الزكوية** | **23,500$** |

إذا كان النصاب (الفضة) = 500$

23,500$ > 500$ ✓ الزكاة واجبة!

**الزكاة = 23,500$ × 2.5% = 587.50$**

## متى تُدفع الزكاة

- تُدفع مرة واحدة في السنة القمرية (الحول)
- كثير من المسلمين يدفعون في رمضان لمزيد من البركات
- يمكن دفعها دفعة واحدة أو على أقساط
- استخدم تطبيق حاسبة الزكاة للدقة

## الأشياء غير الخاضعة للزكاة

- السكن الشخصي
- السيارة الشخصية
- أثاث المنزل
- الملابس والأغراض الشخصية
- أدوات العمل

## نصائح لحساب الزكاة

1. **احتفظ بسجلات** لأصولك طوال العام
2. **حدد تاريخاً للزكاة** - نفس التاريخ كل سنة قمرية
3. **استخدم حاسبات موثوقة** لقيم النصاب الحالية
4. **استشر العلماء** للحالات المعقدة
5. **ادفع فوراً** بمجرد أن تصبح مستحقة

في الدرس التالي، سنتعلم من يستحق الزكاة.
      `,
    },
    duration: 15,
    xpReward: 75,
    glossaryTerms: ["zakat", "nisab"],
  },

  "zakat-recipients": {
    id: "zakat-recipients",
    chapterId: "zakat",
    title: {
      en: "Who Receives Zakat",
      ar: "مستحقو الزكاة",
    },
    content: {
      en: `
# Who Receives Zakat: The Eight Categories

Allah has specified exactly who can receive Zakat in the Quran. Understanding these categories ensures your Zakat reaches those truly in need.

## The Quranic Verse

> "Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together [for Islam] and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveler - an obligation [imposed] by Allah. And Allah is Knowing and Wise." (Quran 9:60)

## The Eight Categories Explained

### 1. Al-Fuqara (The Poor) - الفقراء
Those who have some income but not enough to meet their basic needs.
- Cannot afford basic necessities
- May have irregular or insufficient income
- Living below the poverty line

### 2. Al-Masakin (The Needy) - المساكين
Those in extreme poverty with no income at all.
- Absolutely destitute
- No source of income
- In desperate need of assistance

### 3. Al-'Amilina 'Alayha (Zakat Administrators) - العاملين عليها
Those employed to collect and distribute Zakat.
- Official Zakat collectors
- Those who manage Zakat funds
- Paid from Zakat itself as wages

### 4. Al-Mu'allafati Qulubuhum (Those Whose Hearts Are to Be Reconciled) - المؤلفة قلوبهم
New Muslims or those inclined towards Islam.
- Recent converts needing support
- Those interested in Islam
- Building bonds within the community

### 5. Fir-Riqab (For Freeing Captives) - في الرقاب
Freeing slaves or those in bondage.
- Historically used for freeing slaves
- Today may include:
  - Human trafficking victims
  - Those in unjust imprisonment
  - Refugees seeking freedom

### 6. Al-Gharimin (Those in Debt) - الغارمين
People overwhelmed by debt.
- Debt incurred for permissible needs
- Cannot repay their debts
- Not debts for sinful purposes

### 7. Fi Sabilillah (In the Cause of Allah) - في سبيل الله
For the cause of Allah.
- Supporting Islamic education
- Building mosques and Islamic centers
- Dawah (spreading Islam)
- Scholars differ on exact applications

### 8. Ibnus-Sabil (The Traveler) - ابن السبيل
Stranded travelers in need.
- Travelers who've run out of resources
- Displaced persons
- Those far from home without support

## Important Rules for Giving Zakat

### Who CANNOT Receive Zakat:
- ❌ Your immediate family (parents, children, spouse)
- ❌ Wealthy individuals
- ❌ Non-Muslims (regular Zakat - some exceptions exist)
- ❌ Descendants of Prophet Muhammad ﷺ (Banu Hashim)

### Best Practices:
- ✅ Give to those you know are in genuine need
- ✅ Local recipients often take priority
- ✅ Can give to multiple categories
- ✅ Verify the recipient's eligibility
- ✅ Give with dignity and respect

## Modern Applications

| Category | Modern Examples |
|----------|-----------------|
| Poor & Needy | Homeless shelters, food banks |
| Administrators | Islamic relief organizations |
| New Muslims | Convert support programs |
| Freeing captives | Refugee assistance |
| Debtors | Medical debt relief |
| Allah's cause | Islamic schools, dawah centers |
| Travelers | Stranded students abroad |

## Giving Through Organizations

Many Muslims give Zakat through established Islamic charities that:
- Verify recipients
- Ensure proper distribution
- Reach global communities
- Provide accountability

**Always verify** that the organization distributes to legitimate Zakat recipients.

Remember: Your Zakat is an **amanah** (trust) from Allah. Give it carefully and with the intention to please Him alone.
      `,
      ar: `
# مستحقو الزكاة: الأصناف الثمانية

حدد الله بالضبط من يستحق الزكاة في القرآن. فهم هذه الأصناف يضمن وصول زكاتك لمن يستحقها حقاً.

## الآية القرآنية

> "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ" (التوبة: 60)

## شرح الأصناف الثمانية

### 1. الفقراء
الذين لديهم بعض الدخل لكنه لا يكفي لتلبية احتياجاتهم الأساسية.
- لا يستطيعون تحمل الضروريات الأساسية
- قد يكون لديهم دخل غير منتظم أو غير كافٍ
- يعيشون تحت خط الفقر

### 2. المساكين
الذين في فقر مدقع بدون أي دخل.
- معدمون تماماً
- بدون مصدر دخل
- في حاجة ماسة للمساعدة

### 3. العاملين عليها
الموظفون لجمع وتوزيع الزكاة.
- جامعو الزكاة الرسميون
- من يديرون أموال الزكاة
- يُدفع لهم من الزكاة نفسها كأجور

### 4. المؤلفة قلوبهم
المسلمون الجدد أو الذين يميلون للإسلام.
- المهتدون حديثاً الذين يحتاجون دعماً
- المهتمون بالإسلام
- بناء روابط داخل المجتمع

### 5. في الرقاب
تحرير العبيد أو المستعبدين.
- استُخدم تاريخياً لتحرير العبيد
- اليوم قد يشمل:
  - ضحايا الاتجار بالبشر
  - المسجونين ظلماً
  - اللاجئين الباحثين عن الحرية

### 6. الغارمين
الأشخاص المثقلون بالديون.
- ديون تكبدوها لاحتياجات مباحة
- لا يستطيعون سداد ديونهم
- ليست ديوناً لأغراض محرمة

### 7. في سبيل الله
لقضية الله.
- دعم التعليم الإسلامي
- بناء المساجد والمراكز الإسلامية
- الدعوة (نشر الإسلام)
- يختلف العلماء في التطبيقات الدقيقة

### 8. ابن السبيل
المسافرون العالقون المحتاجون.
- المسافرون الذين نفدت مواردهم
- النازحون
- البعيدون عن ديارهم بدون دعم

## قواعد مهمة لإعطاء الزكاة

### من لا يستحق الزكاة:
- ❌ أقاربك المباشرون (الوالدان، الأبناء، الزوج/الزوجة)
- ❌ الأثرياء
- ❌ غير المسلمين (الزكاة العادية - توجد بعض الاستثناءات)
- ❌ ذرية النبي محمد ﷺ (بنو هاشم)

### أفضل الممارسات:
- ✅ أعطِ لمن تعرف أنهم في حاجة حقيقية
- ✅ المستفيدون المحليون غالباً لهم الأولوية
- ✅ يمكن الإعطاء لعدة أصناف
- ✅ تحقق من أهلية المستلم
- ✅ أعطِ بكرامة واحترام

## التطبيقات الحديثة

| الصنف | أمثلة حديثة |
|-------|-------------|
| الفقراء والمساكين | ملاجئ المشردين، بنوك الطعام |
| العاملين | منظمات الإغاثة الإسلامية |
| المؤلفة قلوبهم | برامج دعم المهتدين |
| الرقاب | مساعدة اللاجئين |
| الغارمين | تخفيف الديون الطبية |
| سبيل الله | المدارس الإسلامية، مراكز الدعوة |
| ابن السبيل | الطلاب العالقين في الخارج |

## الإعطاء من خلال المنظمات

كثير من المسلمين يعطون الزكاة من خلال جمعيات خيرية إسلامية راسخة:
- تتحقق من المستفيدين
- تضمن التوزيع السليم
- تصل للمجتمعات العالمية
- توفر المساءلة

**تحقق دائماً** من أن المنظمة توزع على مستحقي الزكاة الشرعيين.

تذكر: زكاتك **أمانة** من الله. أعطها بعناية وبنية إرضائه وحده.
      `,
    },
    duration: 12,
    xpReward: 60,
    glossaryTerms: ["zakat", "sadaqah"],
  },

  "zakat-quiz": {
    id: "zakat-quiz",
    chapterId: "zakat",
    title: {
      en: "Zakat Quiz",
      ar: "اختبار الزكاة",
    },
    type: "quiz",
    content: { en: "", ar: "" },
    duration: 5,
    xpReward: 100,
    quiz: [
      {
        id: "zakat-q1",
        question: {
          en: "What percentage of wealth is required for Zakat?",
          ar: "ما هي نسبة الزكاة المطلوبة من الثروة؟",
        },
        options: [
          { en: "1%", ar: "1%" },
          { en: "2.5%", ar: "2.5%" },
          { en: "5%", ar: "5%" },
          { en: "10%", ar: "10%" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Zakat is 2.5% (or 1/40th) of your zakatable wealth held for a full lunar year above the nisab.",
          ar: "الزكاة هي 2.5% (أو 1/40) من ثروتك الزكوية المحتفظ بها لسنة قمرية كاملة فوق النصاب.",
        },
      },
      {
        id: "zakat-q2",
        question: {
          en: "What is the 'Nisab' in Zakat?",
          ar: "ما هو 'النصاب' في الزكاة؟",
        },
        options: [
          { en: "The amount of Zakat to pay", ar: "مبلغ الزكاة المستحق" },
          {
            en: "The minimum wealth threshold",
            ar: "الحد الأدنى من الثروة",
          },
          {
            en: "The lunar year requirement",
            ar: "متطلب السنة القمرية",
          },
          { en: "A type of charity", ar: "نوع من الصدقة" },
        ],
        correctAnswer: 1,
        explanation: {
          en: "Nisab is the minimum threshold of wealth one must possess before Zakat becomes obligatory.",
          ar: "النصاب هو الحد الأدنى من الثروة التي يجب امتلاكها قبل أن تصبح الزكاة واجبة.",
        },
      },
      {
        id: "zakat-q3",
        question: {
          en: "How many categories of Zakat recipients are mentioned in the Quran?",
          ar: "كم عدد أصناف مستحقي الزكاة المذكورين في القرآن؟",
        },
        options: [
          { en: "5", ar: "5" },
          { en: "6", ar: "6" },
          { en: "7", ar: "7" },
          { en: "8", ar: "8" },
        ],
        correctAnswer: 3,
        explanation: {
          en: "Surah At-Tawbah (9:60) specifies eight categories: the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, for freeing captives, those in debt, in the cause of Allah, and the traveler.",
          ar: "تحدد سورة التوبة (9:60) ثمانية أصناف: الفقراء والمساكين والعاملين عليها والمؤلفة قلوبهم وفي الرقاب والغارمين وفي سبيل الله وابن السبيل.",
        },
      },
      {
        id: "zakat-q4",
        question: {
          en: "Which of these is NOT subject to Zakat?",
          ar: "أي من هذه لا تجب عليها الزكاة؟",
        },
        options: [
          { en: "Gold jewelry", ar: "المجوهرات الذهبية" },
          { en: "Bank savings", ar: "المدخرات البنكية" },
          { en: "Personal residence", ar: "السكن الشخصي" },
          { en: "Business inventory", ar: "مخزون الأعمال" },
        ],
        correctAnswer: 2,
        explanation: {
          en: "Your personal residence (the home you live in) is not subject to Zakat. It's considered a basic necessity.",
          ar: "سكنك الشخصي (المنزل الذي تسكنه) لا تجب عليه الزكاة. يُعتبر من الضروريات الأساسية.",
        },
      },
      {
        id: "zakat-q5",
        question: {
          en: "Can you give Zakat to your parents?",
          ar: "هل يمكنك إعطاء الزكاة لوالديك؟",
        },
        options: [
          { en: "Yes, always", ar: "نعم، دائماً" },
          { en: "No, never", ar: "لا، أبداً" },
          { en: "Only if they are poor", ar: "فقط إذا كانوا فقراء" },
          {
            en: "Only during Ramadan",
            ar: "فقط خلال رمضان",
          },
        ],
        correctAnswer: 1,
        explanation: {
          en: "You cannot give Zakat to your direct ascendants (parents, grandparents) or descendants (children). You are already obligated to support them from your regular wealth.",
          ar: "لا يمكنك إعطاء الزكاة لأصولك المباشرين (الوالدين، الأجداد) أو فروعك (الأبناء). أنت ملزم بالفعل بإعالتهم من مالك العادي.",
        },
      },
    ],
  },
};

export default zakatLessons;
