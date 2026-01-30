"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Book,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Repeat,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/lib/stores";

// Sample Quran data - Surah Al-Fatiha with audio
interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    ar: string;
  };
}

interface Surah {
  number: number;
  name: { en: string; ar: string };
  englishName: string;
  verses: Verse[];
  audioUrl?: string;
}

// First 3 Surahs for demo
const surahs: Surah[] = [
  {
    number: 1,
    name: { en: "Al-Fatiha", ar: "الفاتحة" },
    englishName: "The Opening",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
    verses: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahir Rahmanir Raheem",
        translation: {
          en: "In the name of Allah, the Most Gracious, the Most Merciful.",
          ar: "باسم الله الرحمن الرحيم",
        },
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Alhamdu lillahi Rabbil aalameen",
        translation: {
          en: "All praise is due to Allah, Lord of all the worlds.",
          ar: "الحمد لله رب العالمين",
        },
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Ar-Rahmanir-Raheem",
        translation: {
          en: "The Most Gracious, the Most Merciful.",
          ar: "الرحمن الرحيم",
        },
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        transliteration: "Maliki yawmid-deen",
        translation: {
          en: "Master of the Day of Judgment.",
          ar: "مالك يوم الدين",
        },
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
        translation: {
          en: "You alone we worship, and You alone we ask for help.",
          ar: "إياك نعبد وإياك نستعين",
        },
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinas-siratal mustaqeem",
        translation: {
          en: "Guide us on the Straight Path.",
          ar: "اهدنا الصراط المستقيم",
        },
      },
      {
        number: 7,
        arabic:
          "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        transliteration:
          "Siratal lazeena an'amta 'alaihim, ghairil maghdoobi 'alaihim wa lad-daalleen",
        translation: {
          en: "The path of those whom You have blessed, not of those who have incurred [Your] wrath, nor of those who have gone astray.",
          ar: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين",
        },
      },
    ],
  },
  {
    number: 112,
    name: { en: "Al-Ikhlas", ar: "الإخلاص" },
    englishName: "The Sincerity",
    verses: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        transliteration: "Qul huwal laahu ahad",
        translation: {
          en: 'Say, "He is Allah, [Who is] One.',
          ar: "قل هو الله أحد",
        },
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        transliteration: "Allahus samad",
        translation: {
          en: "Allah, the Eternal Refuge.",
          ar: "الله الصمد",
        },
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        transliteration: "Lam yalid wa lam yoolad",
        translation: {
          en: "He neither begets nor is born.",
          ar: "لم يلد ولم يولد",
        },
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        transliteration: "Wa lam yakul lahu kufuwan ahad",
        translation: {
          en: "Nor is there to Him any equivalent.",
          ar: "ولم يكن له كفوا أحد",
        },
      },
    ],
  },
  {
    number: 113,
    name: { en: "Al-Falaq", ar: "الفلق" },
    englishName: "The Daybreak",
    verses: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        transliteration: "Qul a'oozu bi rabbil falaq",
        translation: {
          en: 'Say, "I seek refuge in the Lord of daybreak.',
          ar: "قل أعوذ برب الفلق",
        },
      },
      {
        number: 2,
        arabic: "مِن شَرِّ مَا خَلَقَ",
        transliteration: "Min sharri ma khalaq",
        translation: {
          en: "From the evil of that which He created.",
          ar: "من شر ما خلق",
        },
      },
      {
        number: 3,
        arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        transliteration: "Wa min sharri ghasiqin iza waqab",
        translation: {
          en: "And from the evil of darkness when it settles.",
          ar: "ومن شر غاسق إذا وقب",
        },
      },
      {
        number: 4,
        arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        transliteration: "Wa min sharrin naffasati fil 'uqad",
        translation: {
          en: "And from the evil of the blowers in knots.",
          ar: "ومن شر النفاثات في العقد",
        },
      },
      {
        number: 5,
        arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa min sharri hasidin iza hasad",
        translation: {
          en: "And from the evil of an envier when he envies.",
          ar: "ومن شر حاسد إذا حسد",
        },
      },
    ],
  },
  {
    number: 114,
    name: { en: "An-Nas", ar: "الناس" },
    englishName: "Mankind",
    verses: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration: "Qul a'oozu bi rabbin naas",
        translation: {
          en: 'Say, "I seek refuge in the Lord of mankind.',
          ar: "قل أعوذ برب الناس",
        },
      },
      {
        number: 2,
        arabic: "مَلِكِ النَّاسِ",
        transliteration: "Malikin naas",
        translation: {
          en: "The Sovereign of mankind.",
          ar: "ملك الناس",
        },
      },
      {
        number: 3,
        arabic: "إِلَٰهِ النَّاسِ",
        transliteration: "Ilahin naas",
        translation: {
          en: "The God of mankind.",
          ar: "إله الناس",
        },
      },
      {
        number: 4,
        arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        transliteration: "Min sharril waswasil khannas",
        translation: {
          en: "From the evil of the retreating whisperer.",
          ar: "من شر الوسواس الخناس",
        },
      },
      {
        number: 5,
        arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        transliteration: "Allazi yuwaswisu fi sudurin naas",
        translation: {
          en: "Who whispers in the breasts of mankind.",
          ar: "الذي يوسوس في صدور الناس",
        },
      },
      {
        number: 6,
        arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        transliteration: "Minal jinnati wannaas",
        translation: {
          en: "From among the jinn and mankind.",
          ar: "من الجنة والناس",
        },
      },
    ],
  },
];

export default function QuranReaderPage() {
  const { language: lang } = useSettingsStore();
  const isArabic = lang === "ar";

  // State
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahs[0]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isRepeatMode, setIsRepeatMode] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showSurahList, setShowSurahList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quran-bookmarks");
    if (saved) {
      setBookmarks(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = (newBookmarks: Set<string>) => {
    setBookmarks(newBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify([...newBookmarks]));
  };

  const toggleBookmark = (surahNum: number, verseNum: number) => {
    const key = `${surahNum}:${verseNum}`;
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(key)) {
      newBookmarks.delete(key);
    } else {
      newBookmarks.add(key);
    }
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (surahNum: number, verseNum: number) => {
    return bookmarks.has(`${surahNum}:${verseNum}`);
  };

  // Audio controls
  const playAudio = useCallback(() => {
    // In a full implementation, you'd have audio files for each verse
    // For now, we'll simulate playback
    setIsPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const nextVerse = useCallback(() => {
    if (currentVerseIndex < selectedSurah.verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else if (isRepeatMode) {
      setCurrentVerseIndex(0);
    }
  }, [currentVerseIndex, selectedSurah.verses.length, isRepeatMode]);

  const previousVerse = useCallback(() => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
    }
  }, [currentVerseIndex]);

  // Auto-advance when playing (simulated)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        nextVerse();
      }, 5000); // 5 seconds per verse for demo
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextVerse]);

  const filteredSurahs = surahs.filter(
    (s) =>
      s.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.ar.includes(searchQuery) ||
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentVerse = selectedSurah.verses[currentVerseIndex];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            {isArabic ? "القرآن الكريم" : "Quran Reader"}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSurahList(!showSurahList)}
          >
            <Book className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-40">
        {/* Surah Selector */}
        <AnimatePresence>
          {showSurahList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={
                      isArabic ? "ابحث عن سورة..." : "Search surah..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => {
                        setSelectedSurah(surah);
                        setCurrentVerseIndex(0);
                        setShowSurahList(false);
                        setIsPlaying(false);
                      }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedSurah.number === surah.number
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {surah.number}.{" "}
                          {isArabic ? surah.name.ar : surah.name.en}
                        </span>
                        <span className="text-xs opacity-75">
                          {surah.verses.length} ayat
                        </span>
                      </div>
                      <span className="text-xs opacity-75">
                        {surah.englishName}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Surah Info */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-arabic">
            {selectedSurah.name.ar}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {selectedSurah.name.en} - {selectedSurah.englishName}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
            {isArabic
              ? `الآية ${currentVerseIndex + 1} من ${selectedSurah.verses.length}`
              : `Verse ${currentVerseIndex + 1} of ${selectedSurah.verses.length}`}
          </p>
        </div>

        {/* Display Options */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Button
            variant={showTransliteration ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowTransliteration(!showTransliteration)}
          >
            <span className="text-xs">
              {isArabic ? "النطق" : "Transliteration"}
            </span>
          </Button>
          <Button
            variant={showTranslation ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <Languages className="w-4 h-4 mr-1" />
            <span className="text-xs">
              {isArabic ? "الترجمة" : "Translation"}
            </span>
          </Button>
        </div>

        {/* Verses */}
        <div className="space-y-4">
          {selectedSurah.verses.map((verse, index) => (
            <motion.div
              key={verse.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 transition-all cursor-pointer ${
                  currentVerseIndex === index
                    ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "hover:shadow-md"
                }`}
                onClick={() => setCurrentVerseIndex(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                    {verse.number}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(selectedSurah.number, verse.number);
                    }}
                    className={`p-1 rounded transition-colors ${
                      isBookmarked(selectedSurah.number, verse.number)
                        ? "text-amber-500"
                        : "text-slate-400 hover:text-amber-500"
                    }`}
                  >
                    {isBookmarked(selectedSurah.number, verse.number) ? (
                      <BookmarkCheck className="w-5 h-5" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Arabic Text */}
                <p
                  className="text-3xl leading-loose text-right font-arabic text-slate-900 dark:text-white mb-4"
                  dir="rtl"
                >
                  {verse.arabic}
                </p>

                {/* Transliteration */}
                {showTransliteration && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 italic mb-2">
                    {verse.transliteration}
                  </p>
                )}

                {/* Translation */}
                {showTranslation && (
                  <p className="text-slate-600 dark:text-slate-400">
                    {isArabic ? verse.translation.ar : verse.translation.en}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-slate-500 w-8">
              {currentVerseIndex + 1}
            </span>
            <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentVerseIndex + 1) / selectedSurah.verses.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs text-slate-500 w-8 text-right">
              {selectedSurah.verses.length}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Repeat Toggle */}
            <button
              onClick={() => setIsRepeatMode(!isRepeatMode)}
              className={`p-2 rounded-full transition-colors ${
                isRepeatMode
                  ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Repeat className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button
              onClick={previousVerse}
              disabled={currentVerseIndex === 0}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="p-4 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextVerse}
              disabled={
                currentVerseIndex === selectedSurah.verses.length - 1 &&
                !isRepeatMode
              }
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30"
            >
              <SkipForward className="w-6 h-6" />
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-full transition-colors ${
                isMuted ? "text-red-500" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Current Verse Preview */}
          <div className="mt-3 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
              <span className="font-arabic">
                {currentVerse.arabic.substring(0, 50)}...
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
