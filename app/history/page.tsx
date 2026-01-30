"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Book,
  Users,
  Swords,
  Building2,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/lib/stores";

// Historical events data
const timelineEvents = [
  {
    year: 570,
    era: "Pre-Islam",
    title: { en: "Birth of Prophet Muhammad ﷺ", ar: "ولادة النبي محمد ﷺ" },
    description: {
      en: "Prophet Muhammad ﷺ was born in Makkah in the Year of the Elephant. His father Abdullah had passed away before his birth, and his mother Aminah passed away when he was six. He was raised by his grandfather Abdul Muttalib and later by his uncle Abu Talib.",
      ar: "وُلد النبي محمد ﷺ في مكة في عام الفيل. توفي والده عبدالله قبل ولادته، وتوفيت أمه آمنة عندما كان عمره ست سنوات. ربّاه جده عبد المطلب ثم عمه أبو طالب.",
    },
    location: "Makkah",
    icon: Star,
    color: "emerald",
  },
  {
    year: 610,
    era: "Revelation",
    title: { en: "First Revelation", ar: "الوحي الأول" },
    description: {
      en: 'Angel Jibreel (Gabriel) appeared to Prophet Muhammad ﷺ in the Cave of Hira during the month of Ramadan. The first words revealed were "Read! In the name of your Lord who created." This marked the beginning of the Quranic revelation.',
      ar: 'ظهر الملاك جبريل للنبي محمد ﷺ في غار حراء في شهر رمضان. أول الكلمات المُنزلة كانت "اقرأ باسم ربك الذي خلق." هذا شكّل بداية نزول القرآن.',
    },
    location: "Cave of Hira, Makkah",
    icon: Book,
    color: "amber",
  },
  {
    year: 613,
    era: "Revelation",
    title: { en: "Public Preaching Begins", ar: "بداية الدعوة العلنية" },
    description: {
      en: "After three years of private invitation to Islam, Prophet Muhammad ﷺ was commanded to preach publicly. This led to increasing persecution of early Muslims by the Quraysh.",
      ar: "بعد ثلاث سنوات من الدعوة السرية للإسلام، أُمر النبي محمد ﷺ بالدعوة العلنية. أدى هذا إلى تزايد اضطهاد المسلمين الأوائل من قِبل قريش.",
    },
    location: "Makkah",
    icon: Users,
    color: "blue",
  },
  {
    year: 615,
    era: "Persecution",
    title: {
      en: "First Migration to Abyssinia",
      ar: "الهجرة الأولى إلى الحبشة",
    },
    description: {
      en: "Due to intense persecution, a group of Muslims migrated to Abyssinia (Ethiopia) seeking protection from the Christian King Negus (Najashi). The king listened to their message and allowed them to stay.",
      ar: "بسبب الاضطهاد الشديد، هاجرت مجموعة من المسلمين إلى الحبشة (إثيوبيا) طلباً للحماية من الملك المسيحي النجاشي. استمع الملك لرسالتهم وسمح لهم بالبقاء.",
    },
    location: "Abyssinia (Ethiopia)",
    icon: MapPin,
    color: "purple",
  },
  {
    year: 619,
    era: "Persecution",
    title: { en: "Year of Sorrow", ar: "عام الحزن" },
    description: {
      en: "Both the Prophet's beloved wife Khadijah and his protective uncle Abu Talib passed away. This was a deeply difficult time for the Prophet ﷺ, losing two of his greatest supporters.",
      ar: "توفيت زوجة النبي الحبيبة خديجة وعمه الحامي أبو طالب. كان هذا وقتاً صعباً جداً للنبي ﷺ، بفقدانه اثنين من أعظم مؤيديه.",
    },
    location: "Makkah",
    icon: Moon,
    color: "slate",
  },
  {
    year: 620,
    era: "Miracles",
    title: { en: "Isra and Mi'raj (Night Journey)", ar: "الإسراء والمعراج" },
    description: {
      en: "Prophet Muhammad ﷺ was miraculously transported from Makkah to Jerusalem (Isra) and then ascended through the heavens (Mi'raj). During this journey, the five daily prayers were prescribed.",
      ar: "نُقل النبي محمد ﷺ بمعجزة من مكة إلى القدس (الإسراء) ثم صعد عبر السماوات (المعراج). خلال هذه الرحلة، فُرضت الصلوات الخمس اليومية.",
    },
    location: "Makkah to Jerusalem to Heavens",
    icon: Star,
    color: "emerald",
  },
  {
    year: 622,
    era: "Hijrah",
    title: {
      en: "The Hijrah (Migration to Madinah)",
      ar: "الهجرة إلى المدينة",
    },
    description: {
      en: "Prophet Muhammad ﷺ and the Muslims migrated from Makkah to Madinah. This event is so significant that it marks the beginning of the Islamic calendar. In Madinah, the first Islamic community was established.",
      ar: "هاجر النبي محمد ﷺ والمسلمون من مكة إلى المدينة. هذا الحدث مهم جداً لدرجة أنه يُمثل بداية التقويم الإسلامي. في المدينة، تأسس أول مجتمع إسلامي.",
    },
    location: "From Makkah to Madinah",
    icon: MapPin,
    color: "emerald",
  },
  {
    year: 624,
    era: "Madinah Period",
    title: { en: "Battle of Badr", ar: "غزوة بدر" },
    description: {
      en: "The first major battle between Muslims and the Quraysh. Despite being outnumbered (313 vs 1000), the Muslims achieved a decisive victory. This battle is mentioned in the Quran as a day when Allah sent angels to help.",
      ar: "أول معركة كبرى بين المسلمين وقريش. رغم قلة عددهم (313 ضد 1000)، حقق المسلمون نصراً حاسماً. هذه المعركة مذكورة في القرآن كيوم أرسل فيه الله ملائكة للمساعدة.",
    },
    location: "Badr (near Madinah)",
    icon: Swords,
    color: "red",
  },
  {
    year: 625,
    era: "Madinah Period",
    title: { en: "Battle of Uhud", ar: "غزوة أحد" },
    description: {
      en: "The Quraysh sought revenge for Badr. The battle taught important lessons about obedience and patience. The Prophet ﷺ was injured, and many companions were martyred including Hamza, the Prophet's uncle.",
      ar: "سعت قريش للانتقام من بدر. المعركة علّمت دروساً مهمة عن الطاعة والصبر. أُصيب النبي ﷺ، واستُشهد كثير من الصحابة بما فيهم حمزة، عم النبي.",
    },
    location: "Mount Uhud (near Madinah)",
    icon: Swords,
    color: "orange",
  },
  {
    year: 627,
    era: "Madinah Period",
    title: { en: "Battle of the Trench", ar: "غزوة الخندق" },
    description: {
      en: "A coalition of 10,000 soldiers besieged Madinah. Following Salman al-Farisi's suggestion, the Muslims dug a trench to defend the city. The siege failed, marking a turning point in the conflict.",
      ar: "حاصر تحالف من 10,000 جندي المدينة. باتباع اقتراح سلمان الفارسي، حفر المسلمون خندقاً للدفاع عن المدينة. فشل الحصار، مما شكّل نقطة تحول في الصراع.",
    },
    location: "Madinah",
    icon: Swords,
    color: "blue",
  },
  {
    year: 628,
    era: "Madinah Period",
    title: { en: "Treaty of Hudaybiyyah", ar: "صلح الحديبية" },
    description: {
      en: 'A peace treaty was signed between Muslims and the Quraysh. Though initially seeming unfavorable to Muslims, it was called "a clear victory" in the Quran and allowed Islam to spread rapidly.',
      ar: 'وُقعت معاهدة سلام بين المسلمين وقريش. رغم أنها بدت في البداية غير مواتية للمسلمين، سُميت "فتحاً مبيناً" في القرآن وسمحت للإسلام بالانتشار السريع.',
    },
    location: "Hudaybiyyah (near Makkah)",
    icon: Users,
    color: "teal",
  },
  {
    year: 630,
    era: "Victory",
    title: { en: "Conquest of Makkah", ar: "فتح مكة" },
    description: {
      en: "The Prophet ﷺ led 10,000 Muslims to Makkah. The city was taken peacefully, and the Prophet ﷺ declared a general amnesty. He entered the Ka'bah and removed all idols, restoring it to the worship of One God.",
      ar: "قاد النبي ﷺ 10,000 مسلم إلى مكة. فُتحت المدينة سلمياً، وأعلن النبي ﷺ عفواً عاماً. دخل الكعبة وأزال جميع الأصنام، مُعيداً إياها لعبادة الله الواحد.",
    },
    location: "Makkah",
    icon: Building2,
    color: "emerald",
  },
  {
    year: 632,
    era: "Completion",
    title: {
      en: "Farewell Pilgrimage & Completion of Islam",
      ar: "حجة الوداع وإتمام الإسلام",
    },
    description: {
      en: 'The Prophet ﷺ performed his only Hajj, delivering the famous Farewell Sermon to over 100,000 pilgrims. During this time, the verse was revealed: "Today I have perfected your religion for you."',
      ar: 'أدى النبي ﷺ حجته الوحيدة، مُلقياً خطبة الوداع الشهيرة على أكثر من 100,000 حاج. خلال هذا الوقت، نزلت الآية: "اليوم أكملت لكم دينكم."',
    },
    location: "Makkah & Arafat",
    icon: Building2,
    color: "amber",
  },
  {
    year: 632,
    era: "Completion",
    title: { en: "Passing of Prophet Muhammad ﷺ", ar: "وفاة النبي محمد ﷺ" },
    description: {
      en: "The Prophet ﷺ passed away in Madinah at age 63. His mission was complete - Islam had been perfected and would continue through his companions and followers for generations to come.",
      ar: "توفي النبي ﷺ في المدينة عن عمر 63 عاماً. اكتملت مهمته - أُتم الإسلام وسيستمر من خلال صحابته وأتباعه للأجيال القادمة.",
    },
    location: "Madinah",
    icon: Moon,
    color: "slate",
  },
];

const eras = [
  "All",
  "Pre-Islam",
  "Revelation",
  "Persecution",
  "Miracles",
  "Hijrah",
  "Madinah Period",
  "Victory",
  "Completion",
];

export default function HistoryPage() {
  const { language: lang } = useSettingsStore();
  const [selectedEra, setSelectedEra] = useState("All");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const filteredEvents =
    selectedEra === "All"
      ? timelineEvents
      : timelineEvents.filter((e) => e.era === selectedEra);

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    slate: "bg-slate-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
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
              {lang === "en" ? "Islamic History" : "التاريخ الإسلامي"}
            </h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {lang === "en" ? "Journey Through Time" : "رحلة عبر الزمن"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Explore the key events in the life of Prophet Muhammad ﷺ and the early days of Islam"
              : "استكشف الأحداث الرئيسية في حياة النبي محمد ﷺ وأيام الإسلام الأولى"}
          </p>
        </motion.div>

        {/* Era Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedEra === era
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredEvents.map((event, index) => {
                const Icon = event.icon;
                const isExpanded = expandedEvent === index;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={event.year + event.title.en}
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative flex items-start ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full ${colorMap[event.color]} flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                    >
                      <Card
                        variant="default"
                        padding="md"
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() =>
                          setExpandedEvent(isExpanded ? null : index)
                        }
                      >
                        {/* Year badge */}
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${colorMap[event.color]} bg-opacity-20 text-${event.color}-700 dark:text-${event.color}-400`}
                          style={{
                            backgroundColor: `var(--${event.color}-100, #f0fdf4)`,
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{event.year} CE</span>
                        </div>

                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                          {event.title[lang]}
                        </h3>

                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                                {event.description[lang]}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              {lang === "en" ? "Show less" : "أقل"}
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              {lang === "en" ? "Read more" : "اقرأ المزيد"}
                            </>
                          )}
                        </button>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card variant="gradient" padding="lg" className="text-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Continue Learning" : "تابع التعلم"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {lang === "en"
                ? "Dive deeper into Islamic history through our comprehensive lessons"
                : "تعمق أكثر في التاريخ الإسلامي من خلال دروسنا الشاملة"}
            </p>
            <Link href="/journey">
              <Button variant="primary">
                {lang === "en" ? "Back to Journey" : "العودة للرحلة"}
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
