"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Cloud,
  Star,
  Copy,
  Check,
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

interface Dua {
  id: string;
  title: { en: string; ar: string };
  arabic: string;
  transliteration: string;
  translation: { en: string; ar: string };
  reference: string;
  category: string;
  occasion?: string;
}

const duas: Dua[] = [
  {
    id: "morning-1",
    title: { en: "Morning Remembrance", ar: "أذكار الصباح" },
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
    translation: {
      en: "We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah alone, without any partner.",
      ar: "دخلنا في الصباح ودخل الملك لله والحمد لله لا إله إلا الله وحده لا شريك له",
    },
    reference: "Abu Dawud",
    category: "morning",
  },
  {
    id: "evening-1",
    title: { en: "Evening Remembrance", ar: "أذكار المساء" },
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah",
    translation: {
      en: "We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah alone, without any partner.",
      ar: "دخلنا في المساء ودخل الملك لله والحمد لله لا إله إلا الله وحده لا شريك له",
    },
    reference: "Abu Dawud",
    category: "evening",
  },
  {
    id: "sleep-1",
    title: { en: "Before Sleeping", ar: "قبل النوم" },
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amootu wa ahya",
    translation: {
      en: "In Your name O Allah, I die and I live.",
      ar: "باسمك اللهم أموت وأحيا",
    },
    reference: "Bukhari",
    category: "sleep",
  },
  {
    id: "wake-1",
    title: { en: "Upon Waking Up", ar: "عند الاستيقاظ" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-lathee ahyana ba'da ma amatana wa ilayhin-nushoor",
    translation: {
      en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
      ar: "الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور",
    },
    reference: "Bukhari",
    category: "wake",
  },
  {
    id: "food-before",
    title: { en: "Before Eating", ar: "قبل الطعام" },
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barakatillah",
    translation: {
      en: "In the name of Allah and with the blessings of Allah.",
      ar: "بسم الله وعلى بركة الله",
    },
    reference: "Abu Dawud",
    category: "food",
  },
  {
    id: "food-after",
    title: { en: "After Eating", ar: "بعد الطعام" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-lathee at'amana wa saqana wa ja'alna muslimeen",
    translation: {
      en: "All praise is for Allah who fed us, gave us drink, and made us Muslims.",
      ar: "الحمد لله الذي أطعمنا وسقانا وجعلنا مسلمين",
    },
    reference: "Abu Dawud, Tirmidhi",
    category: "food",
  },
  {
    id: "travel-1",
    title: { en: "When Starting a Journey", ar: "عند السفر" },
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Subhanal-lathee sakh-khara lana hatha wama kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon",
    translation: {
      en: "Glory unto Him Who created this transportation for us though we were unable to create it on our own. And unto our Lord we shall return.",
      ar: "سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون",
    },
    reference: "Muslim",
    category: "travel",
  },
  {
    id: "home-enter",
    title: { en: "Entering Home", ar: "دخول المنزل" },
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi Rabbina tawakkalna",
    translation: {
      en: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend.",
      ar: "بسم الله ولجنا وبسم الله خرجنا وعلى الله ربنا توكلنا",
    },
    reference: "Abu Dawud",
    category: "home",
  },
  {
    id: "masjid-enter",
    title: { en: "Entering Masjid", ar: "دخول المسجد" },
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahumma aftah lee abwaba rahmatik",
    translation: {
      en: "O Allah, open for me the doors of Your mercy.",
      ar: "اللهم افتح لي أبواب رحمتك",
    },
    reference: "Muslim",
    category: "masjid",
  },
  {
    id: "distress-1",
    title: { en: "During Distress", ar: "عند الكرب" },
    arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "La ilaha illallahul-'Atheemul-Haleem, la ilaha illallahu Rabbul-'Arshil-'Atheem",
    translation: {
      en: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Magnificent Throne.",
      ar: "لا إله إلا الله العظيم الحليم لا إله إلا الله رب العرش العظيم",
    },
    reference: "Bukhari, Muslim",
    category: "distress",
  },
  {
    id: "forgiveness-1",
    title: { en: "Seeking Forgiveness", ar: "الاستغفار" },
    arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha-lathee la ilaha illa huwal-Hayyul-Qayyoomu wa atoobu ilayhi",
    translation: {
      en: "I seek forgiveness from Allah, besides Whom there is no god, the Ever-Living, the Self-Subsisting, and I turn to Him in repentance.",
      ar: "أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه",
    },
    reference: "Abu Dawud, Tirmidhi",
    category: "forgiveness",
  },
  {
    id: "protection-1",
    title: { en: "Seeking Protection", ar: "طلب الحماية" },
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'oothu bikalimatil-lahit-tammati min sharri ma khalaq",
    translation: {
      en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      ar: "أعوذ بكلمات الله التامات من شر ما خلق",
    },
    reference: "Muslim",
    category: "protection",
  },
];

const categories = [
  { id: "all", label: { en: "All Duas", ar: "جميع الأدعية" }, icon: <BookOpen className="w-4 h-4" /> },
  { id: "morning", label: { en: "Morning", ar: "الصباح" }, icon: <Sunrise className="w-4 h-4" /> },
  { id: "evening", label: { en: "Evening", ar: "المساء" }, icon: <Sunset className="w-4 h-4" /> },
  { id: "sleep", label: { en: "Sleep", ar: "النوم" }, icon: <Moon className="w-4 h-4" /> },
  { id: "wake", label: { en: "Wake Up", ar: "الاستيقاظ" }, icon: <Sun className="w-4 h-4" /> },
  { id: "food", label: { en: "Food", ar: "الطعام" }, icon: <Heart className="w-4 h-4" /> },
  { id: "travel", label: { en: "Travel", ar: "السفر" }, icon: <Cloud className="w-4 h-4" /> },
  { id: "protection", label: { en: "Protection", ar: "الحماية" }, icon: <Star className="w-4 h-4" /> },
];

// Dua Card Component
const DuaCard = ({ dua, lang, isSaved, onToggleSave }: { 
  dua: Dua; 
  lang: "en" | "ar"; 
  isSaved: boolean;
  onToggleSave: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(dua.arabic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">{dua.title[lang]}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{dua.reference}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onToggleSave}
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-emerald-500" />
              ) : (
                <Bookmark className="w-5 h-5 text-slate-400" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="p-4">
        <p className="text-2xl text-right font-arabic leading-loose text-slate-800 dark:text-white mb-4" dir="rtl">
          {dua.arabic}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          {expanded 
            ? (lang === "en" ? "Show less" : "أقل") 
            : (lang === "en" ? "Show transliteration & translation" : "عرض النطق والترجمة")}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {lang === "en" ? "Transliteration" : "النطق"}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 italic">{dua.transliteration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {lang === "en" ? "Translation" : "الترجمة"}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">{dua.translation[lang]}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          leftIcon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        >
          {copied ? (lang === "en" ? "Copied!" : "تم النسخ!") : (lang === "en" ? "Copy" : "نسخ")}
        </Button>
      </div>
    </motion.div>
  );
};

export default function DuaPage() {
  const { language: lang } = useSettingsStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedDuas, setSavedDuas] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Load saved duas from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedDuas");
    if (saved) setSavedDuas(JSON.parse(saved));
  }, []);

  // Save to localStorage when savedDuas changes
  useEffect(() => {
    localStorage.setItem("savedDuas", JSON.stringify(savedDuas));
  }, [savedDuas]);

  const toggleSaveDua = (duaId: string) => {
    setSavedDuas((prev) =>
      prev.includes(duaId) ? prev.filter((id) => id !== duaId) : [...prev, duaId]
    );
  };

  const filteredDuas = duas.filter((dua) => {
    const matchesCategory = selectedCategory === "all" || dua.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      dua.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.title.ar.includes(searchQuery) ||
      dua.arabic.includes(searchQuery);
    const matchesSaved = !showSavedOnly || savedDuas.includes(dua.id);
    return matchesCategory && matchesSearch && matchesSaved;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/journey">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                {lang === "en" ? "Journey" : "الرحلة"}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                {lang === "en" ? "Dua Collection" : "مجموعة الأدعية"}
              </h1>
            </div>
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`p-2 rounded-full transition-colors ${
                showSavedOnly 
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                  : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {showSavedOnly ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Search duas..." : "ابحث عن الأدعية..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === cat.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }
                `}
              >
                {cat.icon}
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Results count */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {filteredDuas.length} {lang === "en" ? "duas found" : "دعاء"}
          {showSavedOnly && ` (${lang === "en" ? "saved only" : "المحفوظة فقط"})`}
        </p>

        {/* Duas Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredDuas.map((dua) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                lang={lang}
                isSaved={savedDuas.includes(dua.id)}
                onToggleSave={() => toggleSaveDua(dua.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredDuas.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              {lang === "en" ? "No duas found" : "لم يتم العثور على أدعية"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {lang === "en" ? "Try adjusting your search or filters" : "حاول تعديل البحث أو الفلاتر"}
            </p>
          </motion.div>
        )}

        {/* Daily Dua Reminder */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                {lang === "en" ? "Daily Reminder" : "تذكير يومي"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                {lang === "en" 
                  ? "The Prophet ﷺ said: \"The supplication of every one of you is granted if he does not grow impatient.\"" 
                  : "قال النبي ﷺ: \"يُستجاب لأحدكم ما لم يعجل\""}
              </p>
              <p className="text-xs text-slate-500">— Sahih al-Bukhari & Muslim</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
