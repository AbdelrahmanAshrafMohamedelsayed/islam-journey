"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ModeSwitcher } from "@/components/ui/ModeSwitcher";
import { JourneyMap } from "@/components/journey";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { XPProgress, StreakCounter } from "@/components/ui/Progress";
import { calculateXpProgress } from "@/lib/utils";
import {
  BookOpen,
  Trophy,
  Flame,
  Star,
  ChevronRight,
  Play,
  Unlock,
  Map,
  Layers,
} from "lucide-react";

export default function JourneyPage() {
  const { language, learningMode } = useSettingsStore();
  const { totalXp, level, streakDays, completedChapters, completedLessons } =
    useProgressStore();
  const isArabic = language === "ar";
  const isJourneyMode = learningMode === "journey";

  // Calculate XP progress for the current level
  const levelThresholds = [
    0,
    100,
    300,
    600,
    1000,
    1500,
    2200,
    3000,
    4000,
    5500,
    Infinity,
  ];
  const levelXp = levelThresholds[level - 1];
  const nextLevelXp = levelThresholds[level];

  const chaptersList = [
    {
      id: "shahada",
      number: 1,
      title: isArabic ? "الشهادة" : "Shahada",
      subtitle: isArabic ? "شهادة الإيمان" : "Declaration of Faith",
      lessons: 5,
      color: "from-emerald-500 to-green-600",
      icon: "☪️",
    },
    {
      id: "salah",
      number: 2,
      title: isArabic ? "الصلاة" : "Salah",
      subtitle: isArabic ? "الصلوات الخمس" : "Five Daily Prayers",
      lessons: 8,
      color: "from-blue-500 to-indigo-600",
      icon: "🙏",
    },
    {
      id: "zakat",
      number: 3,
      title: isArabic ? "الزكاة" : "Zakat",
      subtitle: isArabic ? "التطهير والصدقة" : "Purification & Charity",
      lessons: 4,
      color: "from-amber-500 to-orange-600",
      icon: "💝",
    },
    {
      id: "sawm",
      number: 4,
      title: isArabic ? "الصيام" : "Sawm",
      subtitle: isArabic ? "صيام رمضان" : "Fasting in Ramadan",
      lessons: 6,
      color: "from-purple-500 to-violet-600",
      icon: "🌙",
    },
    {
      id: "hajj",
      number: 5,
      title: isArabic ? "الحج" : "Hajj",
      subtitle: isArabic ? "الحج إلى مكة" : "Pilgrimage to Makkah",
      lessons: 5,
      color: "from-teal-500 to-cyan-600",
      icon: "🕋",
    },
    {
      id: "quran",
      number: 6,
      title: isArabic ? "القرآن" : "Quran",
      subtitle: isArabic ? "كتاب الله" : "Allah's Book",
      lessons: 7,
      color: "from-rose-500 to-pink-600",
      icon: "📖",
    },
    {
      id: "akhlaq",
      number: 7,
      title: isArabic ? "الأخلاق" : "Akhlaq",
      subtitle: isArabic ? "الشخصية الإسلامية" : "Islamic Character",
      lessons: 6,
      color: "from-cyan-500 to-sky-600",
      icon: "✨",
    },
  ];

  const stats = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: `${completedChapters.length}/7`,
      label: isArabic ? "فصول مكتملة" : "Chapters Completed",
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: completedLessons.length.toString(),
      label: isArabic ? "دروس مكتملة" : "Lessons Completed",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: `${level}`,
      label: isArabic ? "المستوى" : "Level",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      value: `${streakDays}`,
      label: isArabic ? "أيام متتالية" : "Day Streak",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
            {isArabic ? "رحلتك الإسلامية" : "Your Islamic Journey"}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            {isArabic
              ? "تقدم عبر أركان الإسلام الخمسة وتعلم أساسيات الدين الحنيف"
              : "Progress through the Five Pillars of Islam and learn the foundations of the faith"}
          </p>

          {/* Mode Switcher */}
          <div className="flex justify-center">
            <ModeSwitcher compact />
          </div>
        </motion.div>

        {/* Stats Cards - Only show in Journey Mode */}
        {isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-emerald-600 dark:text-emerald-400">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* XP Progress - Only show in Journey Mode */}
        {isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-12"
          >
            <XPProgress
              currentXp={totalXp}
              levelXp={levelXp}
              nextLevelXp={nextLevelXp}
              level={level}
            />
          </motion.div>
        )}

        {/* Free Modules Info Banner - Only show in Modules Mode */}
        {!isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-12 text-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Unlock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {isArabic ? "وضع الوحدات الحرة" : "Free Modules Mode"}
                </h3>
                <p className="text-blue-100 text-sm">
                  {isArabic
                    ? "جميع المحتويات مفتوحة - تعلم أي موضوع تريده!"
                    : "All content unlocked - learn any topic you want!"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Journey Map - Only show in Journey Mode */}
        {isJourneyMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <JourneyMap />
          </motion.div>
        )}

        {/* Chapters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {isArabic ? "جميع الفصول" : "All Chapters"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chaptersList.map((chapter, index) => {
              const isCompleted = completedChapters.includes(chapter.id as any);
              // In Modules mode, nothing is locked
              const isLocked =
                isJourneyMode &&
                index > 0 &&
                !completedChapters.includes(chaptersList[index - 1].id as any);

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className={`relative group ${isLocked ? "opacity-60" : ""}`}
                >
                  <Link href={isLocked ? "#" : `/journey/${chapter.id}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                      {/* Header with gradient */}
                      <div
                        className={`h-24 bg-gradient-to-r ${chapter.color} relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 pattern-arabesque opacity-20" />
                        <div className="absolute top-4 left-4 text-4xl">
                          {chapter.icon}
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                          {isArabic
                            ? `فصل ${chapter.number}`
                            : `Chapter ${chapter.number}`}
                        </div>
                        {isCompleted && isJourneyMode && (
                          <div className="absolute bottom-4 right-4">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-amber-500" />
                            </div>
                          </div>
                        )}
                        {isLocked && (
                          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-4xl">🔒</div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {chapter.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {chapter.subtitle}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {chapter.lessons} {isArabic ? "دروس" : "lessons"}
                          </span>

                          {!isLocked && (
                            <Button
                              size="sm"
                              variant={
                                isCompleted && isJourneyMode
                                  ? "outline"
                                  : "primary"
                              }
                              rightIcon={<ChevronRight className="w-4 h-4" />}
                            >
                              {isCompleted && isJourneyMode
                                ? isArabic
                                  ? "مراجعة"
                                  : "Review"
                                : isArabic
                                  ? "ابدأ"
                                  : "Start"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
