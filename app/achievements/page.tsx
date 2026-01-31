"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Star,
  Flame,
  BookOpen,
  Moon,
  Sparkles,
  Medal,
  Crown,
  Zap,
  Target,
  Heart,
  Calendar,
  Clock,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

interface Achievement {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: React.ReactNode;
  category: "learning" | "streak" | "milestone" | "special";
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

const achievements: Achievement[] = [
  // Learning Achievements
  {
    id: "first-lesson",
    title: { en: "First Steps", ar: "الخطوات الأولى" },
    description: { en: "Complete your first lesson", ar: "أكمل درسك الأول" },
    icon: <BookOpen className="w-6 h-6" />,
    category: "learning",
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: "2024-01-15",
    rarity: "common",
    xpReward: 50,
  },
  {
    id: "five-pillars",
    title: { en: "Pillar Master", ar: "سيد الأركان" },
    description: {
      en: "Complete all Five Pillars chapters",
      ar: "أكمل جميع فصول أركان الإسلام الخمسة",
    },
    icon: <Star className="w-6 h-6" />,
    category: "learning",
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    rarity: "epic",
    xpReward: 500,
  },
  {
    id: "quran-explorer",
    title: { en: "Quran Explorer", ar: "مستكشف القرآن" },
    description: { en: "Read 10 different surahs", ar: "اقرأ 10 سور مختلفة" },
    icon: <BookOpen className="w-6 h-6" />,
    category: "learning",
    progress: 4,
    maxProgress: 10,
    unlocked: false,
    rarity: "rare",
    xpReward: 200,
  },
  {
    id: "dua-collector",
    title: { en: "Dua Collector", ar: "جامع الأدعية" },
    description: {
      en: "Save 20 duas to your collection",
      ar: "احفظ 20 دعاء في مجموعتك",
    },
    icon: <Heart className="w-6 h-6" />,
    category: "learning",
    progress: 5,
    maxProgress: 20,
    unlocked: false,
    rarity: "rare",
    xpReward: 150,
  },

  // Streak Achievements
  {
    id: "week-streak",
    title: { en: "Week Warrior", ar: "محارب الأسبوع" },
    description: {
      en: "Maintain a 7-day learning streak",
      ar: "حافظ على سلسلة تعلم لمدة 7 أيام",
    },
    icon: <Flame className="w-6 h-6" />,
    category: "streak",
    progress: 5,
    maxProgress: 7,
    unlocked: false,
    rarity: "common",
    xpReward: 100,
  },
  {
    id: "month-streak",
    title: { en: "Month Master", ar: "سيد الشهر" },
    description: {
      en: "Maintain a 30-day learning streak",
      ar: "حافظ على سلسلة تعلم لمدة 30 يوماً",
    },
    icon: <Calendar className="w-6 h-6" />,
    category: "streak",
    progress: 5,
    maxProgress: 30,
    unlocked: false,
    rarity: "epic",
    xpReward: 500,
  },
  {
    id: "ramadan-complete",
    title: { en: "Ramadan Champion", ar: "بطل رمضان" },
    description: {
      en: "Complete daily lessons throughout Ramadan",
      ar: "أكمل الدروس اليومية طوال رمضان",
    },
    icon: <Moon className="w-6 h-6" />,
    category: "streak",
    progress: 0,
    maxProgress: 30,
    unlocked: false,
    rarity: "legendary",
    xpReward: 1000,
  },

  // Milestone Achievements
  {
    id: "level-5",
    title: { en: "Rising Scholar", ar: "العالم الصاعد" },
    description: { en: "Reach Level 5", ar: "الوصول إلى المستوى 5" },
    icon: <Zap className="w-6 h-6" />,
    category: "milestone",
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    rarity: "common",
    xpReward: 100,
  },
  {
    id: "level-10",
    title: { en: "Knowledge Seeker", ar: "طالب العلم" },
    description: { en: "Reach Level 10", ar: "الوصول إلى المستوى 10" },
    icon: <Target className="w-6 h-6" />,
    category: "milestone",
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    rarity: "rare",
    xpReward: 250,
  },
  {
    id: "level-25",
    title: { en: "Wisdom Master", ar: "سيد الحكمة" },
    description: { en: "Reach Level 25", ar: "الوصول إلى المستوى 25" },
    icon: <Crown className="w-6 h-6" />,
    category: "milestone",
    progress: 3,
    maxProgress: 25,
    unlocked: false,
    rarity: "legendary",
    xpReward: 1000,
  },
  {
    id: "xp-1000",
    title: { en: "XP Hunter", ar: "صياد النقاط" },
    description: { en: "Earn 1,000 total XP", ar: "اكسب 1,000 نقطة خبرة" },
    icon: <Sparkles className="w-6 h-6" />,
    category: "milestone",
    progress: 450,
    maxProgress: 1000,
    unlocked: false,
    rarity: "common",
    xpReward: 100,
  },

  // Special Achievements
  {
    id: "night-owl",
    title: { en: "Night Owl", ar: "بومة الليل" },
    description: {
      en: "Complete a lesson after midnight",
      ar: "أكمل درساً بعد منتصف الليل",
    },
    icon: <Moon className="w-6 h-6" />,
    category: "special",
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: "rare",
    xpReward: 150,
  },
  {
    id: "early-bird",
    title: { en: "Early Bird", ar: "الطائر المبكر" },
    description: {
      en: "Complete a lesson before Fajr",
      ar: "أكمل درساً قبل الفجر",
    },
    icon: <Clock className="w-6 h-6" />,
    category: "special",
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: "2024-01-20",
    rarity: "rare",
    xpReward: 150,
  },
  {
    id: "perfectionist",
    title: { en: "Perfectionist", ar: "الكمالي" },
    description: {
      en: "Get 100% on 10 quizzes",
      ar: "احصل على 100% في 10 اختبارات",
    },
    icon: <Medal className="w-6 h-6" />,
    category: "special",
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    rarity: "epic",
    xpReward: 400,
  },
  {
    id: "historian",
    title: { en: "Islamic Historian", ar: "المؤرخ الإسلامي" },
    description: {
      en: "View all historical events in Time Traveler",
      ar: "شاهد جميع الأحداث التاريخية في آلة الزمن",
    },
    icon: <Clock className="w-6 h-6" />,
    category: "special",
    progress: 6,
    maxProgress: 10,
    unlocked: false,
    rarity: "epic",
    xpReward: 300,
  },
];

const categoryLabels = {
  learning: { en: "Learning", ar: "التعلم" },
  streak: { en: "Streaks", ar: "السلاسل" },
  milestone: { en: "Milestones", ar: "المراحل" },
  special: { en: "Special", ar: "خاصة" },
};

const rarityColors = {
  common: "from-slate-400 to-slate-500",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-orange-500",
};

const rarityBgColors = {
  common: "bg-slate-100 dark:bg-slate-800",
  rare: "bg-blue-50 dark:bg-blue-900/20",
  epic: "bg-purple-50 dark:bg-purple-900/20",
  legendary: "bg-amber-50 dark:bg-amber-900/20",
};

const rarityLabels = {
  common: { en: "Common", ar: "عادي" },
  rare: { en: "Rare", ar: "نادر" },
  epic: { en: "Epic", ar: "ملحمي" },
  legendary: { en: "Legendary", ar: "أسطوري" },
};

// Achievement Card Component
const AchievementCard = ({
  achievement,
  lang,
}: {
  achievement: Achievement;
  lang: "en" | "ar";
}) => {
  const progress = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative rounded-2xl overflow-hidden
        ${achievement.unlocked ? rarityBgColors[achievement.rarity] : "bg-slate-100 dark:bg-slate-800 opacity-70"}
      `}
    >
      {/* Locked overlay */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/30 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`
            w-14 h-14 rounded-xl flex items-center justify-center shrink-0
            ${
              achievement.unlocked
                ? `bg-linear-to-br ${rarityColors[achievement.rarity]} text-white shadow-lg`
                : "bg-slate-200 dark:bg-slate-700 text-slate-400"
            }
          `}
          >
            {achievement.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-bold truncate ${achievement.unlocked ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
              >
                {achievement.title[lang]}
              </h3>
              {achievement.unlocked && (
                <span
                  className={`
                  text-xs px-2 py-0.5 rounded-full font-medium
                  ${achievement.rarity === "legendary" ? "bg-amber-200 text-amber-800" : ""}
                  ${achievement.rarity === "epic" ? "bg-purple-200 text-purple-800" : ""}
                  ${achievement.rarity === "rare" ? "bg-blue-200 text-blue-800" : ""}
                  ${achievement.rarity === "common" ? "bg-slate-200 text-slate-700" : ""}
                `}
                >
                  {rarityLabels[achievement.rarity][lang]}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {achievement.description[lang]}
            </p>

            {/* Progress bar */}
            {!achievement.unlocked && (
              <div className="space-y-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-linear-to-r ${rarityColors[achievement.rarity]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                  <span>+{achievement.xpReward} XP</span>
                </div>
              </div>
            )}

            {/* Unlocked date */}
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Trophy className="w-3 h-3" />
                <span>
                  {lang === "en" ? "Unlocked" : "فُتح"} {achievement.unlockedAt}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AchievementsPage() {
  const { language: lang } = useSettingsStore();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | Achievement["category"]
  >("all");
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  const filteredAchievements = achievements.filter((a) => {
    const matchesCategory =
      selectedCategory === "all" || a.category === selectedCategory;
    const matchesUnlocked = !showUnlockedOnly || a.unlocked;
    return matchesCategory && matchesUnlocked;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/journey">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Journey" : "الرحلة"}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                {lang === "en" ? "Achievements" : "الإنجازات"}
              </h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-4 text-center">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {unlockedCount}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Unlocked" : "مفتوح"}
            </p>
          </div>
          <div className="bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-4 text-center">
            <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {totalXP}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "XP Earned" : "نقاط مكتسبة"}
            </p>
          </div>
          <div className="bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {achievements.length}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Total" : "المجموع"}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {lang === "en" ? "All" : "الكل"}
          </button>
          {(Object.keys(categoryLabels) as Achievement["category"][]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {categoryLabels[cat][lang]}
              </button>
            ),
          )}
          <button
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ml-auto ${
              showUnlockedOnly
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {lang === "en" ? "Unlocked Only" : "المفتوحة فقط"}
          </button>
        </div>

        {/* Achievement Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                lang={lang}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredAchievements.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Trophy className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              {lang === "en"
                ? "No achievements found"
                : "لم يتم العثور على إنجازات"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {lang === "en"
                ? "Keep learning to unlock achievements!"
                : "استمر في التعلم لفتح الإنجازات!"}
            </p>
          </motion.div>
        )}

        {/* Motivation Section */}
        <motion.div
          className="mt-12 p-6 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                {lang === "en" ? "Next Achievement" : "الإنجاز التالي"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                {lang === "en"
                  ? 'You\'re 2 days away from "Week Warrior" - keep your streak going!'
                  : 'أنت على بعد يومين من "محارب الأسبوع" - حافظ على سلسلتك!'}
              </p>
              <div className="h-2 bg-white/50 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-purple-400 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: "71%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
