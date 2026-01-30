"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Utensils,
  Coffee,
  BookOpen,
  Heart,
  CheckCircle2,
  Circle,
  Calendar,
  Flame,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Progress";
import { useSettingsStore } from "@/lib/stores";

interface DayProgress {
  date: string;
  fasted: boolean;
  suhoor: boolean;
  iftar: boolean;
  taraweeh: boolean;
  quranRead: boolean;
  charity: boolean;
}

// Get current day in Ramadan (mock - in production would use Islamic calendar)
const getCurrentRamadanDay = () => {
  // This is a placeholder - in production, use a proper Islamic calendar library
  return Math.min(Math.floor(Math.random() * 15) + 1, 30);
};

export default function RamadanTrackerPage() {
  const { language: lang } = useSettingsStore();
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<DayProgress[]>([]);
  const [todayProgress, setTodayProgress] = useState<DayProgress>({
    date: new Date().toISOString().split("T")[0],
    fasted: false,
    suhoor: false,
    iftar: false,
    taraweeh: false,
    quranRead: false,
    charity: false,
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ramadan-progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress(parsed.progress || []);
      setTodayProgress(parsed.today || todayProgress);
    }
    setCurrentDay(getCurrentRamadanDay());
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "ramadan-progress",
      JSON.stringify({
        progress,
        today: todayProgress,
      }),
    );
  }, [progress, todayProgress]);

  const toggleTodayItem = (key: keyof DayProgress) => {
    if (key === "date") return;
    setTodayProgress((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const completedDays = progress.filter((d) => d.fasted).length;
  const streak = progress.reduce((acc, day, idx) => {
    if (day.fasted && (idx === 0 || progress[idx - 1]?.fasted)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const todayItems = [
    {
      key: "suhoor",
      icon: Coffee,
      label: { en: "Suhoor", ar: "سحور" },
      color: "purple",
    },
    {
      key: "fasted",
      icon: Moon,
      label: { en: "Fasted", ar: "صيام" },
      color: "emerald",
    },
    {
      key: "iftar",
      icon: Utensils,
      label: { en: "Iftar", ar: "إفطار" },
      color: "orange",
    },
    {
      key: "taraweeh",
      icon: Moon,
      label: { en: "Taraweeh", ar: "تراويح" },
      color: "blue",
    },
    {
      key: "quranRead",
      icon: BookOpen,
      label: { en: "Quran Read", ar: "قراءة القرآن" },
      color: "teal",
    },
    {
      key: "charity",
      icon: Heart,
      label: { en: "Charity", ar: "صدقة" },
      color: "pink",
    },
  ];

  const tips = [
    {
      en: "Start suhoor with dates and water, following the Sunnah",
      ar: "ابدأ السحور بالتمر والماء، اتباعاً للسنة",
    },
    {
      en: "Make du'a at iftar time - it's a special time for accepted prayers",
      ar: "ادعُ عند الإفطار - إنه وقت خاص لقبول الدعاء",
    },
    {
      en: "Try to read at least one juz (part) of Quran daily",
      ar: "حاول قراءة جزء واحد على الأقل من القرآن يومياً",
    },
    {
      en: "Even a smile or removing harm from the road is charity",
      ar: "حتى الابتسامة أو إزالة الأذى من الطريق صدقة",
    },
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

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
              {lang === "en" ? "Ramadan Tracker" : "متتبع رمضان"}
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Moon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {lang === "en" ? "Ramadan Mubarak!" : "رمضان مبارك!"}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {lang === "en"
              ? `Day ${currentDay} of 30`
              : `اليوم ${currentDay} من 30`}
          </p>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" padding="md" className="text-center">
              <Calendar className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedDays}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "en" ? "Days Fasted" : "أيام صيام"}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="md" className="text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {streak}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "en" ? "Day Streak" : "أيام متتالية"}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="md" className="text-center">
              <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round((completedDays / 30) * 100)}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "en" ? "Complete" : "مكتمل"}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Today's Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === "en" ? "Today's Progress" : "تقدم اليوم"}
              </h2>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date().toLocaleDateString(
                    lang === "ar" ? "ar-SA" : "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {todayItems.map((item, index) => {
                const Icon = item.icon;
                const isChecked = todayProgress[item.key as keyof DayProgress];

                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() =>
                      toggleTodayItem(item.key as keyof DayProgress)
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isChecked
                        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isChecked
                            ? "bg-emerald-500"
                            : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="text-left">
                        <Icon
                          className={`w-4 h-4 mb-1 ${isChecked ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
                        />
                        <p
                          className={`text-sm font-medium ${isChecked ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}
                        >
                          {item.label[lang]}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Today's Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-400">
                  {lang === "en" ? "Daily Progress" : "التقدم اليومي"}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {Object.values(todayProgress).filter(Boolean).length - 1}/6
                </span>
              </div>
              <ProgressBar
                value={
                  ((Object.values(todayProgress).filter(Boolean).length - 1) /
                    6) *
                  100
                }
                showLabel={false}
              />
            </div>
          </Card>
        </motion.div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card variant="gradient" padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  {lang === "en" ? "Daily Tip" : "نصيحة اليوم"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {randomTip[lang]}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Ramadan Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {lang === "en" ? "Ramadan Calendar" : "تقويم رمضان"}
            </h2>
            <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const isPast = day < currentDay;
                const isToday = day === currentDay;
                const wasFasted = progress.find((p) =>
                  p.date?.endsWith(`-${day}`),
                )?.fasted;

                return (
                  <button
                    key={day}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                      isToday
                        ? "bg-emerald-500 text-white ring-2 ring-emerald-300 ring-offset-2 dark:ring-offset-slate-900"
                        : isPast && wasFasted
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : isPast
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {lang === "en" ? "Today" : "اليوم"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-900/30" />
                <span className="text-slate-600 dark:text-slate-400">
                  {lang === "en" ? "Fasted" : "صيام"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800" />
                <span className="text-slate-600 dark:text-slate-400">
                  {lang === "en" ? "Missed" : "فائت"}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Ramadan Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {lang === "en" ? "Ramadan Goals" : "أهداف رمضان"}
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {lang === "en" ? "Complete Quran" : "ختم القرآن"}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {currentDay}/30 {lang === "en" ? "Juz" : "جزء"}
                  </span>
                </div>
                <ProgressBar
                  value={(currentDay / 30) * 100}
                  showLabel={false}
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {lang === "en" ? "Fasting Days" : "أيام الصيام"}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {completedDays}/30
                  </span>
                </div>
                <ProgressBar
                  value={(completedDays / 30) * 100}
                  showLabel={false}
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {lang === "en" ? "Taraweeh Prayers" : "صلاة التراويح"}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {progress.filter((p) => p.taraweeh).length}/30
                  </span>
                </div>
                <ProgressBar
                  value={(progress.filter((p) => p.taraweeh).length / 30) * 100}
                  showLabel={false}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link href="/journey">
            <Button variant="outline">
              {lang === "en" ? "Back to Journey" : "العودة للرحلة"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
