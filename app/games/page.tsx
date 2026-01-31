"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Gamepad2,
  Brain,
  Sparkles,
  Trophy,
  Star,
  Check,
  X,
  RotateCcw,
  Zap,
  Clock,
  Target,
  Shuffle,
  Timer,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  useSettingsStore,
  useProgressStore,
  useGameStatsStore,
} from "@/lib/stores";

type GameMode =
  | "menu"
  | "trivia"
  | "memory"
  | "word-scramble"
  | "speed-quiz"
  | "true-false";

interface TriviaQuestion {
  question: { en: string; ar: string };
  options: { en: string; ar: string }[];
  correct: number;
  explanation: { en: string; ar: string };
}

interface MemoryCard {
  id: number;
  content: string;
  arabic: string;
  isEnglish: boolean;
  isFlipped: boolean;
  isMatched: boolean;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    question: {
      en: "How many times do Muslims pray each day?",
      ar: "كم مرة يصلي المسلمون كل يوم؟",
    },
    options: [
      { en: "3 times", ar: "3 مرات" },
      { en: "5 times", ar: "5 مرات" },
      { en: "7 times", ar: "7 مرات" },
      { en: "2 times", ar: "مرتين" },
    ],
    correct: 1,
    explanation: {
      en: "Muslims pray 5 times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
      ar: "يصلي المسلمون 5 مرات يومياً: الفجر، الظهر، العصر، المغرب، والعشاء.",
    },
  },
  {
    question: {
      en: "What is the holy book of Islam?",
      ar: "ما هو الكتاب المقدس في الإسلام؟",
    },
    options: [
      { en: "Torah", ar: "التوراة" },
      { en: "Bible", ar: "الإنجيل" },
      { en: "Quran", ar: "القرآن" },
      { en: "Vedas", ar: "الفيدا" },
    ],
    correct: 2,
    explanation: {
      en: "The Quran is the holy book revealed to Prophet Muhammad ﷺ over 23 years.",
      ar: "القرآن هو الكتاب المقدس الذي أُنزل على النبي محمد ﷺ على مدى 23 عاماً.",
    },
  },
  {
    question: {
      en: "What is the first pillar of Islam?",
      ar: "ما هو الركن الأول في الإسلام؟",
    },
    options: [
      { en: "Salah (Prayer)", ar: "الصلاة" },
      { en: "Shahada (Declaration of Faith)", ar: "الشهادة" },
      { en: "Zakat (Charity)", ar: "الزكاة" },
      { en: "Sawm (Fasting)", ar: "الصوم" },
    ],
    correct: 1,
    explanation: {
      en: "The Shahada is the declaration that there is no god but Allah and Muhammad is His messenger.",
      ar: "الشهادة هي إعلان أن لا إله إلا الله وأن محمداً رسول الله.",
    },
  },
  {
    question: {
      en: "In which month do Muslims fast?",
      ar: "في أي شهر يصوم المسلمون؟",
    },
    options: [
      { en: "Shaban", ar: "شعبان" },
      { en: "Ramadan", ar: "رمضان" },
      { en: "Muharram", ar: "محرم" },
      { en: "Dhul Hijjah", ar: "ذو الحجة" },
    ],
    correct: 1,
    explanation: {
      en: "Ramadan is the 9th month of the Islamic calendar when the Quran was first revealed.",
      ar: "رمضان هو الشهر التاسع في التقويم الإسلامي حين أُنزل القرآن لأول مرة.",
    },
  },
  {
    question: {
      en: "What city do Muslims face when praying?",
      ar: "ما المدينة التي يتوجه إليها المسلمون عند الصلاة؟",
    },
    options: [
      { en: "Madinah", ar: "المدينة" },
      { en: "Jerusalem", ar: "القدس" },
      { en: "Makkah", ar: "مكة" },
      { en: "Cairo", ar: "القاهرة" },
    ],
    correct: 2,
    explanation: {
      en: "Muslims face the Kaaba in Makkah, the first house of worship built by Prophet Ibrahim.",
      ar: "يتوجه المسلمون نحو الكعبة في مكة، أول بيت عبادة بناه النبي إبراهيم.",
    },
  },
  {
    question: {
      en: "How many chapters (surahs) are in the Quran?",
      ar: "كم عدد السور في القرآن؟",
    },
    options: [
      { en: "99", ar: "99" },
      { en: "114", ar: "114" },
      { en: "124", ar: "124" },
      { en: "100", ar: "100" },
    ],
    correct: 1,
    explanation: {
      en: "The Quran has 114 surahs, with Al-Fatiha being the first and An-Nas the last.",
      ar: "القرآن يحتوي على 114 سورة، الفاتحة هي الأولى والناس هي الأخيرة.",
    },
  },
  {
    question: {
      en: "What is the name of the angel who revealed the Quran?",
      ar: "ما اسم الملك الذي أنزل القرآن؟",
    },
    options: [
      { en: "Mikail", ar: "ميكائيل" },
      { en: "Israfil", ar: "إسرافيل" },
      { en: "Jibreel", ar: "جبريل" },
      { en: "Azrael", ar: "عزرائيل" },
    ],
    correct: 2,
    explanation: {
      en: "Angel Jibreel (Gabriel) delivered Allah's revelations to Prophet Muhammad ﷺ.",
      ar: "الملك جبريل هو من نقل وحي الله إلى النبي محمد ﷺ.",
    },
  },
  {
    question: {
      en: "What percentage of wealth is given as Zakat?",
      ar: "ما نسبة المال التي تُعطى كزكاة؟",
    },
    options: [
      { en: "1%", ar: "1%" },
      { en: "2.5%", ar: "2.5%" },
      { en: "5%", ar: "5%" },
      { en: "10%", ar: "10%" },
    ],
    correct: 1,
    explanation: {
      en: "Zakat is 2.5% of savings held for a full lunar year, given to those in need.",
      ar: "الزكاة هي 2.5% من المدخرات المحفوظة لعام قمري كامل، تُعطى للمحتاجين.",
    },
  },
];

const memoryPairs = [
  { content: "Salah", arabic: "الصلاة" },
  { content: "Zakat", arabic: "الزكاة" },
  { content: "Sawm", arabic: "الصوم" },
  { content: "Hajj", arabic: "الحج" },
  { content: "Quran", arabic: "القرآن" },
  { content: "Masjid", arabic: "مسجد" },
];

const wordScrambles = [
  {
    word: "QURAN",
    hint: { en: "Holy book of Islam", ar: "الكتاب المقدس في الإسلام" },
  },
  {
    word: "SALAH",
    hint: {
      en: "Prayer performed 5 times daily",
      ar: "الصلاة التي تؤدى 5 مرات يومياً",
    },
  },
  { word: "RAMADAN", hint: { en: "Month of fasting", ar: "شهر الصيام" } },
  {
    word: "MAKKAH",
    hint: { en: "Holiest city in Islam", ar: "أقدس مدينة في الإسلام" },
  },
  { word: "ZAKAT", hint: { en: "Obligatory charity", ar: "الصدقة الواجبة" } },
  { word: "HAJJ", hint: { en: "Pilgrimage to Makkah", ar: "الحج إلى مكة" } },
  { word: "IMAN", hint: { en: "Faith in Arabic", ar: "الإيمان بالعربية" } },
  { word: "ALLAH", hint: { en: "God in Arabic", ar: "الله" } },
];

// Trivia Game Component
const TriviaGame = ({
  lang,
  onBack,
}: {
  lang: "en" | "ar";
  onBack: () => void;
}) => {
  const { addXp } = useProgressStore();
  const {
    incrementGamesPlayed,
    updateHighScore,
    incrementPerfectRounds,
    addGameXp,
  } = useGameStatsStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const question = triviaQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrectAnswer = index === question.correct;
    if (isCorrectAnswer) {
      setScore((prev) => prev + (10 + streak * 2));
      setStreak((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < triviaQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Game complete - track stats
        const finalScore = score + (isCorrectAnswer ? 10 + streak * 2 : 0);
        const finalCorrect = correctAnswers + (isCorrectAnswer ? 1 : 0);

        incrementGamesPlayed();
        updateHighScore("trivia", finalScore);
        addGameXp(finalScore);

        // Award XP to main progress
        const xpEarned = Math.floor(finalScore / 2);
        addXp(xpEarned);

        // Check for perfect round
        if (finalCorrect === triviaQuestions.length) {
          incrementPerfectRounds();
        }

        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setStreak(0);
    setCorrectAnswers(0);
  };

  if (gameComplete) {
    const percentage = Math.round(
      (score / (triviaQuestions.length * 10)) * 100,
    );
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {lang === "en" ? "Quiz Complete!" : "انتهت المسابقة!"}
        </h2>
        <p className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-500 mb-4">
          {score}
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          {percentage >= 80
            ? lang === "en"
              ? "Excellent! You're a true scholar! 🌟"
              : "ممتاز! أنت عالم حقيقي! 🌟"
            : percentage >= 50
              ? lang === "en"
                ? "Good job! Keep learning! 📚"
                : "أحسنت! استمر في التعلم! 📚"
              : lang === "en"
                ? "Keep practicing! You'll improve! 💪"
                : "استمر في التدريب! ستتحسن! 💪"}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={resetGame}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {lang === "en" ? "Play Again" : "العب مرة أخرى"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {lang === "en" ? "Back to Games" : "العودة للألعاب"}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <span className="text-slate-600 dark:text-slate-300">
            {currentQuestion + 1}/{triviaQuestions.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {streak > 1 && (
            <motion.div
              className="flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">
                {streak}x
              </span>
            </motion.div>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-slate-800 dark:text-white">
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentQuestion + 1) / triviaQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            {question.question[lang]}
          </h2>

          <div className="grid gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    relative p-4 rounded-xl text-left transition-all
                    ${showCorrect ? "bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500" : ""}
                    ${showWrong ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-500" : ""}
                    ${!showResult ? "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500" : ""}
                    ${selectedAnswer !== null && !isSelected && !isCorrect ? "opacity-50" : ""}
                  `}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                >
                  <span className="font-medium text-slate-800 dark:text-white">
                    {option[lang]}
                  </span>
                  {showCorrect && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-6 h-6 text-emerald-500" />
                    </motion.div>
                  )}
                  {showWrong && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <X className="w-6 h-6 text-red-500" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {question.explanation[lang]}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Memory Game Component
const MemoryGame = ({
  lang,
  onBack,
}: {
  lang: "en" | "ar";
  onBack: () => void;
}) => {
  const { addXp } = useProgressStore();
  const {
    incrementGamesPlayed,
    updateHighScore,
    incrementPerfectRounds,
    addGameXp,
  } = useGameStatsStore();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [hasTrackedStats, setHasTrackedStats] = useState(false);

  const initGame = useCallback(() => {
    // Create English cards and Arabic cards
    const englishCards = memoryPairs.map((pair, index) => ({
      id: index,
      content: pair.content,
      arabic: pair.arabic,
      isEnglish: true,
      isFlipped: false,
      isMatched: false,
    }));
    const arabicCards = memoryPairs.map((pair, index) => ({
      id: index + memoryPairs.length,
      content: pair.arabic,
      arabic: pair.arabic,
      isEnglish: false,
      isFlipped: false,
      isMatched: false,
    }));
    const shuffled = [...englishCards, ...arabicCards].sort(
      () => Math.random() - 0.5,
    );
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (cardIndex: number) => {
    const card = cards[cardIndex];
    if (
      isChecking ||
      flippedCards.length >= 2 ||
      card.isFlipped ||
      card.isMatched
    )
      return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, cardIndex]);

    if (flippedCards.length === 1) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const firstCard = cards[flippedCards[0]];
      const secondCard = newCards[cardIndex];

      // Check if one is English and one is Arabic from the same pair
      const isMatch = memoryPairs.some(
        (p) =>
          (p.content === firstCard.content &&
            p.arabic === secondCard.content) ||
          (p.arabic === firstCard.content && p.content === secondCard.content),
      );

      setTimeout(() => {
        if (isMatch) {
          newCards[flippedCards[0]].isMatched = true;
          newCards[cardIndex].isMatched = true;
          setCards([...newCards]);

          if (newCards.every((c) => c.isMatched)) {
            setGameComplete(true);
          }
        } else {
          newCards[flippedCards[0]].isFlipped = false;
          newCards[cardIndex].isFlipped = false;
          setCards([...newCards]);
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  // Track stats when game completes
  useEffect(() => {
    if (gameComplete && !hasTrackedStats) {
      const memoryScore = Math.max(100 - moves * 5, 10); // Better score for fewer moves
      incrementGamesPlayed();
      updateHighScore("memory", memoryScore);
      addGameXp(memoryScore);

      // Award XP
      const xpEarned = Math.floor(memoryScore / 2);
      addXp(xpEarned);

      // Perfect round if completed in minimum moves (6 pairs = 6 moves minimum)
      if (moves <= 8) {
        incrementPerfectRounds();
      }
      setHasTrackedStats(true);
    }
  }, [
    gameComplete,
    hasTrackedStats,
    moves,
    incrementGamesPlayed,
    updateHighScore,
    addGameXp,
    addXp,
    incrementPerfectRounds,
  ]);

  if (gameComplete) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Brain className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {lang === "en" ? "Memory Master!" : "سيد الذاكرة!"}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-2">
          {lang === "en"
            ? `Completed in ${moves} moves`
            : `أكملت في ${moves} حركة`}
        </p>
        <p className="text-emerald-500 mb-8">
          {moves <= 8
            ? lang === "en"
              ? "Perfect memory! 🧠✨"
              : "ذاكرة مثالية! 🧠✨"
            : moves <= 12
              ? lang === "en"
                ? "Great job! 🌟"
                : "عمل رائع! 🌟"
              : lang === "en"
                ? "Keep practicing! 💪"
                : "استمر في التدريب! 💪"}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={initGame}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {lang === "en" ? "Play Again" : "العب مرة أخرى"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {lang === "en" ? "Back to Games" : "العودة للألعاب"}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span className="text-slate-600 dark:text-slate-300">
            {lang === "en"
              ? "Match English with Arabic"
              : "طابق الإنجليزية مع العربية"}
          </span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          <span className="text-slate-600 dark:text-slate-300 text-sm">
            {lang === "en" ? "Moves:" : "الحركات:"} {moves}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-400">
        <p className="mb-2">
          {lang === "en"
            ? "🎯 Find matching pairs: Match each English word with its Arabic translation"
            : "🎯 اعثر على الأزواج: طابق كل كلمة إنجليزية مع ترجمتها العربية"}
        </p>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-blue-500"></span>{" "}
            {lang === "en" ? "English" : "إنجليزي"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-emerald-500"></span>{" "}
            {lang === "en" ? "Arabic" : "عربي"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`
              aspect-square rounded-xl text-center font-bold transition-all relative
              ${
                card.isFlipped || card.isMatched
                  ? card.isEnglish
                    ? "bg-linear-to-br from-blue-400 to-indigo-500 text-white"
                    : "bg-linear-to-br from-emerald-400 to-teal-500 text-white"
                  : "bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
              }
              ${card.isMatched ? "opacity-60" : ""}
            `}
            whileHover={
              !card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}
            }
            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
          >
            {(card.isFlipped || card.isMatched) && (
              <>
                <span className="absolute top-1 left-1 text-xs opacity-75 px-1 rounded bg-white/20">
                  {card.isEnglish ? "EN" : "عربي"}
                </span>
                <span
                  className={`text-lg ${card.isEnglish ? "" : "font-arabic"}`}
                >
                  {card.content}
                </span>
              </>
            )}
            {!card.isFlipped && !card.isMatched && (
              <Sparkles className="w-6 h-6 mx-auto text-slate-400 dark:text-slate-500" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Word Scramble Game Component
const WordScrambleGame = ({
  lang,
  onBack,
}: {
  lang: "en" | "ar";
  onBack: () => void;
}) => {
  const { addXp } = useProgressStore();
  const {
    incrementGamesPlayed,
    updateHighScore,
    incrementPerfectRounds,
    addGameXp,
  } = useGameStatsStore();
  const [currentWord, setCurrentWord] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctWords, setCorrectWords] = useState(0);
  const [hasTrackedStats, setHasTrackedStats] = useState(false);

  const word = wordScrambles[currentWord];

  const scrambleWord = useCallback((w: string) => {
    return w
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }, []);

  useEffect(() => {
    setScrambled(scrambleWord(word.word));
    setUserInput("");
    setShowHint(false);
    setIsCorrect(null);
    setTimeLeft(30);
  }, [currentWord, word.word, scrambleWord]);

  useEffect(() => {
    if (timeLeft > 0 && !isCorrect && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isCorrect === null) {
      handleNext();
    }
  }, [timeLeft, isCorrect, gameComplete]);

  // Track stats when game completes
  useEffect(() => {
    if (gameComplete && !hasTrackedStats) {
      incrementGamesPlayed();
      updateHighScore("wordScramble", score);
      addGameXp(score);

      // Award XP
      const xpEarned = Math.floor(score / 2);
      addXp(xpEarned);

      // Perfect round if all words correct
      if (correctWords === wordScrambles.length) {
        incrementPerfectRounds();
      }
      setHasTrackedStats(true);
    }
  }, [
    gameComplete,
    hasTrackedStats,
    score,
    correctWords,
    incrementGamesPlayed,
    updateHighScore,
    addGameXp,
    addXp,
    incrementPerfectRounds,
  ]);

  const handleSubmit = () => {
    if (userInput.toUpperCase() === word.word) {
      setIsCorrect(true);
      setScore((prev) => prev + (showHint ? 5 : 10) + Math.floor(timeLeft / 3));
      setCorrectWords((prev) => prev + 1);
      setTimeout(() => handleNext(), 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  const handleNext = () => {
    if (currentWord < wordScrambles.length - 1) {
      setCurrentWord((prev) => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentWord(0);
    setScore(0);
    setGameComplete(false);
    setCorrectWords(0);
    setHasTrackedStats(false);
  };

  if (gameComplete) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Shuffle className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {lang === "en" ? "Word Master!" : "سيد الكلمات!"}
        </h2>
        <p className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500 mb-4">
          {score}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={resetGame}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {lang === "en" ? "Play Again" : "العب مرة أخرى"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {lang === "en" ? "Back to Games" : "العودة للألعاب"}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="text-slate-600 dark:text-slate-300">
            {currentWord + 1}/{wordScrambles.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${timeLeft <= 10 ? "bg-red-100 dark:bg-red-900/30" : "bg-slate-100 dark:bg-slate-800"}`}
          >
            <Clock
              className={`w-4 h-4 ${timeLeft <= 10 ? "text-red-500" : "text-slate-500"}`}
            />
            <span
              className={`text-sm font-medium ${timeLeft <= 10 ? "text-red-500" : "text-slate-600 dark:text-slate-300"}`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-slate-800 dark:text-white">
              {score}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <motion.div
            className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500 mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {scrambled}
          </motion.div>

          {showHint && (
            <motion.p
              className="text-slate-500 dark:text-slate-400 mb-4 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {lang === "en" ? "Hint: " : "تلميح: "}
              {word.hint[lang]}
            </motion.p>
          )}

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={
                lang === "en" ? "Type your answer..." : "اكتب إجابتك..."
              }
              className={`
                flex-1 px-4 py-3 rounded-xl border-2 text-center font-bold text-lg uppercase
                ${isCorrect === true ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30" : ""}
                ${isCorrect === false ? "border-red-500 bg-red-50 dark:bg-red-900/30 animate-shake" : ""}
                ${isCorrect === null ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" : ""}
                focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white
              `}
            />
            <Button onClick={handleSubmit} disabled={!userInput}>
              <Check className="w-5 h-5" />
            </Button>
          </div>

          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              {lang === "en"
                ? "Need a hint? (-5 points)"
                : "تحتاج تلميح؟ (-5 نقاط)"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// SPEED QUIZ GAME - Race against the clock!
// ==========================================
interface SpeedQuestion {
  question: { en: string; ar: string };
  options: { en: string; ar: string }[];
  correct: number;
}

const speedQuizQuestions: SpeedQuestion[] = [
  {
    question: {
      en: "The Kaaba is located in which city?",
      ar: "الكعبة تقع في أي مدينة؟",
    },
    options: [
      { en: "Medina", ar: "المدينة" },
      { en: "Mecca", ar: "مكة" },
      { en: "Jerusalem", ar: "القدس" },
      { en: "Cairo", ar: "القاهرة" },
    ],
    correct: 1,
  },
  {
    question: {
      en: "How many surahs are in the Quran?",
      ar: "كم عدد سور القرآن؟",
    },
    options: [
      { en: "100", ar: "١٠٠" },
      { en: "114", ar: "١١٤" },
      { en: "120", ar: "١٢٠" },
      { en: "99", ar: "٩٩" },
    ],
    correct: 1,
  },
  {
    question: {
      en: "Which prophet built the Kaaba?",
      ar: "أي نبي بنى الكعبة؟",
    },
    options: [
      { en: "Prophet Musa", ar: "النبي موسى" },
      { en: "Prophet Isa", ar: "النبي عيسى" },
      { en: "Prophet Ibrahim", ar: "النبي إبراهيم" },
      { en: "Prophet Nuh", ar: "النبي نوح" },
    ],
    correct: 2,
  },
  {
    question: {
      en: "What is the night journey called?",
      ar: "ماذا تسمى رحلة الليل؟",
    },
    options: [
      { en: "Hijra", ar: "الهجرة" },
      { en: "Isra", ar: "الإسراء" },
      { en: "Umrah", ar: "العمرة" },
      { en: "Hajj", ar: "الحج" },
    ],
    correct: 1,
  },
  {
    question: {
      en: "First revelation was in which month?",
      ar: "نزل الوحي الأول في أي شهر؟",
    },
    options: [
      { en: "Shaban", ar: "شعبان" },
      { en: "Ramadan", ar: "رمضان" },
      { en: "Rajab", ar: "رجب" },
      { en: "Muharram", ar: "محرم" },
    ],
    correct: 1,
  },
  {
    question: { en: "What is zakat?", ar: "ما هي الزكاة؟" },
    options: [
      { en: "Fasting", ar: "الصيام" },
      { en: "Prayer", ar: "الصلاة" },
      { en: "Charity", ar: "الصدقة" },
      { en: "Pilgrimage", ar: "الحج" },
    ],
    correct: 2,
  },
  {
    question: {
      en: "Which surah is called the heart of Quran?",
      ar: "أي سورة تسمى قلب القرآن؟",
    },
    options: [
      { en: "Al-Fatiha", ar: "الفاتحة" },
      { en: "Al-Baqarah", ar: "البقرة" },
      { en: "Yasin", ar: "يس" },
      { en: "Al-Ikhlas", ar: "الإخلاص" },
    ],
    correct: 2,
  },
  {
    question: {
      en: "Prophet's wife Khadija was the ____ Muslim",
      ar: "زوجة النبي خديجة كانت ____ المسلمين",
    },
    options: [
      { en: "Second", ar: "ثاني" },
      { en: "Third", ar: "ثالث" },
      { en: "First woman", ar: "أول امرأة" },
      { en: "Last", ar: "آخر" },
    ],
    correct: 2,
  },
];

const SpeedQuizGame = ({
  lang,
  onBack,
}: {
  lang: "en" | "ar";
  onBack: () => void;
}) => {
  const { addXp } = useProgressStore();
  const {
    incrementGamesPlayed,
    updateHighScore,
    incrementPerfectRounds,
    addGameXp,
  } = useGameStatsStore();

  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hasTrackedStats, setHasTrackedStats] = useState(false);

  // Initialize game
  useEffect(() => {
    const shuffled = [...speedQuizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffled);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isComplete || selectedAnswer !== null || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - move to next
          handleAnswer(-1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, selectedAnswer, isComplete, questions.length]);

  // Track stats when game completes
  useEffect(() => {
    if (isComplete && !hasTrackedStats) {
      incrementGamesPlayed();
      updateHighScore("trivia", score);
      addGameXp(score);
      addXp(Math.floor(score / 2));
      if (correctAnswers === questions.length) {
        incrementPerfectRounds();
      }
      setHasTrackedStats(true);
    }
  }, [isComplete, hasTrackedStats, score, correctAnswers, questions.length]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentIndex].correct;

    if (isCorrect) {
      const timeBonus = timeLeft * 2;
      setScore((prev) => prev + 10 + timeBonus);
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setIsComplete(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(10);
      }
    }, 1000);
  };

  const resetGame = () => {
    const shuffled = [...speedQuizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(10);
    setIsComplete(false);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setHasTrackedStats(false);
  };

  if (questions.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-6"
        >
          {correctAnswers >= 4 ? "🏆" : correctAnswers >= 2 ? "⭐" : "💪"}
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {lang === "en" ? "Speed Round Complete!" : "انتهت الجولة السريعة!"}
        </h2>
        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          {score} {lang === "en" ? "points" : "نقطة"}
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {correctAnswers}/{questions.length}{" "}
          {lang === "en" ? "correct answers" : "إجابات صحيحة"}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={resetGame}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {lang === "en" ? "Play Again" : "العب مرة أخرى"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {lang === "en" ? "Back to Games" : "العودة للألعاب"}
          </Button>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress & Timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Timer
            className={`w-5 h-5 ${timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-blue-500"}`}
          />
          <span
            className={`text-xl font-bold ${timeLeft <= 3 ? "text-red-500" : "text-slate-800 dark:text-white"}`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-800 dark:text-white">
            {score}
          </span>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          className={`h-full ${timeLeft <= 3 ? "bg-red-500" : "bg-blue-500"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 10) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg mb-6"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center">
          {question.question[lang]}
        </h3>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correct;
          const showResult = selectedAnswer !== null;

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              className={`
                p-4 rounded-xl font-medium text-center transition-all
                ${showResult && isCorrect ? "bg-emerald-500 text-white" : ""}
                ${showResult && isSelected && !isCorrect ? "bg-red-500 text-white" : ""}
                ${!showResult ? "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600" : ""}
                ${showResult && !isSelected && !isCorrect ? "opacity-50" : ""}
              `}
            >
              {option[lang]}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// TRUE OR FALSE GAME
// ==========================================
interface TrueFalseQuestion {
  statement: { en: string; ar: string };
  isTrue: boolean;
  explanation: { en: string; ar: string };
}

const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    statement: {
      en: "Muslims pray 5 times a day",
      ar: "المسلمون يصلون 5 مرات في اليوم",
    },
    isTrue: true,
    explanation: {
      en: "Yes! Fajr, Dhuhr, Asr, Maghrib, and Isha.",
      ar: "نعم! الفجر، الظهر، العصر، المغرب، والعشاء.",
    },
  },
  {
    statement: {
      en: "Ramadan is the 8th month of the Islamic calendar",
      ar: "رمضان هو الشهر الثامن من التقويم الإسلامي",
    },
    isTrue: false,
    explanation: {
      en: "Ramadan is the 9th month.",
      ar: "رمضان هو الشهر التاسع.",
    },
  },
  {
    statement: {
      en: "The Quran was revealed over 23 years",
      ar: "القرآن نزل على مدى 23 سنة",
    },
    isTrue: true,
    explanation: {
      en: "Correct! It was revealed gradually to Prophet Muhammad ﷺ.",
      ar: "صحيح! نزل تدريجياً على النبي محمد ﷺ.",
    },
  },
  {
    statement: {
      en: "Hajj is performed in the month of Rajab",
      ar: "الحج يؤدى في شهر رجب",
    },
    isTrue: false,
    explanation: {
      en: "Hajj is performed in Dhul Hijjah.",
      ar: "الحج يؤدى في ذي الحجة.",
    },
  },
  {
    statement: {
      en: "Prophet Muhammad ﷺ was born in Mecca",
      ar: "النبي محمد ﷺ ولد في مكة",
    },
    isTrue: true,
    explanation: {
      en: "Yes, he was born in Mecca around 570 CE.",
      ar: "نعم، ولد في مكة حوالي 570 ميلادي.",
    },
  },
  {
    statement: { en: "Zakat is 10% of wealth", ar: "الزكاة 10% من الثروة" },
    isTrue: false,
    explanation: {
      en: "Zakat is 2.5% of savings.",
      ar: "الزكاة 2.5% من المدخرات.",
    },
  },
  {
    statement: {
      en: "Wudu must be performed before prayer",
      ar: "الوضوء يجب أن يكون قبل الصلاة",
    },
    isTrue: true,
    explanation: {
      en: "Yes, ritual purification is required before prayer.",
      ar: "نعم، الطهارة مطلوبة قبل الصلاة.",
    },
  },
  {
    statement: {
      en: "Friday prayer is called Jummah",
      ar: "صلاة الجمعة تسمى الجمعة",
    },
    isTrue: true,
    explanation: {
      en: "Correct! Jummah is the congregational Friday prayer.",
      ar: "صحيح! الجمعة هي صلاة الجماعة يوم الجمعة.",
    },
  },
  {
    statement: { en: "The Kaaba is a person", ar: "الكعبة شخص" },
    isTrue: false,
    explanation: {
      en: "The Kaaba is the sacred building in Mecca.",
      ar: "الكعبة هي البناء المقدس في مكة.",
    },
  },
  {
    statement: {
      en: "Surah Al-Fatiha is the first chapter of the Quran",
      ar: "سورة الفاتحة هي أول سورة في القرآن",
    },
    isTrue: true,
    explanation: {
      en: "Correct! It's recited in every unit of prayer.",
      ar: "صحيح! تُقرأ في كل ركعة من الصلاة.",
    },
  },
];

const TrueFalseGame = ({
  lang,
  onBack,
}: {
  lang: "en" | "ar";
  onBack: () => void;
}) => {
  const { addXp } = useProgressStore();
  const {
    incrementGamesPlayed,
    updateHighScore,
    incrementPerfectRounds,
    addGameXp,
  } = useGameStatsStore();

  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hasTrackedStats, setHasTrackedStats] = useState(false);

  // Initialize game
  useEffect(() => {
    const shuffled = [...trueFalseQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setQuestions(shuffled);
  }, []);

  // Track stats when game completes
  useEffect(() => {
    if (isComplete && !hasTrackedStats) {
      incrementGamesPlayed();
      updateHighScore("trivia", score);
      addGameXp(score);
      addXp(Math.floor(score / 2));
      if (correctAnswers === questions.length) {
        incrementPerfectRounds();
      }
      setHasTrackedStats(true);
    }
  }, [isComplete, hasTrackedStats, score, correctAnswers, questions.length]);

  const handleAnswer = (answer: boolean) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentIndex].isTrue;

    if (isCorrect) {
      const streakBonus = streak * 5;
      setScore((prev) => prev + 15 + streakBonus);
      setStreak((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setIsComplete(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 2000);
  };

  const resetGame = () => {
    const shuffled = [...trueFalseQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setHasTrackedStats(false);
  };

  if (questions.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-6"
        >
          {correctAnswers >= 5 ? "🎉" : correctAnswers >= 3 ? "👍" : "📚"}
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {lang === "en" ? "Game Complete!" : "انتهت اللعبة!"}
        </h2>
        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          {score} {lang === "en" ? "points" : "نقطة"}
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {correctAnswers}/{questions.length}{" "}
          {lang === "en" ? "correct" : "صحيح"}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={resetGame}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {lang === "en" ? "Play Again" : "العب مرة أخرى"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {lang === "en" ? "Back to Games" : "العودة للألعاب"}
          </Button>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress & Score */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-slate-500">
          {currentIndex + 1}/{questions.length}
        </div>
        {streak >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full"
          >
            <span className="text-orange-500">🔥</span>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {streak}x {lang === "en" ? "streak" : "متتالي"}
            </span>
          </motion.div>
        )}
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-800 dark:text-white">
            {score}
          </span>
        </div>
      </div>

      {/* Statement Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8"
      >
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 text-center">
          {lang === "en" ? "True or False?" : "صحيح أم خطأ؟"}
        </p>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center leading-relaxed">
          &ldquo;{question.statement[lang]}&rdquo;
        </h3>

        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              selectedAnswer === question.isTrue
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="text-sm">{question.explanation[lang]}</p>
          </motion.div>
        )}
      </motion.div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          onClick={() => handleAnswer(true)}
          disabled={selectedAnswer !== null}
          whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          className={`
            p-6 rounded-2xl font-bold text-xl flex flex-col items-center gap-2 transition-all
            ${selectedAnswer !== null && question.isTrue ? "bg-emerald-500 text-white" : ""}
            ${selectedAnswer === true && !question.isTrue ? "bg-red-500 text-white" : ""}
            ${selectedAnswer === null ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200" : ""}
            ${selectedAnswer !== null && selectedAnswer !== true && !question.isTrue ? "opacity-50" : ""}
          `}
        >
          <ThumbsUp className="w-8 h-8" />
          {lang === "en" ? "TRUE" : "صحيح"}
        </motion.button>

        <motion.button
          onClick={() => handleAnswer(false)}
          disabled={selectedAnswer !== null}
          whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          className={`
            p-6 rounded-2xl font-bold text-xl flex flex-col items-center gap-2 transition-all
            ${selectedAnswer !== null && !question.isTrue ? "bg-emerald-500 text-white" : ""}
            ${selectedAnswer === false && question.isTrue ? "bg-red-500 text-white" : ""}
            ${selectedAnswer === null ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200" : ""}
            ${selectedAnswer !== null && selectedAnswer !== false && question.isTrue ? "opacity-50" : ""}
          `}
        >
          <ThumbsDown className="w-8 h-8" />
          {lang === "en" ? "FALSE" : "خطأ"}
        </motion.button>
      </div>
    </div>
  );
};

// Main Games Page
export default function GamesPage() {
  const { language: lang } = useSettingsStore();
  const { gamesPlayed, perfectRounds, getOverallHighScore } =
    useGameStatsStore();
  const [gameMode, setGameMode] = useState<GameMode>("menu");

  const games = [
    {
      id: "trivia" as GameMode,
      title: { en: "Islamic Trivia", ar: "مسابقة إسلامية" },
      description: {
        en: "Test your knowledge with fun questions!",
        ar: "اختبر معلوماتك بأسئلة ممتعة!",
      },
      icon: <Brain className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      id: "memory" as GameMode,
      title: { en: "Memory Match", ar: "مطابقة الذاكرة" },
      description: {
        en: "Match English words with Arabic!",
        ar: "طابق الكلمات الإنجليزية مع العربية!",
      },
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: "word-scramble" as GameMode,
      title: { en: "Word Scramble", ar: "ترتيب الكلمات" },
      description: {
        en: "Unscramble Islamic terms!",
        ar: "رتب المصطلحات الإسلامية!",
      },
      icon: <Shuffle className="w-8 h-8" />,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "speed-quiz" as GameMode,
      title: { en: "Speed Quiz", ar: "اختبار السرعة" },
      description: {
        en: "Race against the clock!",
        ar: "سابق الزمن!",
      },
      icon: <Timer className="w-8 h-8" />,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      id: "true-false" as GameMode,
      title: { en: "True or False", ar: "صحيح أم خطأ" },
      description: {
        en: "Test Islamic facts!",
        ar: "اختبر المعلومات الإسلامية!",
      },
      icon: <ThumbsUp className="w-8 h-8" />,
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {gameMode !== "menu" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setGameMode("menu")}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back" : "رجوع"}
              </Button>
            ) : (
              <Link href="/journey">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  {lang === "en" ? "Journey" : "الرحلة"}
                </Button>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-emerald-500" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              {lang === "en" ? "Games" : "الألعاب"}
            </h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {gameMode === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 mb-4 shadow-lg shadow-emerald-500/30"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Gamepad2 className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {lang === "en" ? "Islamic Games" : "الألعاب الإسلامية"}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {lang === "en"
                    ? "Learn while having fun!"
                    : "تعلم وأنت تستمتع!"}
                </p>
              </div>

              {/* Game Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {games.map((game, index) => (
                  <motion.button
                    key={game.id}
                    onClick={() => setGameMode(game.id)}
                    className={`${game.bgColor} p-6 rounded-2xl text-left transition-all hover:shadow-lg group`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${game.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {game.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                      {game.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {game.description[lang]}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Stats Preview */}
              <motion.div
                className="mt-12 p-6 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    {lang === "en" ? "Your Progress" : "تقدمك"}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {gamesPlayed}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lang === "en" ? "Games Played" : "ألعاب لُعبت"}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {getOverallHighScore()}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lang === "en" ? "High Score" : "أعلى نتيجة"}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {perfectRounds}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lang === "en" ? "Perfect Rounds" : "جولات مثالية"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {gameMode === "trivia" && (
            <motion.div
              key="trivia"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TriviaGame lang={lang} onBack={() => setGameMode("menu")} />
            </motion.div>
          )}

          {gameMode === "memory" && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MemoryGame lang={lang} onBack={() => setGameMode("menu")} />
            </motion.div>
          )}

          {gameMode === "word-scramble" && (
            <motion.div
              key="word-scramble"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WordScrambleGame
                lang={lang}
                onBack={() => setGameMode("menu")}
              />
            </motion.div>
          )}

          {gameMode === "speed-quiz" && (
            <motion.div
              key="speed-quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SpeedQuizGame lang={lang} onBack={() => setGameMode("menu")} />
            </motion.div>
          )}

          {gameMode === "true-false" && (
            <motion.div
              key="true-false"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TrueFalseGame lang={lang} onBack={() => setGameMode("menu")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
