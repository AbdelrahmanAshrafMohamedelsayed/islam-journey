"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Heart,
  Users,
  Shield,
  Scale,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/lib/stores";

// Misconceptions data
const misconceptions = [
  {
    id: 1,
    category: "violence",
    icon: Shield,
    myth: {
      en: "Islam promotes violence and terrorism",
      ar: "الإسلام يروج للعنف والإرهاب",
    },
    truth: {
      en: 'Islam means "peace" and "submission to God." The Quran explicitly forbids taking innocent lives. Acts of terrorism are condemned by mainstream Islamic scholars worldwide.',
      ar: 'الإسلام يعني "السلام" و"الخضوع لله." القرآن يحرم صراحة قتل الأبرياء. أعمال الإرهاب مُدانة من علماء الإسلام في جميع أنحاء العالم.',
    },
    evidence: {
      en: 'The Quran states: "Whoever kills a soul... it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely." (5:32)',
      ar: 'القرآن يقول: "من قتل نفساً بغير نفس أو فساد في الأرض فكأنما قتل الناس جميعاً ومن أحياها فكأنما أحيا الناس جميعاً." (5:32)',
    },
  },
  {
    id: 2,
    category: "women",
    icon: Heart,
    myth: {
      en: "Islam oppresses women",
      ar: "الإسلام يظلم المرأة",
    },
    truth: {
      en: "Islam granted women rights 1,400 years ago that Western women gained only recently: property rights, inheritance, divorce rights, and education. Islam elevated women's status in 7th century Arabia.",
      ar: "منح الإسلام المرأة حقوقاً قبل 1,400 سنة لم تحصل عليها المرأة الغربية إلا مؤخراً: حقوق الملكية، الميراث، الطلاق، والتعليم. رفع الإسلام مكانة المرأة في جزيرة العرب في القرن السابع.",
    },
    evidence: {
      en: 'The Prophet ﷺ said: "The best of you are those who are best to their women." Women like Khadijah (business owner) and Aisha (scholar) held prominent positions in early Islam.',
      ar: 'قال النبي ﷺ: "خيركم خيركم لأهله." نساء مثل خديجة (صاحبة تجارة) وعائشة (عالمة) كانت لهن مكانة بارزة في الإسلام المبكر.',
    },
  },
  {
    id: 3,
    category: "forced",
    icon: Users,
    myth: {
      en: "People are forced to convert to Islam",
      ar: "الناس يُجبرون على اعتناق الإسلام",
    },
    truth: {
      en: 'The Quran explicitly states "There is no compulsion in religion" (2:256). Forced conversion is forbidden. Islam is actually the fastest growing religion by conversion, by people\'s own choice.',
      ar: 'القرآن ينص صراحة "لا إكراه في الدين" (2:256). الإجبار على التحول محرم. الإسلام في الواقع هو أسرع الأديان نمواً بالتحول، باختيار الناس أنفسهم.',
    },
    evidence: {
      en: "Historical example: When Muslims ruled Spain (Andalusia) for 800 years, Christians and Jews lived freely and maintained their religions.",
      ar: "مثال تاريخي: عندما حكم المسلمون إسبانيا (الأندلس) لـ 800 سنة، عاش المسيحيون واليهود بحرية وحافظوا على دياناتهم.",
    },
  },
  {
    id: 4,
    category: "other",
    icon: Scale,
    myth: {
      en: "Muslims worship a different God than Christians and Jews",
      ar: "المسلمون يعبدون إلهاً مختلفاً عن المسيحيين واليهود",
    },
    truth: {
      en: '"Allah" is simply the Arabic word for "God" - the same God of Abraham, Moses, and Jesus. Arab Christians also use "Allah" for God. Islam recognizes the prophets of Judaism and Christianity.',
      ar: '"الله" هي ببساطة الكلمة العربية للإله - نفس إله إبراهيم وموسى وعيسى. المسيحيون العرب يستخدمون أيضاً "الله". الإسلام يعترف بأنبياء اليهودية والمسيحية.',
    },
    evidence: {
      en: "The Quran mentions Jesus (Isa) 25 times, Mary (Maryam) 34 times, and Moses (Musa) over 130 times. An entire chapter is named after Mary.",
      ar: "القرآن يذكر عيسى 25 مرة، ومريم 34 مرة، وموسى أكثر من 130 مرة. سورة كاملة تحمل اسم مريم.",
    },
  },
  {
    id: 5,
    category: "science",
    icon: Sparkles,
    myth: {
      en: "Islam is against science and progress",
      ar: "الإسلام ضد العلم والتقدم",
    },
    truth: {
      en: "Islamic civilization led the world in science for 800 years. Muslims developed algebra, algorithms, optics, chemistry, medicine, and preserved Greek knowledge. The first university was founded by a Muslim woman.",
      ar: "قادت الحضارة الإسلامية العالم في العلوم لـ 800 سنة. طور المسلمون الجبر، الخوارزميات، البصريات، الكيمياء، الطب، وحفظوا المعرفة اليونانية. أسست امرأة مسلمة أول جامعة.",
    },
    evidence: {
      en: "Ibn Sina (Avicenna) wrote medical texts used in Europe for 500 years. Al-Khwarizmi invented algebra. Ibn al-Haytham pioneered optics. Many stars have Arabic names.",
      ar: "ابن سينا كتب نصوصاً طبية استُخدمت في أوروبا لـ 500 سنة. الخوارزمي اخترع الجبر. ابن الهيثم كان رائداً في البصريات. كثير من النجوم لها أسماء عربية.",
    },
  },
  {
    id: 6,
    category: "violence",
    icon: Shield,
    myth: {
      en: 'Jihad means "holy war"',
      ar: 'الجهاد يعني "الحرب المقدسة"',
    },
    truth: {
      en: 'Jihad literally means "struggle" or "striving." The greatest jihad is the internal struggle against one\'s ego and desires. Military jihad is a last resort for self-defense with strict ethical rules.',
      ar: 'الجهاد يعني حرفياً "الكفاح" أو "السعي." أعظم جهاد هو الصراع الداخلي ضد الأنا والرغبات. الجهاد العسكري هو الملاذ الأخير للدفاع عن النفس مع قواعد أخلاقية صارمة.',
    },
    evidence: {
      en: 'The Prophet ﷺ returned from battle saying: "We return from the lesser jihad to the greater jihad" - meaning the internal spiritual struggle.',
      ar: 'عاد النبي ﷺ من المعركة قائلاً: "رجعنا من الجهاد الأصغر إلى الجهاد الأكبر" - أي الصراع الروحي الداخلي.',
    },
  },
  {
    id: 7,
    category: "women",
    icon: Heart,
    myth: {
      en: "The hijab is forced on Muslim women",
      ar: "الحجاب مفروض على النساء المسلمات",
    },
    truth: {
      en: "Many Muslim women choose to wear hijab as an act of worship, identity, and empowerment. It represents modesty and devotion to God. Compulsion goes against Islamic principles.",
      ar: "كثير من النساء المسلمات يخترن ارتداء الحجاب كعبادة وهوية وتمكين. يمثل الحشمة والتقوى لله. الإكراه يتعارض مع المبادئ الإسلامية.",
    },
    evidence: {
      en: 'The Quran says "There is no compulsion in religion" (2:256). Many converts to Islam are women who choose to wear hijab of their own free will.',
      ar: 'القرآن يقول "لا إكراه في الدين" (2:256). كثير من المهتديات للإسلام نساء يخترن ارتداء الحجاب بإرادتهن الحرة.',
    },
  },
  {
    id: 8,
    category: "other",
    icon: BookOpen,
    myth: {
      en: "The Quran was changed over time",
      ar: "القرآن تغير مع الوقت",
    },
    truth: {
      en: "The Quran has been preserved letter-for-letter since its revelation - a historical fact acknowledged by scholars of all backgrounds. Millions have memorized it entirely, serving as a human backup.",
      ar: "حُفظ القرآن حرفاً حرفاً منذ نزوله - حقيقة تاريخية يعترف بها علماء من جميع الخلفيات. ملايين حفظوه كاملاً، ليكونوا حفظة بشريين.",
    },
    evidence: {
      en: "Ancient manuscripts like the Birmingham Quran (circa 645 CE) and Sana'a manuscripts match today's Quran exactly. No other religious text has this level of preservation.",
      ar: "المخطوطات القديمة مثل مخطوطة برمنغهام (حوالي 645 م) ومخطوطات صنعاء تطابق قرآن اليوم تماماً. لا يوجد نص ديني آخر بهذا المستوى من الحفظ.",
    },
  },
  {
    id: 9,
    category: "violence",
    icon: Shield,
    myth: {
      en: "Muslims hate non-Muslims",
      ar: "المسلمون يكرهون غير المسلمين",
    },
    truth: {
      en: "Islam teaches respect for all of humanity as children of Adam. Muslims are commanded to be just and kind even to those who disagree with them, and to maintain good relations with neighbors of all faiths.",
      ar: "الإسلام يعلم احترام جميع البشرية كأبناء آدم. المسلمون مأمورون بالعدل واللطف حتى مع من يختلفون معهم، والحفاظ على علاقات طيبة مع الجيران من جميع الأديان.",
    },
    evidence: {
      en: 'The Quran says: "Allah does not forbid you from being kind and just to those who do not fight you because of religion." (60:8) The Prophet ﷺ had Jewish and Christian neighbors he treated with kindness.',
      ar: 'القرآن يقول: "لا ينهاكم الله عن الذين لم يقاتلوكم في الدين أن تبروهم وتقسطوا إليهم." (60:8) كان للنبي ﷺ جيران يهود ومسيحيون عاملهم بلطف.',
    },
  },
  {
    id: 10,
    category: "women",
    icon: Heart,
    myth: {
      en: "Muslim women cannot work or be educated",
      ar: "المرأة المسلمة لا تستطيع العمل أو التعلم",
    },
    truth: {
      en: "Islam encourages education for both men and women equally. The Prophet ﷺ said 'Seeking knowledge is an obligation upon every Muslim.' History is filled with Muslim women scholars, doctors, teachers, and business owners.",
      ar: "الإسلام يشجع التعليم للرجال والنساء على حد سواء. قال النبي ﷺ 'طلب العلم فريضة على كل مسلم.' التاريخ مليء بالعالمات والطبيبات والمعلمات وصاحبات الأعمال المسلمات.",
    },
    evidence: {
      en: "Khadijah was a successful businesswoman. Aisha taught over 2,000 students. Fatima al-Fihri founded the world's first university (University of Al Quaraouiyine, 859 CE). Rufaida Al-Aslamia was the first female Muslim nurse.",
      ar: "خديجة كانت سيدة أعمال ناجحة. عائشة علمت أكثر من 2,000 طالب. فاطمة الفهرية أسست أول جامعة في العالم (جامعة القرويين، 859 م). رفيدة الأسلمية كانت أول ممرضة مسلمة.",
    },
  },
  {
    id: 11,
    category: "other",
    icon: Scale,
    myth: {
      en: "Sharia law is barbaric and oppressive",
      ar: "الشريعة بربرية وقمعية",
    },
    truth: {
      en: "Sharia primarily governs personal worship, charity, fasting, and ethics. Criminal law is a small part and has strict requirements for evidence (4 witnesses for serious crimes). Its goal is justice, protection of life, religion, intellect, lineage, and property.",
      ar: "الشريعة تحكم بشكل أساسي العبادة الشخصية والزكاة والصيام والأخلاق. القانون الجنائي جزء صغير وله متطلبات صارمة للأدلة (4 شهود للجرائم الخطيرة). هدفها العدالة وحماية الحياة والدين والعقل والنسل والمال.",
    },
    evidence: {
      en: "Sharia principles include presumption of innocence, protection of minorities, mandatory charity (zakat), kindness to animals, and environmental stewardship. The Prophet ﷺ never once implemented harsh punishments during his lifetime in Madinah.",
      ar: "مبادئ الشريعة تشمل افتراض البراءة وحماية الأقليات والزكاة الإلزامية والرفق بالحيوان والحفاظ على البيئة. لم ينفذ النبي ﷺ عقوبات قاسية خلال حياته في المدينة.",
    },
  },
  {
    id: 12,
    category: "women",
    icon: Heart,
    myth: {
      en: "Men can beat their wives in Islam",
      ar: "يمكن للرجال ضرب زوجاتهم في الإسلام",
    },
    truth: {
      en: "The Prophet ﷺ never struck a woman and said the best men are those who treat their wives best. He explicitly condemned domestic violence. Quran verse 4:34 has been misinterpreted - scholars explain it as a symbolic gesture, not actual hitting.",
      ar: "النبي ﷺ لم يضرب امرأة قط وقال أن أفضل الرجال من يعامل زوجته أفضل معاملة. أدان بشكل صريح العنف الأسري. الآية 4:34 أُسيء فهمها - العلماء يشرحون أنها إشارة رمزية وليس ضرباً فعلياً.",
    },
    evidence: {
      en: 'The Prophet ﷺ said: "The best of you is the best to his family, and I am the best of you to my family." He also said: "A believing man should not hate a believing woman; if he dislikes one of her characteristics, he will be pleased with another."',
      ar: 'قال النبي ﷺ: "خيركم خيركم لأهله، وأنا خيركم لأهلي." وقال أيضاً: "لا يفرك مؤمن مؤمنة، إن كره منها خلقاً رضي منها آخر."',
    },
  },
  {
    id: 13,
    category: "science",
    icon: Sparkles,
    myth: {
      en: "Islam and evolution cannot coexist",
      ar: "الإسلام والتطور لا يمكن أن يتعايشا",
    },
    truth: {
      en: "Many Muslim scholars have engaged with evolutionary theory since the 9th century. Al-Jahiz wrote about natural selection 1000 years before Darwin. Islam encourages scientific inquiry; the Quran invites reflection on nature repeatedly.",
      ar: "كثير من العلماء المسلمين تعاملوا مع نظرية التطور منذ القرن التاسع. الجاحظ كتب عن الانتقاء الطبيعي قبل 1000 سنة من داروين. الإسلام يشجع البحث العلمي؛ القرآن يدعو للتأمل في الطبيعة مراراً.",
    },
    evidence: {
      en: 'The Quran says: "Do they not look at the camels, how they are created?" (88:17) and "Travel through the earth and observe how He began creation." (29:20) - both are invitations to scientific observation.',
      ar: 'القرآن يقول: "أفلا ينظرون إلى الإبل كيف خلقت" (88:17) و"قل سيروا في الأرض فانظروا كيف بدأ الخلق" (29:20) - كلاهما دعوة للملاحظة العلمية.',
    },
  },
  {
    id: 14,
    category: "forced",
    icon: Users,
    myth: {
      en: "Islam was spread by the sword",
      ar: "الإسلام انتشر بالسيف",
    },
    truth: {
      en: "Indonesia, Malaysia, and Sub-Saharan Africa - some of the largest Muslim populations - converted through trade and peaceful preaching, not conquest. Muslims ruled Spain and India for centuries without mass conversion by force.",
      ar: "إندونيسيا وماليزيا وأفريقيا جنوب الصحراء - من أكبر التجمعات المسلمة - تحولت من خلال التجارة والدعوة السلمية، لا الفتح. حكم المسلمون إسبانيا والهند لقرون دون تحويل جماعي بالقوة.",
    },
    evidence: {
      en: "If Islam spread only by sword, why did millions of Hindus remain in India after 800 years of Muslim rule? Why do millions of Christians live in Egypt, Lebanon, and Syria after 1,400 years? Forced conversion is simply forbidden.",
      ar: "إذا انتشر الإسلام بالسيف فقط، لماذا بقي ملايين الهندوس في الهند بعد 800 سنة من الحكم الإسلامي؟ لماذا يعيش ملايين المسيحيين في مصر ولبنان وسوريا بعد 1,400 سنة؟ التحويل بالإكراه محرم ببساطة.",
    },
  },
  {
    id: 15,
    category: "other",
    icon: BookOpen,
    myth: {
      en: "Muhammad ﷺ wrote the Quran himself",
      ar: "محمد ﷺ كتب القرآن بنفسه",
    },
    truth: {
      en: "The Prophet ﷺ was known to be illiterate - he could neither read nor write. The Quran was revealed over 23 years and memorized/written by his companions. Its literary excellence baffled the greatest Arab poets of his time.",
      ar: "النبي ﷺ كان معروفاً بأنه أمي - لم يكن يقرأ ولا يكتب. نزل القرآن على مدى 23 سنة وحفظه وكتبه صحابته. تفوقه الأدبي أذهل أعظم شعراء العرب في زمنه.",
    },
    evidence: {
      en: 'The Quran challenged Arabs to produce even a single chapter like it: "If you are in doubt about what We have revealed to Our servant, then produce a surah like it." (2:23) - a challenge unmet for 1,400 years.',
      ar: 'القرآن تحدى العرب لإنتاج سورة واحدة مثله: "وإن كنتم في ريب مما نزلنا على عبدنا فأتوا بسورة من مثله" (2:23) - تحدٍ لم يُجب عليه منذ 1,400 سنة.',
    },
  },
  {
    id: 16,
    category: "other",
    icon: Scale,
    myth: {
      en: "Muslims don't believe in Jesus",
      ar: "المسلمون لا يؤمنون بعيسى",
    },
    truth: {
      en: "Muslims deeply revere Jesus (Isa) as one of the mightiest prophets. They believe in his virgin birth, his miracles, and his return before the Day of Judgment. Denying any prophet disqualifies one from being Muslim.",
      ar: "المسلمون يبجلون عيسى عليه السلام بعمق كأحد أعظم الأنبياء. يؤمنون بولادته العذرية ومعجزاته وعودته قبل يوم القيامة. إنكار أي نبي يُخرج الشخص من الإسلام.",
    },
    evidence: {
      en: "Jesus is mentioned 25 times in the Quran. Mary (Maryam) has an entire chapter named after her - the only woman with a chapter in her name. The Quran describes Jesus's miracles: healing the blind, raising the dead by God's permission.",
      ar: "عيسى مذكور 25 مرة في القرآن. مريم لها سورة كاملة باسمها - المرأة الوحيدة التي سُميت سورة باسمها. القرآن يصف معجزات عيسى: شفاء الأعمى وإحياء الموتى بإذن الله.",
    },
  },
];

const categories = [
  { id: "all", label: { en: "All Topics", ar: "كل المواضيع" } },
  { id: "violence", label: { en: "Violence & Peace", ar: "العنف والسلام" } },
  { id: "women", label: { en: "Women", ar: "المرأة" } },
  { id: "forced", label: { en: "Freedom", ar: "الحرية" } },
  { id: "science", label: { en: "Science", ar: "العلم" } },
  { id: "other", label: { en: "Other", ar: "أخرى" } },
];

export default function MisconceptionsPage() {
  const { language: lang } = useSettingsStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredMisconceptions =
    selectedCategory === "all"
      ? misconceptions
      : misconceptions.filter((m) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/journey">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back" : "رجوع"}
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {lang === "en"
                ? "Common Misconceptions"
                : "المفاهيم الخاطئة الشائعة"}
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {lang === "en" ? "Myth vs. Reality" : "الخرافة مقابل الحقيقة"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Explore common misconceptions about Islam and discover the truth through evidence and context"
              : "استكشف المفاهيم الخاطئة الشائعة عن الإسلام واكتشف الحقيقة من خلال الأدلة والسياق"}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Misconceptions List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMisconceptions.map((item, index) => {
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    variant="default"
                    padding="none"
                    className="overflow-hidden"
                  >
                    {/* Myth Header */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="w-full p-4 md:p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                            <AlertCircle className="w-4 h-4" />
                            {lang === "en" ? "MYTH" : "خرافة"}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {item.myth[lang]}
                          </h3>
                        </div>
                        <div className="shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Truth Section (Expanded) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                            {/* Truth */}
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  {lang === "en" ? "TRUTH" : "الحقيقة"}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300">
                                  {item.truth[lang]}
                                </p>
                              </div>
                            </div>

                            {/* Evidence */}
                            <div className="ml-14 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                              <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-2">
                                <BookOpen className="w-4 h-4" />
                                {lang === "en" ? "Evidence" : "الدليل"}
                              </div>
                              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                {item.evidence[lang]}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card variant="gradient" padding="lg" className="text-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              {lang === "en"
                ? "Have More Questions?"
                : "لديك المزيد من الأسئلة؟"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {lang === "en"
                ? "Continue your learning journey to discover more about Islam"
                : "تابع رحلة تعلمك لاكتشاف المزيد عن الإسلام"}
            </p>
            <Link href="/journey">
              <Button variant="primary">
                {lang === "en" ? "Continue Learning" : "تابع التعلم"}
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
