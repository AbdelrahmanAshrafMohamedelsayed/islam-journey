"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { ModeSwitcher } from "@/components/ui/ModeSwitcher";
import {
  ArrowLeft,
  Globe,
  Palette,
  Moon,
  Sun,
  Smartphone,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Gamepad2,
  BookOpen,
  Bell,
  Volume2,
  VolumeX,
  Lamp,
  Music,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    learningMode,
    setLearningMode,
    resetOnboarding,
    hasCompletedOnboarding,
  } = useSettingsStore();
  const { resetProgress, totalXp, level, completedLessons, streakDays } =
    useProgressStore();
  const isArabic = language === "ar";
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const handleResetOnboarding = () => {
    resetOnboarding();
    window.location.href = "/onboarding";
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {isArabic ? "الإعدادات" : "Settings"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {isArabic
              ? "تخصيص تجربة التعلم الخاصة بك"
              : "Customize your learning experience"}
          </p>
        </motion.div>

        {/* Learning Mode Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            {learningMode === "journey" ? (
              <Gamepad2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <BookOpen className="w-5 h-5 text-blue-500" />
            )}
            {isArabic ? "وضع التعلم" : "Learning Mode"}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {isArabic
              ? "اختر كيف تريد التعلم - مع التقدم المحفز أو الوصول الحر لجميع المحتوى"
              : "Choose how you want to learn - with gamified progression or free access to all content"}
          </p>

          <ModeSwitcher />
        </motion.div>

        {/* Language Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            {isArabic ? "اللغة" : "Language"}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === "en"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="text-2xl mb-2">🇺🇸</div>
              <div className="font-medium text-slate-900 dark:text-white">
                English
              </div>
            </button>

            <button
              onClick={() => setLanguage("ar")}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === "ar"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="text-2xl mb-2">🇸🇦</div>
              <div className="font-medium text-slate-900 dark:text-white">
                العربية
              </div>
            </button>
          </div>
        </motion.div>

        {/* Theme Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-500" />
            {isArabic ? "المظهر" : "Theme"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "light"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Sun className="w-6 h-6 mx-auto mb-2 text-amber-500" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {isArabic ? "فاتح" : "Light"}
              </div>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "dark"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Moon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {isArabic ? "داكن" : "Dark"}
              </div>
            </button>

            <button
              onClick={() => setTheme("mosque")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "mosque"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Lamp className="w-6 h-6 mx-auto mb-2 text-amber-500" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {isArabic ? "المسجد" : "Mosque"}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isArabic ? "إضاءة خافتة" : "Dim for prayers"}
              </div>
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "system"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-slate-500" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {isArabic ? "النظام" : "System"}
              </div>
            </button>
          </div>
        </motion.div>

        {/* Ambient Sound Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-500" />
            {isArabic ? "أجواء المسجد" : "Mosque Atmosphere"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {isArabic
              ? "اختر الأجواء الصوتية المحيطة لتجربة روحانية غامرة"
              : "Choose ambient sounds for an immersive spiritual experience"}
          </p>

          {/* Import AmbientSoundSelector dynamically to avoid SSR issues */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: "makkah",
                icon: "🕋",
                name: isArabic ? "مكة المكرمة" : "Makkah",
                desc: isArabic ? "أجواء المسجد الحرام" : "Masjid al-Haram",
              },
              {
                id: "madinah",
                icon: "🌴",
                name: isArabic ? "المدينة المنورة" : "Madinah",
                desc: isArabic ? "سكينة وهدوء" : "Peaceful serenity",
              },
              {
                id: "local",
                icon: "🕌",
                name: isArabic ? "المسجد المحلي" : "Local Mosque",
                desc: isArabic ? "تأمل هادئ" : "Quiet contemplation",
              },
              {
                id: "silent",
                icon: "🔇",
                name: isArabic ? "صامت" : "Silent",
                desc: isArabic ? "بدون صوت" : "No ambient sound",
              },
            ].map((atm) => (
              <button
                key={atm.id}
                className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-left"
              >
                <span className="text-2xl mb-2 block">{atm.icon}</span>
                <div className="font-medium text-slate-900 dark:text-white text-sm">
                  {atm.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {atm.desc}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications & Sound Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            {isArabic ? "الإشعارات والصوت" : "Notifications & Sound"}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {isArabic ? "تذكيرات الصلاة" : "Prayer Reminders"}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {isArabic
                      ? "إشعارات لأوقات الصلاة"
                      : "Notifications for prayer times"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  notifications
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEffects ? (
                  <Volume2 className="w-5 h-5 text-slate-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {isArabic ? "المؤثرات الصوتية" : "Sound Effects"}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {isArabic
                      ? "أصوات للإنجازات والتقدم"
                      : "Sounds for achievements and progress"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSoundEffects(!soundEffects)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  soundEffects
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    soundEffects ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress Stats - Only show in Journey Mode */}
        {learningMode === "journey" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {isArabic ? "إحصائيات التقدم" : "Progress Stats"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totalXp}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isArabic ? "إجمالي XP" : "Total XP"}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {level}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isArabic ? "المستوى" : "Level"}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {completedLessons.length}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isArabic ? "دروس مكتملة" : "Lessons Done"}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {streakDays}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isArabic ? "أيام متتالية" : "Day Streak"}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-900/30"
        >
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {isArabic ? "منطقة الخطر" : "Danger Zone"}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {isArabic ? "إعادة تشغيل الإعداد" : "Restart Onboarding"}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isArabic
                    ? "العودة لشاشة الترحيب"
                    : "Go back to welcome screen"}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetOnboarding}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {isArabic ? "إعادة" : "Reset"}
              </Button>
            </div>

            {learningMode === "journey" && (
              <div className="flex items-center justify-between pt-4 border-t border-red-200 dark:border-red-900/30">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {isArabic ? "إعادة تعيين التقدم" : "Reset Progress"}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {isArabic
                      ? "مسح جميع XP والدروس المكتملة"
                      : "Clear all XP and completed lessons"}
                  </div>
                </div>
                {!showResetConfirm ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowResetConfirm(true)}
                  >
                    {isArabic ? "إعادة تعيين" : "Reset"}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowResetConfirm(false)}
                    >
                      {isArabic ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleResetProgress}
                    >
                      {isArabic ? "تأكيد" : "Confirm"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400"
        >
          <p>New Muslim Journey v1.0.0</p>
          <p className="mt-1">
            {isArabic
              ? "صنع بـ ❤️ للمسلمين الجدد"
              : "Made with ❤️ for new Muslims"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
