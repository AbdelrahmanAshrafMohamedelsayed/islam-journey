"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { ProgressBar } from "@/components/ui/Progress";
import {
  ArrowLeft,
  Trophy,
  Star,
  Flame,
  BookOpen,
  Target,
  Award,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

// Achievement data
const achievements = [
  {
    id: "first-step",
    title: { en: "First Step", ar: "الخطوة الأولى" },
    description: {
      en: "Complete your first lesson",
      ar: "أكمل درسك الأول",
    },
    icon: "🎯",
    xpRequired: 0,
    lessonsRequired: 1,
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "scholar",
    title: { en: "Scholar", ar: "عالم" },
    description: {
      en: "Complete 10 lessons",
      ar: "أكمل 10 دروس",
    },
    icon: "📚",
    xpRequired: 0,
    lessonsRequired: 10,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "dedicated",
    title: { en: "Dedicated", ar: "مخلص" },
    description: {
      en: "Maintain a 7-day streak",
      ar: "حافظ على سلسلة 7 أيام",
    },
    icon: "🔥",
    xpRequired: 0,
    lessonsRequired: 0,
    streakRequired: 7,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "xp-hunter",
    title: { en: "XP Hunter", ar: "صائد النقاط" },
    description: {
      en: "Earn 500 XP",
      ar: "اكسب 500 XP",
    },
    icon: "⭐",
    xpRequired: 500,
    lessonsRequired: 0,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "pillar-master",
    title: { en: "Pillar Master", ar: "سيد الأركان" },
    description: {
      en: "Complete any pillar chapter",
      ar: "أكمل أي فصل من الأركان",
    },
    icon: "🏛️",
    xpRequired: 0,
    lessonsRequired: 0,
    chaptersRequired: 1,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "rising-star",
    title: { en: "Rising Star", ar: "نجم صاعد" },
    description: {
      en: "Reach Level 5",
      ar: "وصول للمستوى 5",
    },
    icon: "🌟",
    xpRequired: 0,
    lessonsRequired: 0,
    levelRequired: 5,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "devoted",
    title: { en: "Devoted", ar: "متفاني" },
    description: {
      en: "Maintain a 30-day streak",
      ar: "حافظ على سلسلة 30 يوم",
    },
    icon: "💎",
    xpRequired: 0,
    lessonsRequired: 0,
    streakRequired: 30,
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "master",
    title: { en: "Master", ar: "خبير" },
    description: {
      en: "Complete all lessons",
      ar: "أكمل جميع الدروس",
    },
    icon: "👑",
    xpRequired: 0,
    lessonsRequired: 50,
    color: "from-yellow-500 to-amber-600",
  },
];

export default function ProfilePage() {
  const { language, learningMode } = useSettingsStore();
  const {
    totalXp,
    level,
    completedLessons,
    completedChapters,
    streakDays,
    lastActivityDate,
  } = useProgressStore();
  const isArabic = language === "ar";
  const isJourneyMode = learningMode === "journey";

  // Calculate level progress
  const xpPerLevel = 500;
  const currentLevelXp = totalXp % xpPerLevel;
  const nextLevelXp = xpPerLevel;
  const levelProgress = (currentLevelXp / nextLevelXp) * 100;

  // Check achievement status
  const isAchievementUnlocked = (achievement: (typeof achievements)[0]) => {
    if (achievement.lessonsRequired && achievement.lessonsRequired > 0) {
      return completedLessons.length >= achievement.lessonsRequired;
    }
    if (achievement.xpRequired && achievement.xpRequired > 0) {
      return totalXp >= achievement.xpRequired;
    }
    if (achievement.streakRequired && achievement.streakRequired > 0) {
      return streakDays >= achievement.streakRequired;
    }
    if (achievement.chaptersRequired && achievement.chaptersRequired > 0) {
      return completedChapters.length >= achievement.chaptersRequired;
    }
    if (achievement.levelRequired && achievement.levelRequired > 0) {
      return level >= achievement.levelRequired;
    }
    return false;
  };

  const unlockedCount = achievements.filter(isAchievementUnlocked).length;

  // Stats for Modules mode
  const totalLessonsAvailable = 50; // Approximate
  const progressPercentage = Math.round(
    (completedLessons.length / totalLessonsAvailable) * 100,
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button
              variant="ghost"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {isArabic ? "العودة" : "Back"}
            </Button>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 pattern-arabesque opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-5xl">
              🌙
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {isArabic ? "مسلم جديد" : "New Muslim"}
              </h1>
              <p className="text-white/80 mb-4">
                {isArabic
                  ? "في رحلة لتعلم الإسلام"
                  : "On a journey to learn Islam"}
              </p>

              {isJourneyMode && (
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <div className="text-xl font-bold">{level}</div>
                    <div className="text-xs text-white/70">
                      {isArabic ? "المستوى" : "Level"}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <div className="text-xl font-bold">{totalXp}</div>
                    <div className="text-xs text-white/70">
                      {isArabic ? "إجمالي XP" : "Total XP"}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <div className="text-xl font-bold">{streakDays}</div>
                    <div className="text-xs text-white/70">
                      {isArabic ? "سلسلة الأيام" : "Day Streak"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Level Progress - Journey Mode Only */}
        {isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    {isArabic ? `المستوى ${level}` : `Level ${level}`}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {currentLevelXp} / {nextLevelXp} XP{" "}
                    {isArabic ? "للمستوى التالي" : "to next level"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.round(levelProgress)}%
                </div>
              </div>
            </div>
            <ProgressBar value={levelProgress} variant="default" />
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedLessons.length}
              </span>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {isArabic ? "دروس مكتملة" : "Lessons Completed"}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedChapters.length}
              </span>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {isArabic ? "فصول مكتملة" : "Chapters Done"}
            </span>
          </div>

          {isJourneyMode && (
            <>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {unlockedCount}
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {isArabic ? "إنجازات" : "Achievements"}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {streakDays}
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {isArabic ? "سلسلة الأيام" : "Day Streak"}
                </span>
              </div>
            </>
          )}

          {!isJourneyMode && (
            <>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {progressPercentage}%
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {isArabic ? "التقدم الكلي" : "Total Progress"}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {lastActivityDate
                      ? new Date(lastActivityDate).toLocaleDateString(
                          isArabic ? "ar" : "en",
                          { month: "short", day: "numeric" },
                        )
                      : "-"}
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {isArabic ? "آخر نشاط" : "Last Active"}
                </span>
              </div>
            </>
          )}
        </motion.div>

        {/* Achievements - Journey Mode Only */}
        {isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {isArabic ? "الإنجازات" : "Achievements"}
              <span className="text-sm font-normal text-slate-500">
                ({unlockedCount}/{achievements.length})
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const unlocked = isAchievementUnlocked(achievement);

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`relative rounded-2xl p-5 border transition-all ${
                      unlocked
                        ? "bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                          unlocked
                            ? `bg-linear-to-r ${achievement.color}`
                            : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      >
                        {unlocked ? (
                          achievement.icon
                        ) : (
                          <Lock className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {isArabic
                            ? achievement.title.ar
                            : achievement.title.en}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {isArabic
                            ? achievement.description.ar
                            : achievement.description.en}
                        </p>
                      </div>

                      {/* Status */}
                      {unlocked && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Learning Journey Summary - Modules Mode */}
        {!isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              {isArabic ? "ملخص التعلم" : "Learning Summary"}
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-400">
                    {isArabic ? "التقدم الكلي" : "Overall Progress"}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {progressPercentage}%
                  </span>
                </div>
                <ProgressBar value={progressPercentage} variant="default" />
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isArabic
                  ? `لقد أكملت ${completedLessons.length} من ${totalLessonsAvailable} درس متاح. استمر في التعلم!`
                  : `You've completed ${completedLessons.length} of ${totalLessonsAvailable} available lessons. Keep learning!`}
              </p>

              <Link href="/journey">
                <Button variant="primary" className="w-full">
                  {isArabic ? "متابعة التعلم" : "Continue Learning"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
