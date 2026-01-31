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
  Plus,
  Minus,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Progress";
import { useSettingsStore } from "@/lib/stores";

interface DayProgress {
  date: string;
  day: number;
  fasted: boolean;
  suhoor: boolean;
  iftar: boolean;
  taraweeh: boolean;
  quranRead: boolean;
  charity: boolean;
}

interface RamadanData {
  quranJuz: number;
  taraweehCount: number;
  progress: DayProgress[];
  today: DayProgress;
}

const getCurrentRamadanDay = () => {
  const storedDay =
    typeof window !== "undefined"
      ? localStorage.getItem("ramadan-current-day")
      : null;
  return storedDay ? parseInt(storedDay) : 1;
};

export default function RamadanTrackerPage() {
  const { language: lang } = useSettingsStore();
  const [currentDay, setCurrentDay] = useState(1);
  const [quranJuz, setQuranJuz] = useState(0);
  const [taraweehCount, setTaraweehCount] = useState(0);
  const [progress, setProgress] = useState<DayProgress[]>([]);
  const [todayProgress, setTodayProgress] = useState<DayProgress>({
    date: new Date().toISOString().split("T")[0],
    day: 1,
    fasted: false,
    suhoor: false,
    iftar: false,
    taraweeh: false,
    quranRead: false,
    charity: false,
  });
  const [showSaved, setShowSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ramadan-progress-v2");
    if (saved) {
      const parsed: RamadanData = JSON.parse(saved);
      setProgress(parsed.progress || []);
      setTodayProgress(parsed.today || todayProgress);
      setQuranJuz(parsed.quranJuz || 0);
      setTaraweehCount(parsed.taraweehCount || 0);
    }
    const day = getCurrentRamadanDay();
    setCurrentDay(day);
    setTodayProgress((prev) => ({ ...prev, day }));
  }, []);

  useEffect(() => {
    const data: RamadanData = {
      quranJuz,
      taraweehCount,
      progress,
      today: todayProgress,
    };
    localStorage.setItem("ramadan-progress-v2", JSON.stringify(data));
    localStorage.setItem("ramadan-current-day", currentDay.toString());
  }, [progress, todayProgress, quranJuz, taraweehCount, currentDay]);

  const toggleTodayItem = (key: keyof DayProgress) => {
    if (key === "date" || key === "day") return;
    setTodayProgress((prev) => ({ ...prev, [key]: !prev[key] }));
    if (key === "taraweeh" && !todayProgress.taraweeh) {
      setTaraweehCount((prev) => Math.min(prev + 1, 30));
    }
  };

  const saveDayProgress = () => {
    const existingIndex = progress.findIndex((p) => p.day === currentDay);
    if (existingIndex >= 0) {
      const newProgress = [...progress];
      newProgress[existingIndex] = todayProgress;
      setProgress(newProgress);
    } else {
      setProgress((prev) => [...prev, todayProgress]);
    }
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const toggleDayFasted = (day: number) => {
    const existingIndex = progress.findIndex((p) => p.day === day);
    if (existingIndex >= 0) {
      const newProgress = [...progress];
      newProgress[existingIndex] = {
        ...newProgress[existingIndex],
        fasted: !newProgress[existingIndex].fasted,
      };
      setProgress(newProgress);
    } else {
      setProgress((prev) => [
        ...prev,
        {
          date: new Date().toISOString().split("T")[0],
          day,
          fasted: true,
          suhoor: false,
          iftar: false,
          taraweeh: false,
          quranRead: false,
          charity: false,
        },
      ]);
    }
  };

  const incrementQuranJuz = () => setQuranJuz((prev) => Math.min(prev + 1, 30));
  const decrementQuranJuz = () => setQuranJuz((prev) => Math.max(prev - 1, 0));
  const incrementTaraweeh = () =>
    setTaraweehCount((prev) => Math.min(prev + 1, 30));
  const decrementTaraweeh = () =>
    setTaraweehCount((prev) => Math.max(prev - 1, 0));

  const nextDay = () => {
    if (currentDay < 30) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      const existingProgress = progress.find((p) => p.day === newDay);
      setTodayProgress(
        existingProgress || {
          date: new Date().toISOString().split("T")[0],
          day: newDay,
          fasted: false,
          suhoor: false,
          iftar: false,
          taraweeh: false,
          quranRead: false,
          charity: false,
        },
      );
    }
  };

  const prevDay = () => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      setCurrentDay(newDay);
      const existingProgress = progress.find((p) => p.day === newDay);
      setTodayProgress(
        existingProgress || {
          date: new Date().toISOString().split("T")[0],
          day: newDay,
          fasted: false,
          suhoor: false,
          iftar: false,
          taraweeh: false,
          quranRead: false,
          charity: false,
        },
      );
    }
  };

  const resetAllProgress = () => {
    setProgress([]);
    setQuranJuz(0);
    setTaraweehCount(0);
    setCurrentDay(1);
    setTodayProgress({
      date: new Date().toISOString().split("T")[0],
      day: 1,
      fasted: false,
      suhoor: false,
      iftar: false,
      taraweeh: false,
      quranRead: false,
      charity: false,
    });
    localStorage.removeItem("ramadan-progress-v2");
    localStorage.removeItem("ramadan-current-day");
    setShowReset(false);
  };

  const completedDays = progress.filter((d) => d.fasted).length;
  const streak = progress.reduce((acc, day, idx) => {
    if (day.fasted && (idx === 0 || progress[idx - 1]?.fasted)) return acc + 1;
    return acc;
  }, 0);

  const todayItems = [
    { key: "suhoor", icon: Coffee, label: { en: "Suhoor", ar: "سحور" } },
    { key: "fasted", icon: Moon, label: { en: "Fasted", ar: "صيام" } },
    { key: "iftar", icon: Utensils, label: { en: "Iftar", ar: "إفطار" } },
    { key: "taraweeh", icon: Moon, label: { en: "Taraweeh", ar: "تراويح" } },
    {
      key: "quranRead",
      icon: BookOpen,
      label: { en: "Quran Read", ar: "قراءة القرآن" },
    },
    { key: "charity", icon: Heart, label: { en: "Charity", ar: "صدقة" } },
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
      en: "Try to read at least one juz of Quran daily",
      ar: "حاول قراءة جزء واحد على الأقل من القرآن يومياً",
    },
    {
      en: "Even a smile or removing harm from the road is charity",
      ar: "حتى الابتسامة أو إزالة الأذى من الطريق صدقة",
    },
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {showSaved && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          {lang === "en" ? "Progress Saved!" : "تم حفظ التقدم!"}
        </motion.div>
      )}

      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Reset All Progress?" : "إعادة تعيين كل التقدم؟"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {lang === "en"
                ? "This will delete all your Ramadan tracking data."
                : "سيؤدي هذا إلى حذف جميع بيانات تتبع رمضان."}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReset(false)}
                className="flex-1"
              >
                {lang === "en" ? "Cancel" : "إلغاء"}
              </Button>
              <Button
                variant="primary"
                onClick={resetAllProgress}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                {lang === "en" ? "Reset" : "إعادة تعيين"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

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
            <button
              onClick={() => setShowReset(true)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Moon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {lang === "en" ? "Ramadan Mubarak!" : "رمضان مبارك!"}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prevDay}
              disabled={currentDay === 1}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Minus className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {lang === "en" ? `Day ${currentDay}` : `اليوم ${currentDay}`}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {lang === "en" ? "of 30" : "من 30"}
              </p>
            </div>
            <button
              onClick={nextDay}
              disabled={currentDay === 30}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Plus className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="default" padding="md" className="text-center">
            <Calendar className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {completedDays}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Days Fasted" : "أيام صيام"}
            </p>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {streak}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Day Streak" : "أيام متتالية"}
            </p>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round((completedDays / 30) * 100)}%
            </p>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Complete" : "مكتمل"}
            </p>
          </Card>
        </div>

        <Card variant="default" padding="lg" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === "en" ? "Today's Progress" : "تقدم اليوم"}
            </h2>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-slate-500">
                {new Date().toLocaleDateString(
                  lang === "ar" ? "ar-SA" : "en-US",
                  { weekday: "short", month: "short", day: "numeric" },
                )}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {todayItems.map((item) => {
              const Icon = item.icon;
              const isChecked = todayProgress[item.key as keyof DayProgress];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleTodayItem(item.key as keyof DayProgress)}
                  className={`p-4 rounded-xl border-2 transition-all ${isChecked ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500" : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${isChecked ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <Icon
                        className={`w-4 h-4 mb-1 ${isChecked ? "text-emerald-600" : "text-slate-400"}`}
                      />
                      <p
                        className={`text-sm font-medium ${isChecked ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}
                      >
                        {item.label[lang]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Daily Progress" : "التقدم اليومي"}
              </span>
              <span className="text-emerald-600 font-medium">
                {Object.values(todayProgress).filter(Boolean).length - 2}/6
              </span>
            </div>
            <ProgressBar
              value={
                ((Object.values(todayProgress).filter(Boolean).length - 2) /
                  6) *
                100
              }
              showLabel={false}
            />
          </div>
          <Button
            variant="primary"
            onClick={saveDayProgress}
            className="w-full mt-4"
            leftIcon={<Save className="w-4 h-4" />}
          >
            {lang === "en"
              ? `Save Day ${currentDay} Progress`
              : `حفظ تقدم اليوم ${currentDay}`}
          </Button>
        </Card>

        <Card variant="gradient" padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center shrink-0">
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

        <Card variant="default" padding="lg" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === "en" ? "Ramadan Calendar" : "تقويم رمضان"}
            </h2>
            <p className="text-sm text-slate-500">
              {lang === "en" ? "Tap to mark fasting" : "اضغط لتحديد الصيام"}
            </p>
          </div>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const isSelected = day === currentDay;
              const wasFasted = progress.find((p) => p.day === day)?.fasted;
              return (
                <button
                  key={day}
                  onClick={() => toggleDayFasted(day)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative ${isSelected ? "bg-purple-500 text-white ring-2 ring-purple-300 ring-offset-2 dark:ring-offset-slate-900" : wasFasted ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  {wasFasted && !isSelected && (
                    <CheckCircle2 className="w-3 h-3 absolute top-1 right-1 text-white" />
                  )}
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500" />
              <span className="text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Current" : "الحالي"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Fasted" : "صمت"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Not Marked" : "غير محدد"}
              </span>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="lg">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {lang === "en" ? "Ramadan Goals" : "أهداف رمضان"}
          </h2>
          <div className="space-y-6">
            <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {lang === "en" ? "Quran Progress" : "تقدم القرآن"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {lang === "en" ? "Complete 30 Juz" : "أكمل 30 جزء"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuranJuz}
                    disabled={quranJuz === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold text-emerald-600 w-12 text-center">
                    {quranJuz}
                  </span>
                  <button
                    onClick={incrementQuranJuz}
                    disabled={quranJuz === 30}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <ProgressBar value={(quranJuz / 30) * 100} showLabel={false} />
              <p className="text-center text-sm text-emerald-600 mt-2">
                {quranJuz}/30 {lang === "en" ? "Juz" : "جزء"}
              </p>
            </div>

            <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {lang === "en" ? "Fasting Days" : "أيام الصيام"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {lang === "en"
                        ? "Click calendar to mark"
                        : "اضغط على التقويم"}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-amber-600">
                  {completedDays}
                </span>
              </div>
              <ProgressBar
                value={(completedDays / 30) * 100}
                showLabel={false}
              />
              <p className="text-center text-sm text-amber-600 mt-2">
                {completedDays}/30 {lang === "en" ? "days" : "يوم"}
              </p>
            </div>

            <div className="bg-linear-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {lang === "en" ? "Taraweeh Prayers" : "صلاة التراويح"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {lang === "en"
                        ? "Track night prayers"
                        : "تتبع صلواتك الليلية"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementTaraweeh}
                    disabled={taraweehCount === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold text-purple-600 w-12 text-center">
                    {taraweehCount}
                  </span>
                  <button
                    onClick={incrementTaraweeh}
                    disabled={taraweehCount === 30}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <ProgressBar
                value={(taraweehCount / 30) * 100}
                showLabel={false}
              />
              <p className="text-center text-sm text-purple-600 mt-2">
                {taraweehCount}/30 {lang === "en" ? "nights" : "ليلة"}
              </p>
            </div>
          </div>
        </Card>

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
