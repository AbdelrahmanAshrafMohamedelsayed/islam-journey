"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Star,
  Flame,
  BookOpen,
  Target,
  Zap,
  Award,
  Crown,
  Sparkles,
  Medal,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Progress";
import {
  useSettingsStore,
  useProgressStore,
  useAchievementsStore,
} from "@/lib/stores";
import type { Achievement } from "@/types";

interface AchievementDefinition {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: React.ComponentType<{ className?: string }>;
  iconName: string;
  category: "learning" | "streak" | "mastery" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  requiredValue: number;
  getProgress: () => number;
  xpReward: number;
}

export default function AchievementsPage() {
  const { language: lang } = useSettingsStore();
  const { completedLessons, completedChapters, totalXp, level, streakDays } =
    useProgressStore();
  const { unlockedAchievements, unlockAchievement } = useAchievementsStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const achievementDefinitions: AchievementDefinition[] = [
    // Learning Achievements
    {
      id: "first-lesson",
      title: { en: "First Steps", ar: "الخطوات الأولى" },
      description: { en: "Complete your first lesson", ar: "أكمل درسك الأول" },
      icon: BookOpen,
      iconName: "book-open",
      category: "learning",
      rarity: "common",
      requiredValue: 1,
      getProgress: () => completedLessons.length,
      xpReward: 50,
    },
    {
      id: "lesson-master-5",
      title: { en: "Eager Learner", ar: "متعلم متحمس" },
      description: { en: "Complete 5 lessons", ar: "أكمل 5 دروس" },
      icon: Star,
      iconName: "star",
      category: "learning",
      rarity: "common",
      requiredValue: 5,
      getProgress: () => completedLessons.length,
      xpReward: 100,
    },
    {
      id: "lesson-master-10",
      title: { en: "Knowledge Seeker", ar: "طالب العلم" },
      description: { en: "Complete 10 lessons", ar: "أكمل 10 دروس" },
      icon: BookOpen,
      iconName: "book-open",
      category: "learning",
      rarity: "rare",
      requiredValue: 10,
      getProgress: () => completedLessons.length,
      xpReward: 200,
    },
    {
      id: "lesson-master-25",
      title: { en: "Dedicated Student", ar: "طالب مجتهد" },
      description: { en: "Complete 25 lessons", ar: "أكمل 25 درساً" },
      icon: Medal,
      iconName: "medal",
      category: "learning",
      rarity: "epic",
      requiredValue: 25,
      getProgress: () => completedLessons.length,
      xpReward: 500,
    },
    {
      id: "lesson-master-50",
      title: { en: "Scholar", ar: "عالم" },
      description: { en: "Complete 50 lessons", ar: "أكمل 50 درساً" },
      icon: Crown,
      iconName: "crown",
      category: "learning",
      rarity: "legendary",
      requiredValue: 50,
      getProgress: () => completedLessons.length,
      xpReward: 1000,
    },
    {
      id: "chapter-complete-1",
      title: { en: "Chapter Champion", ar: "بطل الفصل" },
      description: { en: "Complete your first chapter", ar: "أكمل فصلك الأول" },
      icon: Trophy,
      iconName: "trophy",
      category: "learning",
      rarity: "common",
      requiredValue: 1,
      getProgress: () => completedChapters.length,
      xpReward: 150,
    },
    {
      id: "chapter-complete-3",
      title: { en: "Journey Traveler", ar: "مسافر الرحلة" },
      description: { en: "Complete 3 chapters", ar: "أكمل 3 فصول" },
      icon: Target,
      iconName: "target",
      category: "learning",
      rarity: "rare",
      requiredValue: 3,
      getProgress: () => completedChapters.length,
      xpReward: 300,
    },
    {
      id: "chapter-complete-5",
      title: { en: "Path Master", ar: "سيد الطريق" },
      description: { en: "Complete 5 chapters", ar: "أكمل 5 فصول" },
      icon: Award,
      iconName: "award",
      category: "learning",
      rarity: "epic",
      requiredValue: 5,
      getProgress: () => completedChapters.length,
      xpReward: 500,
    },
    // Streak Achievements
    {
      id: "streak-3",
      title: { en: "Getting Started", ar: "البداية" },
      description: {
        en: "Maintain a 3-day streak",
        ar: "حافظ على سلسلة 3 أيام",
      },
      icon: Flame,
      iconName: "flame",
      category: "streak",
      rarity: "common",
      requiredValue: 3,
      getProgress: () => streakDays,
      xpReward: 75,
    },
    {
      id: "streak-7",
      title: { en: "Week Warrior", ar: "محارب الأسبوع" },
      description: {
        en: "Maintain a 7-day streak",
        ar: "حافظ على سلسلة 7 أيام",
      },
      icon: Flame,
      iconName: "flame",
      category: "streak",
      rarity: "rare",
      requiredValue: 7,
      getProgress: () => streakDays,
      xpReward: 150,
    },
    {
      id: "streak-14",
      title: { en: "Fortnight Fighter", ar: "مقاتل الأسبوعين" },
      description: {
        en: "Maintain a 14-day streak",
        ar: "حافظ على سلسلة 14 يوماً",
      },
      icon: Flame,
      iconName: "flame",
      category: "streak",
      rarity: "epic",
      requiredValue: 14,
      getProgress: () => streakDays,
      xpReward: 300,
    },
    {
      id: "streak-30",
      title: { en: "Monthly Master", ar: "سيد الشهر" },
      description: {
        en: "Maintain a 30-day streak",
        ar: "حافظ على سلسلة 30 يوماً",
      },
      icon: Flame,
      iconName: "flame",
      category: "streak",
      rarity: "legendary",
      requiredValue: 30,
      getProgress: () => streakDays,
      xpReward: 750,
    },
    // Milestone Achievements
    {
      id: "xp-100",
      title: { en: "XP Hunter", ar: "صياد النقاط" },
      description: { en: "Earn 100 XP", ar: "اكسب 100 نقطة خبرة" },
      icon: Zap,
      iconName: "zap",
      category: "mastery",
      rarity: "common",
      requiredValue: 100,
      getProgress: () => totalXp,
      xpReward: 25,
    },
    {
      id: "xp-500",
      title: { en: "XP Collector", ar: "جامع النقاط" },
      description: { en: "Earn 500 XP", ar: "اكسب 500 نقطة خبرة" },
      icon: Zap,
      iconName: "zap",
      category: "mastery",
      rarity: "rare",
      requiredValue: 500,
      getProgress: () => totalXp,
      xpReward: 100,
    },
    {
      id: "xp-1000",
      title: { en: "XP Master", ar: "سيد النقاط" },
      description: { en: "Earn 1,000 XP", ar: "اكسب 1000 نقطة خبرة" },
      icon: Zap,
      iconName: "zap",
      category: "mastery",
      rarity: "epic",
      requiredValue: 1000,
      getProgress: () => totalXp,
      xpReward: 250,
    },
    {
      id: "level-5",
      title: { en: "Rising Star", ar: "نجم صاعد" },
      description: { en: "Reach level 5", ar: "الوصول إلى المستوى 5" },
      icon: Star,
      iconName: "star",
      category: "mastery",
      rarity: "rare",
      requiredValue: 5,
      getProgress: () => level,
      xpReward: 200,
    },
    {
      id: "level-10",
      title: { en: "Bright Light", ar: "نور ساطع" },
      description: { en: "Reach level 10", ar: "الوصول إلى المستوى 10" },
      icon: Sparkles,
      iconName: "sparkles",
      category: "mastery",
      rarity: "epic",
      requiredValue: 10,
      getProgress: () => level,
      xpReward: 500,
    },
    // Special Achievements
    {
      id: "first-quiz",
      title: { en: "Quiz Taker", ar: "مشارك الاختبار" },
      description: { en: "Complete your first quiz", ar: "أكمل أول اختبار لك" },
      icon: Target,
      iconName: "target",
      category: "special",
      rarity: "common",
      requiredValue: 1,
      getProgress: () => (completedLessons.length > 0 ? 1 : 0),
      xpReward: 50,
    },
    {
      id: "perfect-score",
      title: { en: "Perfect Score", ar: "علامة كاملة" },
      description: {
        en: "Get 100% on any quiz",
        ar: "احصل على 100% في أي اختبار",
      },
      icon: Crown,
      iconName: "crown",
      category: "special",
      rarity: "epic",
      requiredValue: 1,
      getProgress: () => 0,
      xpReward: 100,
    },
  ];

  // Convert definition to store Achievement format
  const convertToAchievement = (def: AchievementDefinition): Achievement => ({
    id: def.id,
    name: def.title,
    description: def.description,
    icon: def.iconName || "trophy",
    category: def.category,
    rarity: def.rarity || "common",
    xpReward: def.xpReward,
    condition: {
      type: "custom",
      target: def.requiredValue,
      current: def.getProgress(),
    },
  });

  // Check for newly unlocked achievements
  useEffect(() => {
    achievementDefinitions.forEach((achievement) => {
      const progress = achievement.getProgress();
      if (
        progress >= achievement.requiredValue &&
        !unlockedAchievements.includes(achievement.id)
      ) {
        unlockAchievement(convertToAchievement(achievement));
      }
    });
  }, [
    completedLessons,
    completedChapters,
    totalXp,
    level,
    streakDays,
    unlockedAchievements,
    unlockAchievement,
  ]);

  const categories = [
    { id: "all", label: { en: "All", ar: "الكل" }, icon: Trophy },
    { id: "learning", label: { en: "Learning", ar: "التعلم" }, icon: BookOpen },
    { id: "streak", label: { en: "Streaks", ar: "السلاسل" }, icon: Flame },
    { id: "mastery", label: { en: "Mastery", ar: "الإتقان" }, icon: Target },
    { id: "special", label: { en: "Special", ar: "خاصة" }, icon: Sparkles },
  ];

  const filteredAchievements =
    selectedCategory === "all"
      ? achievementDefinitions
      : achievementDefinitions.filter((a) => a.category === selectedCategory);

  const totalUnlocked = unlockedAchievements.length;
  const totalAchievements = achievementDefinitions.length;

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
              {lang === "en" ? "Achievements" : "الإنجازات"}
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {lang === "en" ? "Your Achievements" : "إنجازاتك"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {lang === "en"
              ? `You've unlocked ${totalUnlocked} of ${totalAchievements} achievements`
              : `لقد فتحت ${totalUnlocked} من ${totalAchievements} إنجاز`}
          </p>
        </motion.div>

        {/* Progress Overview */}
        <Card variant="gradient" padding="lg" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === "en" ? "Overall Progress" : "التقدم العام"}
              </h2>
              <p className="text-sm text-slate-500">
                {Math.round((totalUnlocked / totalAchievements) * 100)}%{" "}
                {lang === "en" ? "complete" : "مكتمل"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-500">
                {totalUnlocked}
              </p>
              <p className="text-sm text-slate-500">/ {totalAchievements}</p>
            </div>
          </div>
          <ProgressBar
            value={(totalUnlocked / totalAchievements) * 100}
            showLabel={false}
          />
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const progress = achievement.getProgress();
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            const progressPercent = Math.min(
              (progress / achievement.requiredValue) * 100,
              100,
            );

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  variant={isUnlocked ? "gradient" : "default"}
                  padding="md"
                  className={`relative overflow-hidden ${
                    isUnlocked
                      ? "border-amber-200 dark:border-amber-800"
                      : "opacity-80"
                  }`}
                >
                  {isUnlocked && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                        isUnlocked
                          ? "bg-linear-to-br from-amber-400 to-amber-600"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      {isUnlocked ? (
                        <Icon className="w-7 h-7 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">
                        {achievement.title[lang]}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {achievement.description[lang]}
                      </p>

                      {!isUnlocked && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              {progress} / {achievement.requiredValue}
                            </span>
                            <span className="text-amber-500 font-medium">
                              +{achievement.xpReward} XP
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {isUnlocked && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          <Sparkles className="w-3 h-3" />
                          {lang === "en" ? "Unlocked!" : "تم الفتح!"}
                          <span className="text-amber-500 ml-2">
                            +{achievement.xpReward} XP
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <Card variant="default" padding="lg" className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {lang === "en" ? "Your Stats" : "إحصائياتك"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedLessons.length}
              </p>
              <p className="text-xs text-slate-500">
                {lang === "en" ? "Lessons" : "دروس"}
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {streakDays}
              </p>
              <p className="text-xs text-slate-500">
                {lang === "en" ? "Day Streak" : "أيام متتالية"}
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {totalXp}
              </p>
              <p className="text-xs text-slate-500">
                {lang === "en" ? "Total XP" : "مجموع النقاط"}
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {level}
              </p>
              <p className="text-xs text-slate-500">
                {lang === "en" ? "Level" : "المستوى"}
              </p>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link href="/journey">
            <Button variant="outline">
              {lang === "en" ? "Back to Journey" : "العودة للرحلة"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
